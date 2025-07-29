import { useState } from "react";

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
      body: JSON.stringify({ prompt:  input}),
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

  return (
    <div className="bg-bg text-text-secondary w-screen font-family">
      <div className="p-4 text-center text-2xl mt-20 text-text-black">
        /(^_^)/
      </div>
      <div className=" w-220 h-120 overflow-y-auto items-center justify-center mx-auto mt-10 rounded-lg shadow-lg">
        {messages.map((message, index) => (
          <div key={index} className="p-4 border-b border-gray-200 ">
            <p className="text-lg  break-words bg-amber-400 ml-80 mt-10">
              {message}
            </p>
            <p className="text-lg break-words bg-red-600 mr-80 mt-5">
              {response[index] ? response[index] : "Loading..."}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4">
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
