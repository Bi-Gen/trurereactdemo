import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { format } from "date-fns";

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
      console.log("=== BTC History Response ===");
      console.log("Full response:", data);
      console.log("data.success:", data.success);
      console.log("data.prices:", data.prices);
      console.log("================================");
      if (data.success && Array.isArray(data.prices)) {
        setPrices(data.prices);
        console.log("✓ Loaded", data.prices.length, "prices");
      } else if (data.error) {
        setError(data.error);
        console.error("Error from backend:", data.error);
      } else {
        setError("Unexpected response format");
        console.error("Unexpected format. Keys:", Object.keys(data));
      }
    } catch (err) {
      setError("Failed to fetch: " + String(err));
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBtcHistory();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted">
      <div className="w-full max-w-5xl px-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="animate-in fade-in zoom-in duration-500">
            <img
              src="/trustable.png"
              alt="Trustable Logo"
              className="h-24 w-auto"
            />
          </div>

          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <Card className="border bg-card shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                <CardTitle className="text-2xl font-bold text-center">
                  Bitcoin Price History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6 flex justify-center">
                  <button
                    onClick={fetchBtcHistory}
                    disabled={loading}
                    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary/70 px-8 py-3 font-medium text-primary-foreground transition-all hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:scale-100"
                  >
                    <span className="relative flex items-center gap-2">
                      {loading ? (
                        <>
                          <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v3a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                          </svg>
                          Refresh Data
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {error ? (
                  <div className="rounded-lg bg-destructive/10 p-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3 h-12 w-12 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-lg font-semibold text-destructive">{error}</p>
                  </div>
                ) : prices.length === 0 ? (
                  <div className="rounded-lg bg-muted/30 p-12 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 h-16 w-16 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-xl font-medium text-muted-foreground">No prices recorded yet</p>
                    <p className="mt-2 text-sm text-muted-foreground">Get the current BTC price to start recording</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-gradient-to-r from-muted/50 to-muted/30">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-foreground">ID</th>
                          <th className="px-6 py-4 text-left font-semibold text-foreground">Price (EUR)</th>
                          <th className="px-6 py-4 text-left font-semibold text-foreground">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {prices.map((price, index) => (
                          <tr
                            key={price.id}
                            className="group hover:bg-muted/30 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 font-medium text-foreground">
                              <span className="inline-flex items-center justify-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                #{price.id}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-bold text-primary">{price.price.toFixed(2)} €</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {format(new Date(price.created_at), "MMM dd, yyyy HH:mm:ss")}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-8 rounded-xl bg-muted/20 p-6">
                  <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-8">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <Link to="/" className="font-medium text-primary hover:text-primary/80 transition-colors">
                        Back to Home
                      </Link>
                    </div>
                    <div className="h-4 w-px bg-muted sm:h-8" />
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-orange-500/10 p-2 text-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A4.999 4.999 0 0115 4.07V14.07A4.999 4.999 0 0110.414 19H9a2 2 0 01-2-2V6a2 2 0 00-2-2H4zm4 10a1 1 0 110-2 1 1 0 010 2zm4-4a1 1 0 110-2 1 1 0 010 2zm-4-4a1 1 0 110-2 1 1 0 010 2zm-4 4a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <Link to="/btc-price" className="font-medium text-primary hover:text-primary/80 transition-colors">
                        Get Current BTC Price
                      </Link>
                    </div>
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
