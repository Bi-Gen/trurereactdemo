import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"pomodoro" | "short" | "long">("pomodoro");
  const intervalRef = useRef<number | null>(null);

  const MODES = {
    pomodoro: { label: "Pomodoro", seconds: 25 * 60 },
    short: { label: "Short Break", seconds: 5 * 60 },
    long: { label: "Long Break", seconds: 15 * 60 },
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleModeChange = (newMode: typeof mode) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode].seconds);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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
            <div className="rounded-2xl border bg-card p-8 shadow-elegant">
              <h1 className="mb-6 text-2xl font-bold text-foreground">Pomodoro Timer</h1>

              <div className="mb-8 flex gap-2">
                {(Object.keys(MODES) as Array<keyof typeof MODES>).map((m) => (
                  <Button
                    key={m}
                    variant={mode === m ? "default" : "outline"}
                    onClick={() => handleModeChange(m)}
                  >
                    {MODES[m].label}
                  </Button>
                ))}
              </div>

              <div className="mb-8 text-center">
                <div className="text-6xl font-mono font-bold text-foreground">
                  {formatTime(timeLeft)}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => setIsRunning(!isRunning)}
                  className="min-w-[120px]"
                >
                  {isRunning ? "Pause" : "Start"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setIsRunning(false);
                    setTimeLeft(MODES[mode].seconds);
                  }}
                >
                  Reset
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Quick Links:</p>
                <div className="flex flex-col gap-2">
                  <Link to="/" className="text-primary hover:underline">
                    ← Back to Todo List
                  </Link>
                  <Link to="/git-issue" className="text-primary hover:underline">
                    Create GitHub Issue
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className="animate-in fade-in duration-1000 delay-300 text-center text-sm text-muted-foreground">
            Powered by Trustable
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
