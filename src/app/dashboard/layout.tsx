import Sidebar from "@/components/sidebar/Sidebar";

/**
 * Dashboard layout — wraps all /dashboard/* routes
 * with a persistent sidebar and main content area.
 */
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex min-h-screen">
      <Sidebar />

      {/* Main content area — offset by sidebar width on desktop */}
      <main
        className="
          flex-1 min-w-0
          pb-[var(--bottom-nav-height)]
          md:pb-0
          md:ml-[var(--sidebar-collapsed)]
          lg:ml-[var(--sidebar-width)]
        "
      >
        <section className="mx-auto max-w-[1400px] px-4 py-8 md:py-12 lg:px-10 lg:py-16">
          {children}
        </section>
      </main>
    </section>
  );
}
