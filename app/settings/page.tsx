"use client";

import { Save, Bell, Lock, User, Palette, HardDrive } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Hồ sơ", icon: User },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "security", label: "Bảo mật", icon: Lock },
    { id: "appearance", label: "Giao diện", icon: Palette },
    { id: "storage", label: "Lưu trữ", icon: HardDrive },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 fixed h-full overflow-y-auto hidden md:flex flex-col" />

      <main className="flex-1 md:ml-64 p-8 transition-all">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cài đặt</h1>
          <p className="text-gray-600 text-sm mt-1">
            Quản lý cài đặt ứng dụng và tài khoản
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <nav className="flex flex-col">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 flex items-center gap-3 text-sm font-medium transition-colors border-l-2 ${
                        activeTab === tab.id
                          ? "bg-teal-50 text-teal-700 border-teal-600"
                          : "text-gray-700 border-transparent hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Thông tin hồ sơ
                  </h2>

                  <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      BS
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Bác sĩ Nha khoa
                      </h3>
                      <p className="text-sm text-gray-600">
                        doctor@dental.clinic
                      </p>
                    </div>
                    <button className="ml-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                      Đổi ảnh
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        defaultValue="Bác sĩ Nha khoa"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="doctor@dental.clinic"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phòng khám
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập tên phòng khám"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Cài đặt thông báo
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        label: "Thông báo ca làm việc mới",
                        desc: "Nhận thông báo khi có ca làm việc mới",
                      },
                      {
                        label: "Thông báo hoàn tất xử lý",
                        desc: "Thông báo khi AI xử lý xong một ca",
                      },
                      {
                        label: "Thông báo khác",
                        desc: "Thông báo về cập nhật hệ thống",
                      },
                    ].map((item, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-gray-900">Bảo mật</h2>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Mật khẩu
                      </p>
                      <p className="text-xs text-gray-600 mb-3">
                        Thay đổi mật khẩu của bạn
                      </p>
                      <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700">
                        Đổi mật khẩu
                      </button>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Xác thực hai yếu tố (2FA)
                      </p>
                      <p className="text-xs text-gray-600 mb-3">
                        Bật xác thực hai yếu tố để bảo vệ tài khoản
                      </p>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                        Kích hoạt
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-gray-900">Giao diện</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Chế độ hiển thị
                      </label>
                      <div className="flex gap-3">
                        {["Sáng", "Tối", "Tự động"].map((mode) => (
                          <button
                            key={mode}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-teal-600 hover:text-teal-600"
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Ngôn ngữ
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none">
                        <option>Tiếng Việt</option>
                        <option>English</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "storage" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-gray-900">Lưu trữ</h2>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Dung lượng sử dụng
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        2.5 GB / 100 GB
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal-600 h-2 rounded-full"
                        style={{ width: "2.5%" }}
                      />
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700">
                    Quản lý lưu trữ
                  </button>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <button className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-teal-700">
                  <Save size={18} /> Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
