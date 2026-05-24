import { AdminSidebar, MobileAdminNav } from "./AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas lg:flex">
      <AdminSidebar />
      <MobileAdminNav />
      <main className="flex min-h-screen min-w-0 flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}
