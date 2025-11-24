'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/data';

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    subtotal: number;
    tax: number;
    shipping: number;
    grandTotal: number;
    isCartOpen: boolean;
    toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const TAX_RATE = 0.08; // 8% tax
const SHIPPING_RATE = 15000; // Flat UGX 15,000 shipping
const FREE_SHIPPING_THRESHOLD = 500000; // Free shipping over UGX 500,000
const MAX_QUANTITY_PER_ITEM = 10;

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart from local storage', e);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('cart', JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addToCart = (product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                // Don't exceed max quantity
                if (existing.quantity >= MAX_QUANTITY_PER_ITEM) {
                    alert(`Maximum ${MAX_QUANTITY_PER_ITEM} items allowed per product`);
                    return prev;
                }
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        if (quantity > MAX_QUANTITY_PER_ITEM) {
            alert(`Maximum ${MAX_QUANTITY_PER_ITEM} items allowed per product`);
            return;
        }
        setItems((prev) =>
            prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const toggleCart = () => setIsCartOpen((prev) => !prev);

    // Calculate totals
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
    const grandTotal = subtotal + tax + shipping;
    const totalPrice = subtotal; // Keep for backward compatibility

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
                subtotal,
                tax,
                shipping,
                grandTotal,
                isCartOpen,
                toggleCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
