import React, { useState } from "react";
import { SquarePen } from "lucide-react";

function LeftBar() {
  const [workflows, setWorkflows] = useState<string[]>([
    "Workflow 1",
  ]);
  const [currentWorkflow, setCurrentWorkflow] = useState<number | null>(null);

  const handleNewWorkflow = () => {
    const newTitle = `Workflow ${workflows.length + 1}`;
    setWorkflows((prev) => [...prev, newTitle]);
    setCurrentWorkflow(workflows.length); // select the new one
  };

  return (
    <div className="w-60 bg-black text-white min-h-screen p-4">
      <h1 className="text-2xl text-blue-400 mb-6">Bot</h1>

      <button
        onClick={handleNewWorkflow}
        className="flex items-center gap-2 bg-amber-300 text-black px-3 py-2 rounded-lg w-full"
      >
        <SquarePen size={20} />
        New Workflow
      </button>

      <h2 className="mt-8 text-blue-300">Workflows</h2>

      <div className="mt-2 flex flex-col gap-2 h-180 bg-amber-900 overflow-y-auto p-2 rounded-lg hide-scrollbar">
        {workflows.map((title, index) => (
          <button
            key={index}
            onClick={() => setCurrentWorkflow(index)}
            className={`text-left px-3 py-2 rounded-lg w-full ${
              currentWorkflow === index ? "bg-amber-500" : "bg-amber-100 text-black"
            }`}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LeftBar;
