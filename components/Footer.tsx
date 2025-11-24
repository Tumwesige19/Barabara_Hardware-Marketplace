import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-border bg-muted/40">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-foreground">Barabara Hardware</h3>
                        <p className="text-sm text-muted-foreground">
                            Your one-stop shop for quality hardware tools and supplies. Building dreams, one tool at a time.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-semibold">Shop</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/products?category=tools" className="hover:text-primary">Power Tools</Link></li>
                            <li><Link href="/products?category=hand-tools" className="hover:text-primary">Hand Tools</Link></li>
                            <li><Link href="/products?category=plumbing" className="hover:text-primary">Plumbing</Link></li>
                            <li><Link href="/products?category=electrical" className="hover:text-primary">Electrical</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-semibold">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-semibold">Contact</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>123 Hardware St.</li>
                            <li>Cityville, ST 12345</li>
                            <li>support@barabara.com</li>
                            <li>(555) 123-4567</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Barabara Hardware. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
