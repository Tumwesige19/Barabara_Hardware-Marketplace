'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, ArrowRight, Minus, Plus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, subtotal, tax, shipping, grandTotal, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link
                    href="/products"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border border-border bg-card"
                        >
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <Link href={`/products/${item.id}`} className="font-medium hover:text-primary transition-colors line-clamp-1">
                                    {item.name}
                                </Link>
                                <p className="text-sm text-muted-foreground">{item.category}</p>
                                <div className="mt-1 font-bold text-primary">{formatCurrency(item.price)}</div>
                            </div>

                            <div className="flex items-center gap-4 mt-4 sm:mt-0">
                                <div className="flex items-center border border-border rounded-md">
                                    <button
                                        className="p-2 hover:bg-muted transition-colors"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </button>
                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                    <button
                                        className="p-2 hover:bg-muted transition-colors"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                    aria-label="Remove item"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={clearCart}
                        className="text-sm text-muted-foreground hover:text-destructive transition-colors underline"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="lg:col-span-1">
                    <div className="rounded-lg border border-border bg-card p-6 shadow-sm sticky top-24">
                        <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tax (8%)</span>
                                <span className="font-medium">{formatCurrency(tax)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="font-medium text-green-600">{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
                            </div>
                            <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-primary">{formatCurrency(grandTotal)}</span>
                            </div>
                        </div>

                        {shipping > 0 && (
                            <p className="text-xs text-muted-foreground mt-3">
                                💡 Free shipping on orders over {formatCurrency(500000)}
                            </p>
                        )}

                        <Link
                            href="/checkout"
                            className="mt-6 w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                        >
                            Proceed to Checkout
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
