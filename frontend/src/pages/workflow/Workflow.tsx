import React, { use, useEffect, useState } from "react";
import MainBody from "./main_body";
import LeftBar from "./left_bar";
import { useNavigate } from "react-router-dom";

interface WorkflowType {
  title: string;
  tokens: string;
}

function generateToken(): string {
  return Array.from({ length: 10 }, () =>
    Math.random().toString(36).charAt(2)
  ).join("");
}

function Workflow() {
  const [workflows, setWorkflows] = useState<WorkflowType[]>([
    { title: "Chat 1", tokens: generateToken() },
  ]);
  const [currentWorkflowIndex, setCurrentWorkflowIndex] = useState<
    number | null
  >(0);

  const handleNewWorkflow = () => {
    const newTitle = `Chat ${workflows.length + 1}`;
    const newTokens = generateToken();
    const newWorkflow = { title: newTitle, tokens: newTokens };
    setWorkflows((prev) => {
      const updated = [prev[0], newWorkflow, ...prev.slice(1)];
      return updated;
    });
    setCurrentWorkflowIndex(1); // select the new one
  };

  const handleSelectWorkflow = (index: number) => {
    setCurrentWorkflowIndex(index);
  };

  const currentToken =
    currentWorkflowIndex !== null ? workflows[currentWorkflowIndex].tokens : "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/queries`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (res.status === 401) {
          const refreshRes = await fetch(
            "http://localhost:8080/auth/new-accessToken",
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );

          if (refreshRes.status === 201) {
            return fetchMessages();
          } else {
            navigate("/signin");
            return;
          }
        }
        const data = await res.json();
        const formattedMessages: WorkflowType[] = data.map((msg: any) => ({
          title: msg.prompt,
          tokens: msg.workflowId,
        }));
        if (formattedMessages.length === 0) {
          setWorkflows([{ title: "Chat 1", tokens: generateToken() }]);
          return;
        }
        for (const msg of formattedMessages)
        {
          setWorkflows((prev) => {
            const updated = [prev[0], msg, ...prev.slice(1)];
            return updated;
          });
          
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages(); // <---- CALL THE FUNCTION HERE
  }, [navigate]);
  useEffect(() => {
    // Remove duplicate workflows by tokens, keeping the first
    const uniqueWorkflows = workflows.filter(
      (workflow, index, self) =>
        index === self.findIndex((w) => w.tokens === workflow.tokens)
    );

    if (uniqueWorkflows.length !== workflows.length) {
      setWorkflows(uniqueWorkflows); // Update state to remove duplicates
    }
  }, [workflows]);

  return (
    <div className="h-screen w-screen flex">
      <LeftBar
        workflows={workflows}
        currentWorkflowIndex={currentWorkflowIndex}
        onNewWorkflow={handleNewWorkflow}
        onSelectWorkflow={handleSelectWorkflow}
      />
      <MainBody token={currentToken} />
    </div>
  );
}

export default Workflow;
