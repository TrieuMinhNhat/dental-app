// components/Sidebar.tsx
"use client";

import {
  LayoutDashboard,
  Users,
  FileBox,
  Settings,
  Activity,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Tổng quan", active: false },
    { icon: Users, label: "Bệnh nhân", active: false },
    { icon: Activity, label: "Tái tạo 3D", active: true }, // Trang hiện tại
    { icon: FileBox, label: "Kho lưu trữ", active: false },
    { icon: Settings, label: "Cài đặt", active: false },
  ];

  return (
    <aside className="w-64 bg-white h-screen border-r border-gray-200 fixed left-0 top-0 hidden md:flex flex-col z-10">
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
          D
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">
          DentalAI
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
              ${
                item.active
                  ? "bg-teal-50 text-teal-700 border-l-4 border-teal-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div>
            <p className="text-sm font-semibold text-gray-700">
              Dr. Dinh Nguyen
            </p>
            <p className="text-xs text-gray-400">Nha sĩ trưởng 😎</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
