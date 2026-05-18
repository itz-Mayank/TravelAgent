"use client";

import {
  Compass,
  Heart,
  MessageSquare,
  Pin,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";

import { ChatSession } from "../types/chat";

type Props = {
  sessions: ChatSession[];

  activeSessionId: string | null;

  setActiveSessionId: (id: string) => void;

  createNewChat: () => void;

  togglePin: (id: string) => void;

  toggleWishlist: (id: string) => void;

  deleteChat: (id: string) => void;
};

export default function Sidebar({
  sessions,
  activeSessionId,
  setActiveSessionId,
  createNewChat,
  togglePin,
  toggleWishlist,
  deleteChat,
}: Props) {

  const pinnedChats = sessions.filter(
    (s) => s.pinned
  );

  const wishlistChats = sessions.filter(
    (s) => s.wishlist
  );

  const recentChats = sessions.filter(
    (s) => !s.pinned && !s.wishlist
  );

  const renderChatCard = (
    session: ChatSession
  ) => (

    <div
      key={session.id}
      onClick={() =>
        setActiveSessionId(session.id)
      }
      className={`
        group
        border
        rounded-2xl
        p-4
        cursor-pointer
        transition-all

        ${
          activeSessionId === session.id
            ? "bg-purple-50 border-purple-200"
            : "bg-white border-gray-200 hover:bg-gray-50"
        }
      `}
    >

      <div className="flex justify-between items-start gap-3">

        <div className="flex-1 min-w-0">

          <p className="
            text-gray-800
            font-medium
            leading-6
            truncate
          ">

            {session.title}

          </p>

        </div>

        <div className="
          flex
          items-center
          gap-2
          opacity-0
          group-hover:opacity-100
          transition-all
        ">

          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePin(session.id);
            }}
            className="hover:scale-110 transition-all"
          >

            <Pin
              size={16}
              className={
                session.pinned
                  ? "text-purple-600 fill-purple-600"
                  : "text-gray-400"
              }
            />

          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(session.id);
            }}
            className="hover:scale-110 transition-all"
          >

            <Heart
              size={16}
              className={
                session.wishlist
                  ? "text-red-500 fill-red-500"
                  : "text-gray-400"
              }
            />

          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteChat(session.id);
            }}
            className="hover:scale-110 transition-all"
          >

            <Trash2
              size={16}
              className="text-gray-400 hover:text-red-500"
            />

          </button>

        </div>

      </div>

    </div>
  );

  return (

    <div className="
      w-[320px]
      bg-white
      border-r
      border-gray-200
      flex
      flex-col
      h-screen
    ">

      {/* HEADER */}

      <div className="p-6 border-b border-gray-100">

        <div className="flex items-center gap-3">

          <div className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-to-br
            from-purple-600
            to-pink-500
            flex
            items-center
            justify-center
            text-white
          ">

            <Sparkles size={22} />

          </div>

          <div>

            <h1 className="
              text-3xl
              font-bold
              text-purple-600
            ">
              Travel Agent
            </h1>

            <p className="text-gray-500 text-sm">
              AI Travel Workspace
            </p>

          </div>

        </div>

        <button
          onClick={createNewChat}
          className="
            mt-6
            w-full
            bg-purple-600
            hover:bg-purple-700
            transition-all
            text-white
            rounded-2xl
            py-4
            flex
            items-center
            justify-center
            gap-2
            font-medium
            shadow-sm
          "
        >

          <Plus size={20} />

          New Chat

        </button>

      </div>

      {/* SCROLL AREA */}

      <div className="
        flex-1
        overflow-y-auto
        px-5
        py-6
        space-y-8
      ">

        {/* QUICK NAVIGATION */}

        <div>

          <h2 className="
            text-xs
            font-bold
            tracking-wider
            text-gray-400
            uppercase
            mb-4
          ">
            Workspace
          </h2>

          <div className="space-y-2">

            <div className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              bg-purple-50
              text-purple-700
              font-medium
            ">

              <Compass size={18} />

              Travel Planning

            </div>

          </div>

        </div>

        {/* WISHLIST */}

        {wishlistChats.length > 0 && (

          <div>

            <h2 className="
              text-xs
              font-bold
              tracking-wider
              text-gray-400
              uppercase
              mb-4
            ">
              Wishlist
            </h2>

            <div className="space-y-3">

              {wishlistChats.map(renderChatCard)}

            </div>

          </div>
        )}

        {/* PINNED */}

        {pinnedChats.length > 0 && (

          <div>

            <h2 className="
              text-xs
              font-bold
              tracking-wider
              text-gray-400
              uppercase
              mb-4
            ">
              Pinned Chats
            </h2>

            <div className="space-y-3">

              {pinnedChats.map(renderChatCard)}

            </div>

          </div>
        )}

        {/* RECENT */}

        <div>

          <h2 className="
            text-xs
            font-bold
            tracking-wider
            text-gray-400
            uppercase
            mb-4
          ">
            Recent Chats
          </h2>

          <div className="space-y-3">

            {recentChats.length > 0 ? (

              recentChats.map(renderChatCard)

            ) : (

              <div className="
                border
                border-dashed
                border-gray-300
                rounded-2xl
                p-6
                text-center
              ">

                <MessageSquare
                  className="
                    mx-auto
                    text-gray-400
                    mb-3
                  "
                  size={24}
                />

                <p className="text-gray-500 text-sm">
                  No recent chats yet
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div className="
        p-5
        border-t
        border-gray-100
      ">

        <div className="
          bg-gradient-to-r
          from-purple-600
          to-pink-500
          rounded-2xl
          p-4
          text-white
        ">

          <p className="font-semibold">
            AI Travel Copilot
          </p>

          <p className="
            text-sm
            text-purple-100
            mt-1
          ">
            Human-controlled intelligent planning
          </p>

        </div>

      </div>

    </div>
  );
}