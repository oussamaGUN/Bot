import React from "react";
import { SquarePen } from "lucide-react";

interface Workflow {
  title: string;
  tokens: string;
}

interface Props {
  workflows: Workflow[];
  currentWorkflowIndex: number | null;
  onNewWorkflow: () => void;
  onSelectWorkflow: (index: number) => void;
}

function LeftBar({
  workflows,
  currentWorkflowIndex,
  onNewWorkflow,
  onSelectWorkflow,
}: Props) {
  return (
    <div className="w-60 bg-black text-white min-h-screen p-4">
      <h1 className="text-2xl text-blue-400 mb-6">Bot</h1>

      <button
        onClick={onNewWorkflow}
        className="flex items-center gap-2 bg-amber-300 text-black px-3 py-2 rounded-lg w-full "
      >
        <SquarePen size={20} />
        New Workflow
      </button>

      <h2 className="mt-8 text-blue-300">Workflows</h2>

      <div className="mt-2 h-180 bg-amber-900 overflow-y-auto p-2 rounded-lg hide-scrollbar space-y-1.5">
        {workflows.map((workflow, index) => (
          <button
            key={index}
            onClick={() => {
              onSelectWorkflow(index);
            }}
            className={`text-left max-h-20 overflow-hidden px-3 py-2 rounded-lg w-full ${
              currentWorkflowIndex === index
                ? "bg-amber-500"
                : "bg-amber-100 text-black"
            }`}
          >
            {workflow.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LeftBar;
