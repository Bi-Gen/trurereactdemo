import { useState } from "react";

const GitIssue = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const repo = "Bi-Gen/trurereactdemo";

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/my/v1/git-issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok && data.success) {
        setSuccess(true);
        setTitle("");
        setBody("");
      } else {
        alert(data.error || "Failed to create issue");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create GitHub Issue</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Issue title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded h-32"
            placeholder="Issue description"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || !title || !body}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Issue"}
        </button>
        {success && (
          <div className="text-green-500">Issue created successfully!</div>
        )}
        {loading && <div className="text-blue-500">Creating issue...</div>}
        {success && (
          <a href={`https://github.com/${repo || "Bi-Gen/trurereactdemo"}/issues/4`} target="_blank" className="text-blue-500 underline">
            View issue
          </a>
        )}
      </div>
    </div>
  );
};

export default GitIssue;
