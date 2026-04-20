import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Benvenuto nel tuo gestionale</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Clienti Totali</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Prodotti Totali</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground"> fatturato (anno)</h3>
          <p className="text-3xl font-bold mt-2">€0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;