import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const BtcHistory = () => {
  const [prices, setPrices] = useState<{ id: number; price: number; created_at: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBtcHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/my/v1/btc-history");
      const data = await response.json();
      if (data.body && data.body.success && data.body.prices) {
        setPrices(data.body.prices);
      } else if (data.body && data.body.error) {
        setError(data.body.error);
      }
    } catch (err) {
      setError("Failed to fetch BTC history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBtcHistory();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted">
      <div className="w-full max-w-4xl px-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="animate-in fade-in zoom-in duration-500">
            <img
              src="/trustable.png"
              alt="Trustable Logo"
              className="h-24 w-auto"
            />
          </div>

          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <Card className="border bg-card p-8 shadow-elegant">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">
                  BTC Price History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={fetchBtcHistory}
                    disabled={loading}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {loading ? "Loading..." : "Refresh"}
                  </button>
                </div>

                {error ? (
                  <p className="text-center text-destructive">{error}</p>
                ) : prices.length === 0 ? (
                  <p className="text-center text-muted-foreground">No prices recorded yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-muted">
                        <tr>
                          <th className="px-4 py-3">ID</th>
                          <th className="px-4 py-3">Price (EUR)</th>
                          <th className="px-4 py-3">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prices.map((price) => (
                          <tr key={price.id} className="border-b hover:bg-muted/50">
                            <td className="px-4 py-3">{price.id}</td>
                            <td className="px-4 py-3 font-medium text-primary">{price.price.toFixed(2)} €</td>
                            <td className="px-4 py-3 text-muted-foreground">{price.created_at}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-6 border-t pt-4">
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-sm font-medium text-muted-foreground">Quick Links:</p>
                    <Link to="/" className="text-primary hover:underline">
                      Back to Home
                    </Link>
                    <Link to="/btc-price" className="text-primary hover:underline">
                      Get BTC Price
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="animate-in fade-in duration-1000 delay-300 text-center text-sm text-muted-foreground">
            Powered by Trustable
          </p>
        </div>
      </div>
    </div>
  );
};

export default BtcHistory;
