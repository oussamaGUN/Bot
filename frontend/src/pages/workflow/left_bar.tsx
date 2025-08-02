import React from "react";
import { SquarePen, Settings, LogOut, X } from "lucide-react";
import { useState } from "react";
import { data } from "react-router-dom";
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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [oldEmail, setOldEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [dataReceivedValid, setDataReceivedValid] = useState(false);
  const [dataReceivedError, setDataReceivedError] = useState(false);
  const [dataReceivedMessages, setDataReceivedMessages] = useState("");
  const handleUpdateEmail = async () => {
    const res = await fetch("http://localhost:8080/profile/update-email", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        old_email: oldEmail,
        new_email: newEmail,
        old_password: "",
        new_password: "",
      }),
    });
    const data: string = await res.text();
    if (res.status === 200) {
      setDataReceivedError(false);
      setDataReceivedValid(true);
      setDataReceivedMessages(data);
    } else if (res.status === 409) {
      setDataReceivedError(true);
      setDataReceivedValid(false);
      setDataReceivedMessages(data);
    } else {
      setDataReceivedError(true);
      // setDataReceivedValid(false);
      setDataReceivedMessages("An error occurred while updating profile.");
    }
    setOldEmail("");
    setNewEmail("");
    setOldPassword("");
    setNewPassword("");
    // setSettingsOpen(false);
  };
  const handleUpdatePassword = async () => {
    const res = await fetch("http://localhost:8080/profile/update-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        old_email: "",
        new_email: "",
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });
    const data: string = await res.text();
    if (res.status === 200) {
      setDataReceivedError(false);
      setDataReceivedValid(true);
      setDataReceivedMessages(data);
    } else if (res.status === 409) {
      setDataReceivedError(true);
      setDataReceivedValid(false);
      setDataReceivedMessages(data);
    } else {
      setDataReceivedError(true);
      // setDataReceivedValid(false);
      setDataReceivedMessages("An error occurred while updating profile.");
    }
    setOldEmail("");
    setNewEmail("");
    setOldPassword("");
    setNewPassword("");
    // setSettingsOpen(false);
  };
  const loginOut = async () => {
    const res = await fetch("http://localhost:8080/auth/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (res.status === 200) {
      window.location.href = "/signin";
    } else {
      console.error("Logout failed");
    }
  };
  return (
    <div className="w-60 bg-bg  min-h-screen p-4 shadow-3xl border border-gray-400">

      <button
        onClick={onNewWorkflow}
        className="flex items-center gap-2 bg-text-black text-text-white  px-3 py-2 rounded-lg w-full mt-15"
      >
        <SquarePen size={20} />
        New Workflow
      </button>

      <h2 className="mt-8 text-text-black">Chats</h2>

      <div className="mt-2 h-180  overflow-y-auto  rounded-lg hide-scrollbar space-y-1.5">
        {workflows.map((workflow, index) => (
          <button
            key={index}
            onClick={() => {
              onSelectWorkflow(index);
            }}
            className={`text-left max-h-20 overflow-hidden px-3 py-2 rounded-lg w-full ${
              currentWorkflowIndex === index
                ? "bg-workflow-bg-on text-text-white"
                : "bg-workflow-bg-off text-black"
            }`}
          >
            {workflow.title}
          </button>
        ))}
      </div>
      {settingsOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-1 flex items-center justify-center"></div>
          <div
            id="settings"
            className="bg-white w-150 z-2 h-150 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg opacity-100"
          >
            <div>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setSettingsOpen(false)}
              >
                <X />
              </button>
            </div>
            <div className="">
              <div className="flex flex-col items-center justify-center p-4">
                <h1 className="text-black text-2xl mt-5">Email update</h1>
                <input
                  type="email"
                  value={oldEmail}
                  onChange={(e) => setOldEmail(e.target.value)}
                  placeholder="Enter your old email"
                  className="w-130 p-2 mt-5 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900"
                />
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter your new email"
                  className="w-130 p-2 mt-5 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900"
                />
              <button
                onClick={handleUpdateEmail}
                className="mt-10 ml-4  bg-text-blue hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              >
                Update
              </button>
              </div>
              <div className="flex flex-col items-center justify-center p-4">
                <h1 className="text-black text-2xl">Password update</h1>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter your old password"
                  className="w-130 p-2 border mt-5 border-gray-300 rounded-lg placeholder-gray-500 text-gray-900"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="w-130 p-2 mt-5 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900"
                />
                {dataReceivedValid && (
                  <p className="text-green-500 mt-2">{dataReceivedMessages}</p>
                )}
                {dataReceivedError && (
                  <p className="text-red-500 mt-2">{dataReceivedMessages}</p>
                )}
                <button
                  onClick={handleUpdatePassword}
                  className="mt-10 ml-4  bg-text-blue hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="mt-4 text-gray-400 text-sm">
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="flex items-center gap-2 w-full bg-text-black hover:bg-text-blue text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          <Settings />
          Profile
        </button>
        <button
          onClick={loginOut}
          className="flex items-center gap-2 w-full bg-text-black hover:bg-text-blue text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out mt-2">
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  );
}

export default LeftBar;
