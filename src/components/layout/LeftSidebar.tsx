/** Left sidebar for workshop/vehicle selection */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MessageSquareIcon,
  ActivityIcon,
  WrenchIcon,
  UsersIcon,
} from "../icons/AutomotiveIcons";

const navigation = [
  { name: "Chat", href: "/chat", icon: MessageSquareIcon },
  { name: "History", href: "/history", icon: ActivityIcon },
  { name: "Vehicles", href: "/vehicles", icon: WrenchIcon },
  { name: "Admin", href: "/admin", icon: UsersIcon },
];

export function LeftSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 glass-strong border-r border-industrial-800 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-industrial-800">
        <h2 className="text-sm font-semibold text-industrial-300 uppercase tracking-wider">
          Navigation
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-2 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${
                  isActive
                    ? "bg-primary-600/20 text-primary-400 border-l-4 border-primary-500"
                    : "text-industrial-400 hover:bg-industrial-800/50 hover:text-industrial-200"
                }
              `}
            >
              <Icon
                size={20}
                className={isActive ? "text-primary-400" : "text-industrial-500"}
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-industrial-800">
        <div className="text-xs text-industrial-500">
          <p>Workshop Tools</p>
        </div>
      </div>
    </aside>
  );
}

