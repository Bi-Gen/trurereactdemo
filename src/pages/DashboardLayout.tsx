import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Clients", path: "/dashboard/clients" },
    { name: "Products", path: "/dashboard/products" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r bg-card p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Gestionale</h1>
          <p className="text-sm text-muted-foreground">CRM System</p>
        </div>

        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                "text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t">
          <div className="mb-4">
            <p className="text-sm font-medium text-foreground">{user.name || user.username}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-muted/50">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Sidebar;