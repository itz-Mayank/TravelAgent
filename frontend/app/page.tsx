"use client";

import { useEffect, useState } from "react";

import ChatInput from "../src/components/ChatInput";
import ChatWindow from "../src/components/ChatWindow";
import Sidebar from "../src/components/Sidebar";

import { sendMessage } from "../src/services/api";

import {
  Map,
  Mountain,
  Plane,
  Sparkles,
  Wallet,
} from "lucide-react";

import { ChatSession } from "../src/types/chat";

export default function Home() {

  const [sessions, setSessions] =
    useState<ChatSession[]>([]);

  const [activeSessionId, setActiveSessionId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const activeSession = sessions.find(
    (s) => s.id === activeSessionId
  );

  useEffect(() => {

    const saved = localStorage.getItem(
      "sorsiri_sessions"
    );

    if (saved) {

      const parsed = JSON.parse(saved);

      setSessions(parsed);

      if (parsed.length > 0) {
        setActiveSessionId(parsed[0].id);
      }
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "sorsiri_sessions",
      JSON.stringify(sessions)
    );

  }, [sessions]);

  const createNewChat = () => {

    const newSession: ChatSession = {

      id: crypto.randomUUID(),

      title: "New Travel Plan",

      pinned: false,

      wishlist: false,

      createdAt: new Date().toISOString(),

      messages: [],
    };

    setSessions((prev) => [
      newSession,
      ...prev,
    ]);

    setActiveSessionId(newSession.id);
  };

  const handleSend = async (
    message: string
  ) => {

    let sessionId = activeSessionId;

    if (!sessionId) {

      const newSession: ChatSession = {

        id: crypto.randomUUID(),

        title: message,

        pinned: false,

        wishlist: false,

        createdAt: new Date().toISOString(),

        messages: [],
      };

      setSessions((prev) => [
        newSession,
        ...prev,
      ]);

      setActiveSessionId(newSession.id);

      sessionId = newSession.id;
    }

    try {

      setLoading(true);

      setSessions((prev) =>
        prev.map((session) => {

          if (session.id !== sessionId)
            return session;

          return {

            ...session,

            title: message,

            messages: [
              ...session.messages,

              {
                role: "user",
                content: message,
              },
            ],
          };
        })
      );

      const data = await sendMessage(message);

      setSessions((prev) =>
        prev.map((session) => {

          if (session.id !== sessionId)
            return session;

          return {

            ...session,

            messages: [
              ...session.messages,

              {
                role: "assistant",
                content: data.response,
              },
            ],
          };
        })
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  const togglePin = (id: string) => {

    setSessions((prev) =>
      prev.map((session) =>
        session.id === id
          ? {
              ...session,
              pinned: !session.pinned,
            }
          : session
      )
    );
  };

  const toggleWishlist = (
    id: string
  ) => {

    setSessions((prev) =>
      prev.map((session) =>
        session.id === id
          ? {
              ...session,
              wishlist: !session.wishlist,
            }
          : session
      )
    );
  };

  const deleteChat = (id: string) => {

  const updatedSessions = sessions.filter(
    (session) => session.id !== id
  );

  setSessions(updatedSessions);

  if (activeSessionId === id) {

    if (updatedSessions.length > 0) {

      setActiveSessionId(
        updatedSessions[0].id
      );

    } else {

      setActiveSessionId(null);
    }
  }
};

  const suggestionPrompts = [

    {
      icon: Plane,
      text: "Plan a luxury Dubai vacation",
    },

    {
      icon: Mountain,
      text: "Adventure trip to Himachal",
    },

    {
      icon: Wallet,
      text: "Budget backpacking across India",
    },

    {
      icon: Map,
      text: "3-day Goa itinerary",
    },
  ];

  return (

    <main className="
      flex
      h-screen
      bg-[#f7f7fb]
    ">

      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        setActiveSessionId={
          setActiveSessionId
        }
        createNewChat={createNewChat}
        togglePin={togglePin}
        toggleWishlist={toggleWishlist}
        deleteChat={deleteChat}
      />

      <div className="
        flex-1
        flex
        flex-col
        overflow-hidden
      ">

        {/* TOPBAR */}

        <div className="
          h-[80px]
          bg-white/80
          backdrop-blur-md
          border-b
          border-gray-200
          flex
          items-center
          justify-between
          px-10
        ">

          <div>

            <h1 className="
              text-2xl
              font-bold
              text-gray-900
            ">
              AI Travel Workspace
            </h1>

            <p className="
              text-gray-500
              text-sm
              mt-1
            ">
              Human-in-the-loop intelligent planning
            </p>

          </div>

          <button
            onClick={createNewChat}
            className="
              bg-purple-600
              hover:bg-purple-700
              transition-all
              text-white
              px-6
              py-3
              rounded-2xl
              font-medium
              shadow-sm
            "
          >
            New Workspace
          </button>

        </div>

        {/* CONTENT */}

        <div className="
          flex-1
          overflow-y-auto
        ">

          {!activeSession ||
          activeSession.messages.length === 0 ? (

            <div className="
              h-full
              flex
              flex-col
              items-center
              justify-center
              px-6
            ">

              <div className="
                max-w-4xl
                w-full
                text-center
              ">

                <div className="
                  w-24
                  h-24
                  rounded-3xl
                  bg-gradient-to-br
                  from-purple-600
                  to-pink-500
                  mx-auto
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-lg
                ">

                  <Sparkles size={40} />

                </div>

                <h1 className="
                  mt-7
                  text-5xl
                  font-light
                  text-gray-900
                  leading-tight
                ">
                  How can I help plan
                  your next trip?
                </h1>

                <p className="
                  mt-2
                  text-xl
                  text-gray-500
                  leading-3
                ">
                  AI-powered intelligent
                  travel planning with
                  human-controlled workflows
                </p>

                {/* SUGGESTIONS */}

                <div className="
                  grid
                  grid-cols-2
                  gap-4
                  mt-12
                ">

                  {suggestionPrompts.map(
                    (item, index) => {

                      const Icon = item.icon;

                      return (

                        <button
                          key={index}
                          onClick={() =>
                            handleSend(item.text)
                          }
                          className="
                            bg-white
                            hover:bg-purple-50
                            border
                            border-gray-200
                            hover:border-purple-200
                            transition-all
                            rounded-3xl
                            p-6
                            text-left
                            shadow-sm
                          "
                        >

                          <div className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-purple-100
                            flex
                            items-center
                            justify-center
                            text-purple-600
                            mb-5
                          ">

                            <Icon size={24} />

                          </div>

                          <p className="
                            text-gray-800
                            font-medium
                            text-lg
                            leading-7
                          ">
                            {item.text}
                          </p>

                        </button>
                      );
                    }
                  )}

                </div>

              </div>

            </div>

          ) : (

            <ChatWindow
              session={activeSession}
              onContinue={(newResponse) => {

                if (!activeSessionId) return;

                setSessions((prev) =>
                  prev.map((session) => {

                    if (
                      session.id !== activeSessionId
                    ) {
                      return session;
                    }

                    return {

                      ...session,

                      messages: [

                        ...session.messages,

                        {
                          role: "assistant",
                          content: newResponse,
                        },
                      ],
                    };
                  })
                );
              }}
            />
          )}

        </div>

        {/* INPUT */}

        <div className="
          bg-white/80
          backdrop-blur-md
          border-t
          border-gray-200
          px-10
          py-6
        ">

          <div className="max-w-5xl mx-auto">

            <ChatInput
              onSend={handleSend}
              loading={loading}
            />

          </div>

        </div>

      </div>

    </main>
  );
}