'use client';

import { useParams } from 'next/navigation';
import { products } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Star, Check, ArrowLeft, PlayCircle, FileText, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const product = products.find((p) => p.id === id);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [pricingMode, setPricingMode] = useState<'retail' | 'wholesale'>('retail');
    const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'usage'>('description');

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <Link href="/products" className="text-primary hover:underline">
                    Return to Products
                </Link>
            </div>
        );
    }

    // Currency Formatter
    const formatPrice = (price: number) => {
        if (product.currency === 'UGX') {
            return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(price);
        }
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    const currentPrice = pricingMode === 'wholesale' && product.wholesalePrice ? product.wholesalePrice : product.price;
    const minQty = pricingMode === 'wholesale' && product.wholesaleMinQty ? product.wholesaleMinQty : 1;

    const handleAddToCart = () => {
        const qtyToAdd = pricingMode === 'wholesale' ? quantity * minQty : quantity;
        for (let i = 0; i < qtyToAdd; i++) {
            addToCart(product);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Product Image & Video */}
                <div className="space-y-6">
                    <div className="aspect-square overflow-hidden rounded-xl border border-border bg-muted relative group">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                        {product.videoUrl && (
                            <button
                                onClick={() => setActiveTab('usage')}
                                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Product Details */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center text-yellow-500">
                            <Star className="h-5 w-5 fill-current" />
                            <span className="ml-1 font-medium text-foreground">{product.rating}</span>
                        </div>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-green-600 flex items-center text-sm font-medium">
                            <Check className="mr-1 h-4 w-4" />
                            In Stock ({product.stock} available)
                        </span>
                    </div>

                    {/* Pricing Toggle */}
                    {product.wholesalePrice && (
                        <div className="flex items-center bg-muted p-1 rounded-lg mb-6 w-fit">
                            <button
                                onClick={() => { setPricingMode('retail'); setQuantity(1); }}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${pricingMode === 'retail' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                Retail (1 pc)
                            </button>
                            <button
                                onClick={() => { setPricingMode('wholesale'); setQuantity(1); }}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${pricingMode === 'wholesale' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                Wholesale (Box of {product.wholesaleMinQty})
                            </button>
                        </div>
                    )}

                    <div className="text-4xl font-bold text-primary mb-2">
                        {formatPrice(currentPrice)}
                    </div>
                    {pricingMode === 'wholesale' && (
                        <p className="text-sm text-muted-foreground mb-6">
                            {formatPrice(currentPrice / minQty)} per unit
                        </p>
                    )}

                    <div className="prose prose-sm text-muted-foreground mb-8">
                        <p>{product.description}</p>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center border border-border rounded-md">
                            <button
                                className="px-3 py-2 hover:bg-muted transition-colors"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </button>
                            <span className="px-3 py-2 min-w-[3rem] text-center font-medium">{quantity}</span>
                            <button
                                className="px-3 py-2 hover:bg-muted transition-colors"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add {pricingMode === 'wholesale' ? `${quantity} Box${quantity > 1 ? 'es' : ''}` : 'to Cart'}
                        </button>
                    </div>

                    <div className="border-t border-border pt-6 space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                                <Check className="h-4 w-4" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm">Quality Guarantee</h4>
                                <p className="text-xs text-muted-foreground">All products are backed by our satisfaction guarantee.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="border-t border-border pt-12">
                <div className="flex border-b border-border mb-8">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                    >
                        Description
                    </button>
                    {product.specifications && (
                        <button
                            onClick={() => setActiveTab('specs')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        >
                            Specifications
                        </button>
                    )}
                    {(product.usageInstructions || product.videoUrl) && (
                        <button
                            onClick={() => setActiveTab('usage')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'usage' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        >
                            How to Use
                        </button>
                    )}
                </div>

                {/* Tab Content */}
                <div className="min-h-[300px]">
                    {activeTab === 'description' && (
                        <div className="prose max-w-none">
                            <p>{product.description}</p>
                        </div>
                    )}

                    {activeTab === 'specs' && product.specifications && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <div key={key} className="flex justify-between border-b border-border py-2">
                                    <span className="font-medium text-muted-foreground">{key}</span>
                                    <span className="text-foreground">{value}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'usage' && (
                        <div className="space-y-8">
                            {product.videoUrl && (
                                <div className="aspect-video w-full max-w-3xl rounded-xl overflow-hidden bg-black">
                                    <iframe
                                        src={product.videoUrl}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            )}

                            {product.usageInstructions && (
                                <div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <Wrench className="h-5 w-5 text-primary" />
                                        Step-by-Step Instructions
                                    </h3>
                                    <div className="space-y-4">
                                        {product.usageInstructions.map((step, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                                    {index + 1}
                                                </div>
                                                <p className="pt-1 text-muted-foreground">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

