import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Index = () => {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue.trim(), completed: false }]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
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
              <h1 className="mb-6 text-2xl font-bold text-foreground text-center">Todo List</h1>

              <div className="mb-6 flex gap-2">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === "Enter" && addTodo()}
                />
                <Button onClick={addTodo}>Add</Button>
              </div>

              <div className="space-y-3">
                {todos.length === 0 ? (
                  <p className="text-center text-muted-foreground">No tasks yet. Add one above!</p>
                ) : (
                  todos.map(todo => (
                    <div key={todo.id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className={`flex-1 ${todo.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        {todo.text}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTodo(todo.id)}
                        className="h-8 w-8 text-destructive"
                      >
                        ✕
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {todos.length > 0 && (
                <div className="mt-6 border-t pt-4 text-center text-sm text-muted-foreground">
                  {todos.filter(t => !t.completed).length} task{todos.filter(t => !t.completed).length !== 1 ? "s" : ""} remaining
                </div>
              )}

              <div className="mt-6 space-y-2 text-center">
                <p className="text-sm font-medium text-muted-foreground">Quick Links:</p>
                <div className="flex flex-col gap-2">
                  <Link to="/pomodoro" className="text-primary hover:underline">
                    Pomodoro Timer
                  </Link>
                  <Link to="/git-issue" className="text-primary hover:underline">
                    Create GitHub Issue
                  </Link>
                  <Link to="/btc-price" className="text-primary hover:underline">
                    BTC Price in EUR
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

export default Index;
