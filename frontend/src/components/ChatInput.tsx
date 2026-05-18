"use client";

import { SendHorizonal } from "lucide-react";
import { useState } from "react";

type Props = {
  onSend: (message: string) => void;
  loading?: boolean;
};

export default function ChatInput({
  onSend,
  loading,
}: Props) {

  const [message, setMessage] = useState("");

  const handleSend = () => {

    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (

    <div className="w-full max-w-5xl px-6 pb-6">

      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-3xl
          shadow-sm
          flex
          items-center
          px-5
          py-4
        "
      >

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask AI to plan your trip..."
          className="
            flex-1
            outline-none
            text-gray-900
            placeholder:text-gray-400
            text-lg
            bg-transparent
          "
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="
            bg-purple-600
            hover:bg-purple-700
            transition-all
            text-white
            p-3
            rounded-2xl
            disabled:opacity-50
          "
        >

          <SendHorizonal size={20} />

        </button>

      </div>

    </div>
  );
}