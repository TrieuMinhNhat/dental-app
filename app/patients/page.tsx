"use client";

import { Search, Plus, Phone, Mail, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - will be replaced with real data later
  const patients = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      age: 35,
      phone: "0901234567",
      email: "nguyena@email.com",
      cases: 3,
      lastVisit: "2025-12-13",
    },
    {
      id: 2,
      name: "Trần Thị B",
      age: 28,
      phone: "0912345678",
      email: "tranb@email.com",
      cases: 1,
      lastVisit: "2025-12-12",
    },
    {
      id: 3,
      name: "Lê Văn C",
      age: 45,
      phone: "0923456789",
      email: "levanc@email.com",
      cases: 5,
      lastVisit: "2025-12-11",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      age: 32,
      phone: "0934567890",
      email: "phamd@email.com",
      cases: 2,
      lastVisit: "2025-12-10",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      age: 50,
      phone: "0945678901",
      email: "hoange@email.com",
      cases: 7,
      lastVisit: "2025-12-09",
    },
  ];

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 fixed h-full overflow-y-auto hidden md:flex flex-col" />

      <main className="flex-1 md:ml-64 p-8 transition-all">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý Bệnh nhân
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Tổng cộng {patients.length} bệnh nhân
            </p>
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg flex items-center gap-2 hover:bg-teal-700">
            <Plus size={18} /> Thêm bệnh nhân
          </button>
        </header>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, số điện thoại hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Họ và tên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tuổi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Liên hệ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Số ca
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Lần cuối
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider" />
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {patient.age}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Phone size={14} /> {patient.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={14} /> {patient.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {patient.cases}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {patient.lastVisit}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-gray-400 hover:text-gray-700">
                        <MoreHorizontal size={18} />
                      </button>
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
