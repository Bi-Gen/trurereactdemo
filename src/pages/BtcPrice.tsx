import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const BtcPrice = () => {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBtcPrice = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/my/v1/btc-price");
      const data = await response.json();
      const result = data.body || data;
      if (result && result.price) {
        setBtcPrice(result.price);
      } else if (result && result.error) {
        setError(result.error);
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      setError("Failed to fetch BTC price");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted">
      <div className="w-full max-w-md px-6">
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
                  BTC Price in EUR
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  {error ? (
                    <p className="text-destructive">{error}</p>
                  ) : btcPrice ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Current BTC Price</p>
                      <p className="text-4xl font-bold text-primary">
                        {btcPrice.toFixed(2)} €
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Press the button to get the price</p>
                  )}
                </div>

                <Button
                  onClick={fetchBtcPrice}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? "Loading..." : "Get BTC Price"}
                </Button>

                <div className="mt-6 border-t pt-4">
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-sm font-medium text-muted-foreground">Quick Links:</p>
                    <Link to="/" className="text-primary hover:underline">
                      Back to Home
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

export default BtcPrice;
