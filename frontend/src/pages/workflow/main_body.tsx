import { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
interface MessageEntry {
  input: string;
  token: string;
}
function MainBody({ token }: { token: string }) {
  const [messages, setMessages] = useState<MessageEntry[]>([]);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch initial messages for the token
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
            // Retry fetching messages
            return fetchMessages();
          } else {
            navigate("/signin");
            return;
          }
        }

        const data = await res.json();
        const formattedMessages: MessageEntry[] = data.map((msg: any) => ({
          input: msg.prompt,
          token: msg.workflowId,
        }));
        setMessages(formattedMessages);
        const initialResponses = data.map((msg: any) => msg.response);
        setResponse(initialResponses);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [token, navigate]);
  useEffect(() => {
    // console.log("messages:", messages);
  }, [messages]);

  const handleSend = async (input: string) => {
    try {
      let res = await fetch("http://localhost:8080/api/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ prompt: input, workflowId: token }),
      });

      // If unauthorized, try to refresh token
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
          // Retry the original request
          res = await fetch("http://localhost:8080/api/prompt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ prompt: input, workflowId: token }),
          });
        } else {
          navigate("/signin");
          return;
        }
      }

      const data = await res.text();
      setResponse((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error:", error);
    }
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
      {messages.filter((msg) => msg.token === token).length === 0 && (
        <div className="flex items-end justify-center  h-1/2 absolute w-[50%] left-[30%]">
          <h1 className="text-2xl text-text-blue">
            Welcome to the Bot — 99% confidence, 1% accuracy{" "}
            <span className="text-sm">
              {" "}
              <br /> (I'm broke can't afford neither OpenAI tokens or strong
              GPU)
            </span>
          </h1>
        </div>
      )}
      <div
        ref={containerRef}
        className="w-230 h-210 overflow-y-auto hide-scrollbar items-center justify-center mx-auto mt-10 "
        style={{ position: "relative" }}
      >
        {messages.map((message, index) =>
          message.token !== token ? null : (
            <div key={index} className="p-4 border-b border-gray-200">
              <div className="flex flex-col items-end">
                <p className="inline-block text-lg p-5 break-words mt-10 rounded-2xl bg-gray-300 max-w-200">
                  {message.input}
                </p>
              </div>

              <p className="w-200 text-lg break-words mr-80 mt-5">
                {response[index] ? response[index] : "thinking..."}
              </p>
            </div>
          )
        )}
      </div>
      <div className="flex flex-col items-center justify-center mt-5">
        <div className="p-4 w-230 flex justify-center items-center gap-2 ">
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault(); // prevent default form submission
              const newMessage: MessageEntry = {
                input,
                token,
              };
              setMessages((prev) => [...prev, newMessage]);
              handleSend(input); // call your send function
              setInput(""); // optionally clear the input
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // prevent newline
                  const newMessage: MessageEntry = {
                    input,
                    token,
                  };
                  setMessages((prev) => [...prev, newMessage]);
                  handleSend(input); // call send function
                  setInput(""); // optionally clear
                }
              }}
              className="w-full p-4 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 break-words resize-none"
              placeholder="Type your message here..."
            />
          </form>
          <button
            onClick={() => {
              const newMessage: MessageEntry = {
                input,
                token,
              };
              setMessages((prev) => [...prev, newMessage]);
              setInput("");
              handleSend(input);
            }}
            className="text-text-blue cursor-pointer mb-10 "
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainBody;
