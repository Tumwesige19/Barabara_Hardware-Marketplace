'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { createOrder } from '@/app/actions';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function CheckoutPage() {
    const { items, subtotal, tax, shipping, grandTotal, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<'mobile_money' | 'card' | 'cash'>('mobile_money');
    const [mobileProvider, setMobileProvider] = useState<'mtn' | 'airtel'>('mtn');
    const { data: session, status } = useSession();

    const [shippingInfo, setShippingInfo] = useState({
        phone: '',
        address: '',
        city: '',
        postalCode: ''
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?callbackUrl=/checkout');
        }
    }, [status, router]);

    if (status === 'loading') {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Loading...</p>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    if (items.length === 0 && !isSuccess) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
                <Link href="/products" className="text-primary hover:underline">
                    Return to Shop
                </Link>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const orderItems = items.map(item => ({
                productId: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                category: item.category
            }));

            const orderData = {
                customerName: session.user?.name || 'Guest',
                customerEmail: session.user?.email || '',
                items: orderItems,
                subtotal,
                tax,
                shipping,
                total: grandTotal,
                paymentMethod: paymentMethod === 'mobile_money'
                    ? `Mobile Money (${mobileProvider.toUpperCase()})`
                    : paymentMethod === 'card'
                        ? 'Card Payment'
                        : 'Cash on Delivery',
                userId: session.user?.id || '',
                phone: shippingInfo.phone,
                shippingAddress: shippingInfo.address,
                city: shippingInfo.city,
                postalCode: shippingInfo.postalCode
            };

            const result = await createOrder(orderData);

            if (result.success) {
                setOrderId(result.orderId || '');
                clearCart();
                setIsSuccess(true);
            } else {
                alert(result.error || 'Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
                <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-green-100 p-4 text-green-600">
                        <CheckCircle className="h-12 w-12" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
                <div className="bg-muted/50 rounded-lg p-6 mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                    <p className="text-2xl font-bold font-mono text-primary">{orderId}</p>
                </div>
                <div className="space-y-3 text-left bg-card border rounded-lg p-6 mb-6">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="font-medium">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (8%):</span>
                        <span className="font-medium">{formatCurrency(tax)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping:</span>
                        <span className="font-medium">{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-primary">{formatCurrency(grandTotal)}</span>
                    </div>
                </div>
                <p className="text-muted-foreground mb-2">
                    Thank you for your order! We'll send you a confirmation email shortly.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                    Estimated delivery: <span className="font-medium">3-5 business days</span>
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        href="/profile"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
                    >
                        View Order History
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-md hover:bg-muted transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Shipping Information</h2>

                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium">Phone Number *</label>
                                <input
                                    required
                                    id="phone"
                                    type="tel"
                                    value={shippingInfo.phone}
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                    placeholder="0771234567"
                                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="address" className="text-sm font-medium">Street Address *</label>
                                <input
                                    required
                                    id="address"
                                    value={shippingInfo.address}
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                    placeholder="123 Main Street, Apartment 4B"
                                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="city" className="text-sm font-medium">City *</label>
                                    <input
                                        required
                                        id="city"
                                        value={shippingInfo.city}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                        placeholder="Kampala"
                                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="postalCode" className="text-sm font-medium">Postal Code</label>
                                    <input
                                        id="postalCode"
                                        value={shippingInfo.postalCode}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                                        placeholder="Optional"
                                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Payment Method</h2>

                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('mobile_money')}
                                    className={`p-4 rounded-lg border-2 text-center transition-all ${paymentMethod === 'mobile_money'
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    <span className="block font-semibold text-sm">Mobile Money</span>
                                    <span className="text-xs text-muted-foreground">MTN/Airtel</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`p-4 rounded-lg border-2 text-center transition-all ${paymentMethod === 'card'
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    <span className="block font-semibold text-sm">Card</span>
                                    <span className="text-xs text-muted-foreground">Visa/Master</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('cash')}
                                    className={`p-4 rounded-lg border-2 text-center transition-all ${paymentMethod === 'cash'
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    <span className="block font-semibold text-sm">Cash</span>
                                    <span className="text-xs text-muted-foreground">On Delivery</span>
                                </button>
                            </div>

                            {paymentMethod === 'mobile_money' && (
                                <div className="space-y-4 animate-in fade-in">
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className={`flex items-center justify-center p-3 rounded-md border cursor-pointer transition-all ${mobileProvider === 'mtn' ? 'border-primary bg-primary/5' : 'border-border'
                                            }`}>
                                            <input
                                                type="radio"
                                                value="mtn"
                                                checked={mobileProvider === 'mtn'}
                                                onChange={(e) => setMobileProvider(e.target.value as 'mtn' | 'airtel')}
                                                className="sr-only"
                                            />
                                            <span className="font-medium">MTN MoMo</span>
                                        </label>
                                        <label className={`flex items-center justify-center p-3 rounded-md border cursor-pointer transition-all ${mobileProvider === 'airtel' ? 'border-primary bg-primary/5' : 'border-border'
                                            }`}>
                                            <input
                                                type="radio"
                                                value="airtel"
                                                checked={mobileProvider === 'airtel'}
                                                onChange={(e) => setMobileProvider(e.target.value as 'mtn' | 'airtel')}
                                                className="sr-only"
                                            />
                                            <span className="font-medium">Airtel Money</span>
                                        </label>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="mobileNumber" className="text-sm font-medium">
                                            Mobile Money Number *
                                        </label>
                                        <input
                                            required
                                            id="mobileNumber"
                                            type="tel"
                                            placeholder="07XX XXX XXX"
                                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Enter the {mobileProvider.toUpperCase()} number to charge
                                        </p>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'card' && (
                                <div className="space-y-4 animate-in fade-in">
                                    <div className="space-y-2">
                                        <label htmlFor="cardName" className="text-sm font-medium">
                                            Cardholder Name *
                                        </label>
                                        <input
                                            required
                                            id="cardName"
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="cardNumber" className="text-sm font-medium">
                                            Card Number *
                                        </label>
                                        <input
                                            required
                                            id="cardNumber"
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            maxLength={19}
                                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="expiryDate" className="text-sm font-medium">
                                                Expiry Date *
                                            </label>
                                            <input
                                                required
                                                id="expiryDate"
                                                type="text"
                                                placeholder="MM/YY"
                                                maxLength={5}
                                                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="cvv" className="text-sm font-medium">
                                                CVV *
                                            </label>
                                            <input
                                                required
                                                id="cvv"
                                                type="text"
                                                placeholder="123"
                                                maxLength={3}
                                                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        🔒 Your payment information is secure and encrypted
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Place Order ({formatCurrency(grandTotal)})
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-3">
                                <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-sm font-medium">
                                    {formatCurrency(item.price * item.quantity)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2 border-t pt-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tax (8%)</span>
                            <span>{formatCurrency(tax)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : formatCurrency(shipping)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t pt-2">
                            <span>Total</span>
                            <span className="text-primary">{formatCurrency(grandTotal)}</span>
                        </div>
                    </div>
                    {shipping > 0 && (
                        <p className="text-xs text-muted-foreground mt-4">
                            💡 Free shipping on orders over {formatCurrency(500000)}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
