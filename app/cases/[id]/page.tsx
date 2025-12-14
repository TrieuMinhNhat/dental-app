"use client";

import {
  ArrowLeft,
  Download,
  Share2,
  Trash2,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import STLModel from "@/helper/STLModel";
import { Suspense } from "react";

export default function CaseDetail({ params }: { params: { id: string } }) {
  // Mock data - will be replaced with real data later
  const caseData = {
    id: params.id,
    name: "Ca 001 - Nguyễn Văn A",
    patient: "Nguyễn Văn A",
    patientId: "PAT-001",
    date: "2025-12-13",
    status: "Hoàn tất",
    model: "/models/sample_output.STL",
    images: [
      { view: "Mặt trước", url: "/assets/front.jpg" },
      { view: "Mặt phải", url: "/assets/right.jpg" },
      { view: "Mặt sau", url: "/assets/back.jpg" },
      { view: "Mặt trái", url: "/assets/left.jpg" },
    ],
    info: {
      processingTime: "2 phút 30 giây",
      quality: "Cao",
      vertices: "12,405",
      faces: "24,810",
      notes: "Mô hình được xử lý thành công với độ chính xác cao",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 fixed h-full overflow-y-auto hidden md:flex flex-col" />

      <main className="flex-1 md:ml-64 p-8 transition-all">
        {/* Header */}
        <header className="mb-8">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium mb-4"
          >
            <ArrowLeft size={18} /> Quay lại
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {caseData.name}
              </h1>
              <p className="text-gray-600 text-sm mt-1 flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <User size={14} /> {caseData.patient}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {caseData.date}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                <Share2 size={18} /> Chia sẻ
              </button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg flex items-center gap-2 hover:bg-teal-700">
                <Download size={18} /> Tải xuất
              </button>
              <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 hover:bg-red-100">
                <Trash2 size={18} /> Xóa
              </button>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: 3D Model */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-[600px] bg-slate-900">
                <Canvas shadows camera={{ position: [4, 4, 4], fov: 50 }}>
                  <color attach="background" args={["#1a1a1a"]} />
                  <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6} adjustCamera>
                      <STLModel url={caseData.model} />
                    </Stage>
                  </Suspense>
                  <OrbitControls autoRotate={false} />
                </Canvas>
              </div>
            </div>

            {/* Input Images */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Hình ảnh đầu vào
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {caseData.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-500 text-sm font-medium">
                        {img.view}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Info Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Trạng thái
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-lg font-bold text-green-700">
                  {caseData.status}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                {caseData.info.notes}
              </p>
            </div>

            {/* Patient Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Thông tin bệnh nhân
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Tên bệnh nhân
                  </label>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {caseData.patient}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Mã hồ sơ
                  </label>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {caseData.patientId}
                  </p>
                </div>
              </div>
            </div>

            {/* Processing Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Chi tiết xử lý
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-gray-600">
                    Thời gian xử lý
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {caseData.info.processingTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-gray-600">
                    Chất lượng
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    {caseData.info.quality}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-gray-600">
                    Vertices
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {caseData.info.vertices}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-gray-600">
                    Faces
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {caseData.info.faces}
                  </span>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-teal-50 rounded-xl border border-teal-200 p-6">
              <h3 className="text-sm font-bold text-teal-900 uppercase tracking-wider mb-4">
                Xuất mô hình
              </h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-white border border-teal-200 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-50">
                  STL File
                </button>
                <button className="w-full px-4 py-2 bg-white border border-teal-200 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-50">
                  OBJ File
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
