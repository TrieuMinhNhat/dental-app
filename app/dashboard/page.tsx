"use client";

import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  // Mock data - will be replaced with real data later
  const stats = [
    {
      label: "Tổng ca làm việc",
      value: "24",
      icon: FileText,
      color: "text-blue-600",
    },
    { label: "Bệnh nhân", value: "18", icon: Users, color: "text-green-600" },
    {
      label: "Hoàn tất tuần này",
      value: "8",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    { label: "Đang xử lý", value: "3", icon: Clock, color: "text-orange-600" },
  ];

  const recentCases = [
    {
      id: 1,
      patient: "Nguyễn Văn A",
      date: "2025-12-13",
      status: "Hoàn tất",
      progress: 100,
    },
    {
      id: 2,
      patient: "Trần Thị B",
      date: "2025-12-12",
      status: "Xử lý",
      progress: 65,
    },
    {
      id: 3,
      patient: "Lê Văn C",
      date: "2025-12-11",
      status: "Hoàn tất",
      progress: 100,
    },
    {
      id: 4,
      patient: "Phạm Thị D",
      date: "2025-12-10",
      status: "Chờ xử lý",
      progress: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar - Import từ component */}
      <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 fixed h-full overflow-y-auto hidden md:flex flex-col" />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 transition-all">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tổng Quan</h1>
          <p className="text-gray-600 text-sm mt-1">
            Chào mừng trở lại, Bác sĩ!
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`w-12 h-12 ${stat.color} opacity-20`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Cases */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">
              Các ca làm việc gần đây
            </h2>
            <Link
              href="/cases"
              className="text-teal-600 text-sm font-medium hover:text-teal-700"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Bệnh nhân
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Ngày
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tiến độ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentCases.map((caseItem) => (
                  <tr
                    key={caseItem.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {caseItem.patient}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                      <Calendar size={16} />
                      {caseItem.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal-500 h-2 rounded-full"
                          style={{ width: `${caseItem.progress}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          caseItem.status === "Hoàn tất"
                            ? "bg-green-100 text-green-700"
                            : caseItem.status === "Xử lý"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/cases/${caseItem.id}`}
                        className="text-teal-600 text-sm font-medium hover:text-teal-700"
                      >
                        Xem
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
