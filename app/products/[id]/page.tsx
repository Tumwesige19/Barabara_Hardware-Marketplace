'use client';

import { useParams } from 'next/navigation';
import { products } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Star, Check, ArrowLeft, PlayCircle, FileText, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { DoorConfigurator } from '@/components/DoorConfigurator';

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

                    <div className="prose prose-sm text-slate-700 mb-8">
                        <p>{product.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                        <div className="flex items-center border border-border rounded-md justify-between sm:justify-start h-12">
                            <button
                                className="px-4 py-2 hover:bg-muted transition-colors text-lg"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </button>
                            <span className="px-3 py-2 min-w-[3rem] text-center font-bold text-sm">{quantity}</span>
                            <button
                                className="px-4 py-2 hover:bg-muted transition-colors text-lg"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                        
                        <div className="flex flex-1 gap-3">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 h-12 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors cursor-pointer shrink-0"
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add {pricingMode === 'wholesale' ? `${quantity} Box${quantity > 1 ? 'es' : ''}` : 'to Cart'}
                            </button>
                            
                            <a
                                href={`https://wa.me/256755123456?text=${encodeURIComponent(
                                    pricingMode === 'wholesale' 
                                        ? `Hello Barabara Hardware! I am interested in placing a wholesale order for ${quantity} box(es) of "${product.name}" (${formatPrice(currentPrice)} per box). Totaling: ${formatPrice(currentPrice * quantity)}.`
                                        : `Hello Barabara Hardware! I am interested in purchasing ${quantity} unit(s) of "${product.name}" (${formatPrice(currentPrice)} each). Totaling: ${formatPrice(currentPrice * quantity)}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-12 flex-1 inline-flex items-center justify-center rounded-md bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white px-4 py-3 shadow transition-colors cursor-pointer gap-1.5 shrink-0"
                            >
                                <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.284 1.48 4.961 1.482 5.372 0 9.747-4.334 9.75-9.664.002-2.583-1.002-5.01-2.827-6.837-1.826-1.826-4.25-2.83-6.837-2.831-5.378 0-9.754 4.335-9.757 9.667-.001 1.838.497 3.568 1.442 5.093l-.953 3.484 3.585-.929zm11.366-6.86c-.328-.164-1.94-.959-2.241-1.069-.301-.11-.52-.164-.738.164-.219.329-.848 1.069-1.039 1.288-.192.219-.384.246-.712.083-.328-.164-1.386-.51-2.64-1.627-.975-.87-1.633-1.944-1.825-2.272-.192-.329-.02-.507.144-.67.147-.147.328-.384.492-.575.164-.192.219-.328.328-.548.11-.219.055-.411-.027-.575-.082-.164-.738-1.78-.1011-2.438-.3-.727-.618-.713-.848-.713-.219-.002-.469-.002-.719-.002-.25 0-.656.094-.99.466-.334.372-1.275 1.247-1.275 3.041 0 1.795 1.309 3.524 1.49 3.771.182.247 2.578 3.937 6.244 5.521.872.376 1.553.6 2.082.768.877.279 1.676.24 2.306.146.702-.105 1.94-.795 2.214-1.56.274-.766.274-1.423.192-1.56-.082-.138-.301-.219-.63-.383z"/>
                                </svg>
                                <span>WhatsApp Order</span>
                            </a>
                        </div>
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

            {/* Interactive Customizer for Door Locks */}
            {product.category === 'door-locks' && (
                <div className="mb-16">
                    <DoorConfigurator productImage={product.image} productName={product.name} />
                </div>
            )}

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

