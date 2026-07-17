// This layout overrides the parent app/admin/layout.tsx for the /admin/login route.
// It is intentionally a simple passthrough — no auth check — because this IS the auth page.
// Without this, the parent layout would redirect unauthenticated users to /admin/login
// creating an infinite redirect loop (ERR_TOO_MANY_REDIRECTS).

export default function AdminLoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
