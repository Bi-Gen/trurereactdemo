import { useState } from "react";

const Index = () => {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([
    { id: 1, text: "Change the home page in a Todo list", completed: true },
    { id: 2, text: "Add new todo items", completed: false },
    { id: 3, text: "Mark items as completed", completed: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { id: Date.now(), text: inputValue.trim(), completed: false }]);
      setInputValue("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted">
      <div className="w-full max-w-md px-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="rounded-2xl border bg-card p-6 shadow-elegant">
              <h1 className="mb-6 text-2xl font-bold text-foreground">Todo List</h1>

              <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a new task..."
                  className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  onClick={addTask}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add
                </button>
              </div>

              <ul className="space-y-2">
                {tasks.map(task => (
                  <li key={task.id} className="flex items-center gap-3 rounded-lg border border-border bg-background/50 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="h-4 w-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <span className={`flex-1 text-sm ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {task.text}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              {tasks.length > 0 && (
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{tasks.filter(t => !t.completed).length} tasks remaining</span>
                  <button
                    onClick={() => setTasks(tasks.filter(t => !t.completed))}
                    className="hover:text-foreground underline"
                  >
                    Clear completed
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Powered by Trustable
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
