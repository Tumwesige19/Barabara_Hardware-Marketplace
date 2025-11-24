'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface OrderIdProps {
    id: string;
}

export function OrderId({ id }: OrderIdProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent row click
        navigator.clipboard.writeText(id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Shorten ID for display (first 8 chars)
    const shortId = id.length > 8 ? `#${id.substring(0, 8)}...` : `#${id}`;

    return (
        <div className="flex items-center gap-2 group">
            <span className="font-mono text-xs font-medium" title={id}>
                {shortId}
            </span>
            <button
                onClick={handleCopy}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded-md"
                title="Copy full ID"
            >
                {copied ? (
                    <Check className="h-3 w-3 text-green-600" />
                ) : (
                    <Copy className="h-3 w-3 text-muted-foreground" />
                )}
            </button>
        </div>
    );
}
