// app/page.tsx
"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import ModelViewer from "@/components/ModelViewer";
import Sidebar from "@/components/SideBar";
import {
  User,
  Calendar,
  FileText,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

export default function Home() {
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  // Form state
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");

  const handleUpload = (index: number, file: File) => {
    const objectUrl = URL.createObjectURL(file);
    const newImages = [...images];
    newImages[index] = objectUrl;
    setImages(newImages);
  };

  const handleRemove = (index: number) => {
    setImages((prev) => {
      const newImgs = [...prev];
      newImgs[index] = null;
      return newImgs;
    });
    setHasResult(false);
  };

  const handleGenerate = () => {
    if (images.some((img) => img === null)) {
      alert("Vui lòng upload đủ 4 góc nhìn!");
      return;
    }
    if (!patientName) {
      alert("Vui lòng nhập tên bệnh nhân!");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasResult(true);
    }, 3000);
  };

  const inputLabels = [
    "Mặt trước (Front)",
    "Mặt phải (Right)",
    "Mặt sau (Back)",
    "Mặt trái (Left)",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Content */}
      <main className="flex-1 md:ml-64 p-8 transition-all">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Tái tạo 3D Nha khoa
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <span>Trang chủ</span>
              <ChevronRight size={14} />
              <span>Xử lý hình ảnh</span>
              <ChevronRight size={14} />
              <span className="text-teal-600 font-medium">Ca làm việc mới</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50">
              Hủy bỏ
            </button>
            <button className="px-4 py-2 bg-teal-600 rounded-lg text-white text-sm font-medium hover:bg-teal-700 shadow-sm">
              Lưu hồ sơ
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Input & Info */}
          <div className="xl:col-span-4 space-y-6">
            {/* A. Patient Info Card */}
            <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <User size={16} className="text-teal-600" /> Thông tin bệnh nhân
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                      placeholder="Nhập tên bệnh nhân..."
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                    <User
                      size={14}
                      className="absolute left-3 top-2.5 text-gray-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Mã hồ sơ (ID)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                        placeholder="#PAT-001"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                      />
                      <FileText
                        size={14}
                        className="absolute left-3 top-2.5 text-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Ngày chụp
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm text-gray-600"
                      />
                      <Calendar
                        size={14}
                        className="absolute left-3 top-2.5 text-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* B. Image Upload Card */}
            <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex-1">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText size={16} className="text-teal-600" /> Dữ liệu đầu vào
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {images.map((img, idx) => (
                  <ImageUploader
                    key={idx}
                    id={idx}
                    image={img}
                    label={inputLabels[idx]}
                    onUpload={handleUpload}
                    onRemove={handleRemove}
                  />
                ))}
              </div>

              {/* Status Alert */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-3 items-start mb-6">
                <AlertCircle
                  size={18}
                  className="text-blue-600 shrink-0 mt-0.5"
                />
                <p className="text-xs text-blue-700 leading-relaxed">
                  Đảm bảo ảnh chụp rõ nét, đủ ánh sáng và phông nền tách biệt để
                  AI nhận diện khuôn răng chính xác nhất.
                </p>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isProcessing}
                className={`
                  w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-lg shadow-teal-500/30 transition-all flex items-center justify-center gap-2
                  ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 active:scale-95"
                  }
                `}
              >
                {isProcessing ? "Hệ thống đang xử lý..." : "Bắt đầu Tái tạo 3D"}
              </button>
            </section>
          </div>

          {/* RIGHT COLUMN: 3D Visualization */}
          <div className="xl:col-span-8">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-800 flex items-center gap-2">
                  Kết quả mô phỏng
                  {hasResult && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Hoàn tất
                    </span>
                  )}
                </h2>
                <div className="flex gap-2">
                  <span className="text-xs text-gray-400">
                    Render Engine: WebGL 2.0
                  </span>
                </div>
              </div>

              <div className="flex-1 p-1 bg-slate-50 rounded-b-xl">
                <ModelViewer
                  isProcessing={isProcessing}
                  hasResult={hasResult}
                  STLurl="/models/sample_output.STL"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
