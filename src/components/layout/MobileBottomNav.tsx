/** Mobile bottom navigation bar */

import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const mobileNavItems = [
  {
    to: "/",
    label: "Dashboard",
    emoji: "🏠",
  },
  {
    to: "/chat",
    label: "Chat",
    emoji: "💬",
  },
  {
    to: "/history",
    label: "History",
    emoji: "📋",
  },
  {
    to: "/settings",
    label: "Profile",
    emoji: "👤",
  },
];

export function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNewChat = () => {
    // Navigate to chat page
    if (location.pathname === "/chat") {
      // If already on chat page, trigger new session
      // This will be handled by the chat page component
      window.dispatchEvent(new CustomEvent("new-chat-request"));
    } else {
      navigate("/chat");
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full touch-target transition-all duration-300 ${
                isActive
                  ? "text-primary-400 scale-110"
                  : "text-slate-400 hover:text-slate-300"
              }`
            }
          >
            <span className="text-2xl mb-1 drop-shadow-lg">{item.emoji}</span>
            <span className="text-xs font-semibold">{item.label}</span>
          </NavLink>
        ))}

        {/* Floating Action Button for New Chat - Vibrant Design */}
        <button
          onClick={handleNewChat}
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-primary-500 via-accent-400 to-primary-600 rounded-full shadow-2xl shadow-primary-500/50 flex items-center justify-center text-white text-3xl font-light hover:scale-110 active:scale-95 transition-all duration-300 z-10 ring-4 ring-slate-900/50"
          aria-label="New Chat"
        >
          <span className="leading-none drop-shadow-lg">+</span>
        </button>
      </div>
    </nav>
  );
}

