"use client";

import { Search, Plus, Grid, List, Download, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Cases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock data - will be replaced with real data later
  const cases = [
    {
      id: 1,
      name: "Ca 001 - Nguyễn A",
      patient: "Nguyễn Văn A",
      date: "2025-12-13",
      status: "Hoàn tất",
      model: "STL",
    },
    {
      id: 2,
      name: "Ca 002 - Trần B",
      patient: "Trần Thị B",
      date: "2025-12-12",
      status: "Xử lý",
      model: "STL",
    },
    {
      id: 3,
      name: "Ca 003 - Lê C",
      patient: "Lê Văn C",
      date: "2025-12-11",
      status: "Hoàn tất",
      model: "STL",
    },
    {
      id: 4,
      name: "Ca 004 - Phạm D",
      patient: "Phạm Thị D",
      date: "2025-12-10",
      status: "Chờ xử lý",
      model: "-",
    },
    {
      id: 5,
      name: "Ca 005 - Hoàng E",
      patient: "Hoàng Văn E",
      date: "2025-12-09",
      status: "Hoàn tất",
      model: "STL",
    },
    {
      id: 6,
      name: "Ca 006 - Vũ F",
      patient: "Vũ Thị F",
      date: "2025-12-08",
      status: "Hoàn tất",
      model: "STL",
    },
  ];

  const filteredCases = cases.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 fixed h-full overflow-y-auto hidden md:flex flex-col" />

      <main className="flex-1 md:ml-64 p-8 transition-all">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Các Ca Làm Việc
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Tổng cộng {cases.length} ca
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-1 bg-white border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-teal-100 text-teal-600"
                    : "text-gray-600"
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-teal-100 text-teal-600"
                    : "text-gray-600"
                }`}
              >
                <List size={18} />
              </button>
            </div>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg flex items-center gap-2 hover:bg-teal-700">
              <Plus size={18} /> Ca mới
            </button>
          </div>
        </header>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã ca hoặc tên bệnh nhân..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((caseItem) => (
              <Link key={caseItem.id} href={`/cases/${caseItem.id}`}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  {/* Preview Area */}
                  <div className="h-40 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                    <div className="text-white text-center">
                      <p className="text-sm font-medium opacity-75">
                        3D Model Preview
                      </p>
                      <p className="text-2xl font-bold">{caseItem.model}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900">{caseItem.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {caseItem.patient}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {caseItem.date}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          caseItem.status === "Hoàn tất"
                            ? "bg-green-100 text-green-700"
                            : caseItem.status === "Xử lý"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {caseItem.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Mã Ca
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Bệnh nhân
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Ngày tạo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Mô hình
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
                  {filteredCases.map((caseItem) => (
                    <tr
                      key={caseItem.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {caseItem.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {caseItem.patient}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {caseItem.date}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold">
                          {caseItem.model}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded text-xs font-semibold ${
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
                      <td className="px-6 py-4 flex gap-2">
                        <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                          <Download size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
