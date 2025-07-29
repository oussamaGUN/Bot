import { useState } from "react";
import { useEffect, useRef } from "react";
function MainBody() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSend = (input: string) => {
    fetch("http://localhost:8080/api/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ prompt: input }),
    })
      .then((res) => res.text())
      .then((data) => {
        setResponse([...response, data]);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        // setLoading(false);
      });
  };
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scroll to bottom when messages or responses change
    container.scrollTop = container.scrollHeight;
  }, [messages, response]);
  return (
    <div className="bg-bg text-text-secondary w-screen font-family">
      <div
        ref={containerRef}
        className="w-240 h-210 overflow-y-auto hide-scrollbar items-center justify-center mx-auto mt-10"
        style={{ position: "relative" }}
      >
        {messages.map((message, index) => (
          <div key={index} className="p-4 border-b border-gray-200">
            <p className="text-lg p-5 break-words ml-80 mt-10 rounded-2xl bg-gray-300">
              {message}
            </p>
            <p className="text-lg break-words mr-80 mt-5">
              {response[index] ? response[index] : "thinking..."}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4 absolute bottom-0 left-0 right-0 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button
          onClick={() => {
            setMessages([...messages, input]);
            setInput("");
            handleSend(input);
          }}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MainBody;
