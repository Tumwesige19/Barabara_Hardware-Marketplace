export function formatCurrency(amount: number): string {
    return `UGX ${amount.toLocaleString()}`;
}

export function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}
