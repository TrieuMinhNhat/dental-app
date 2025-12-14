"use client";

import { Search, Download, Trash2, Archive as ArchiveIcon } from "lucide-react";
import { useState } from "react";

export default function Archive() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - will be replaced with real data later
  const archivedCases = [
    {
      id: 1,
      name: "Ca 010 - Bệnh nhân cũ",
      patient: "Nguyễn Văn X",
      date: "2025-11-15",
      archived: "2025-12-01",
      size: "45 MB",
    },
    {
      id: 2,
      name: "Ca 009 - Bệnh nhân Y",
      patient: "Trần Thị Y",
      date: "2025-11-10",
      archived: "2025-11-25",
      size: "38 MB",
    },
    {
      id: 3,
      name: "Ca 008 - Bệnh nhân Z",
      patient: "Lê Văn Z",
      date: "2025-11-05",
      archived: "2025-11-20",
      size: "52 MB",
    },
    {
      id: 4,
      name: "Ca 007 - Bệnh nhân A2",
      patient: "Phạm Thị A2",
      date: "2025-10-30",
      archived: "2025-11-15",
      size: "41 MB",
    },
  ];

  const filteredCases = archivedCases.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 fixed h-full overflow-y-auto hidden md:flex flex-col" />

      <main className="flex-1 md:ml-64 p-8 transition-all">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Kho Lưu Trữ</h1>
          <p className="text-gray-600 text-sm mt-1">
            Các ca làm việc đã hoàn thành ({archivedCases.length} ca)
          </p>
        </header>

        {/* Info Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
          <ArchiveIcon className="text-blue-600 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm font-medium text-blue-900">
              Lưu trữ các ca hoàn tất
            </p>
            <p className="text-xs text-blue-700 mt-1">
              Các ca được lưu trữ vẫn có thể truy cập và tải xuất. Dữ liệu được
              bảo vệ an toàn trên hệ thống.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm trong kho lưu trữ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        {/* Archive Table */}
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
                    Lưu trữ lúc
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Dung lượng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.length > 0 ? (
                  filteredCases.map((caseItem) => (
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
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {caseItem.archived}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                          {caseItem.size}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                          title="Tải xuất"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                          title="Xóa vĩnh viễn"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-gray-600"
                    >
                      Không tìm thấy kết quả
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
