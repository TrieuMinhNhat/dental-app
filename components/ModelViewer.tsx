// components/ModelViewer.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Grid } from "@react-three/drei";
import { useState } from "react";
import { Layers, Cuboid, Eye, Download } from "lucide-react";
import STLModel from "@/helper/STLModel";
import { Suspense } from "react";
interface ModelViewerProps {
  isProcessing: boolean;
  hasResult: boolean;
  STLurl: string;
}

export default function ModelViewer({
  isProcessing,
  hasResult,
  STLurl,
}: ModelViewerProps) {
  const [wireframe, setWireframe] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  return (
    <div className="w-full h-[600px] bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-700 relative group">
      {/* Loading Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-teal-400 font-bold animate-pulse tracking-wider">
            ĐANG XỬ LÝ AI...
          </div>
          <p className="text-slate-400 text-sm mt-2">
            Vui lòng đợi quá trình tái tạo hoàn tất
          </p>
        </div>
      )}

      {/* Toolbar - Công cụ điều khiển */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`p-2 rounded-lg backdrop-blur-md border transition-all ${
            wireframe
              ? "bg-teal-500/20 border-teal-500 text-teal-400"
              : "bg-black/30 border-white/10 text-white hover:bg-black/50"
          }`}
          title="Chế độ lưới (Wireframe)"
        >
          <Layers size={20} />
        </button>
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-2 rounded-lg backdrop-blur-md border transition-all ${
            showGrid
              ? "bg-teal-500/20 border-teal-500 text-teal-400"
              : "bg-black/30 border-white/10 text-white hover:bg-black/50"
          }`}
          title="Hiển thị lưới nền"
        >
          <Cuboid size={20} />
        </button>
        <button
          className="p-2 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-black/50"
          title="Đặt lại góc nhìn"
        >
          <Eye size={20} />
        </button>
      </div>

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [4, 4, 4], fov: 50 }}>
        <color attach="background" args={["#1a1a1a"]} />

        {/* Suspense dùng để chờ file load xong mới hiện, tránh lỗi crash */}
        <Suspense fallback={null}>
          {/* Stage tự động căn giữa, chỉnh ánh sáng và scale vật thể cho vừa khung hình */}
          <Stage environment="city" intensity={0.6} adjustCamera>
            {/* 2. Gọi file STL của bạn ở đây */}
            {/* Lưu ý: Đường dẫn bắt đầu từ gốc thư mục public, không cần chữ 'public' */}
            <STLModel url={STLurl} />
          </Stage>
        </Suspense>

        <Grid
          renderOrder={-1}
          position={[0, -0.5, 0]}
          infiniteGrid
          fadeDistance={50}
          sectionColor="#4f4f4f"
          cellColor="#333"
        />
        <OrbitControls autoRotate={false} />
      </Canvas>

      {/* Footer Controls */}
      {hasResult && (
        <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-center">
          <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs text-slate-300">
            Vertices: 12,405 | Faces: 24,810
          </div>
          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-lg font-medium transition-all transform active:scale-95">
            <Download size={18} />
            Xuất file .STL
          </button>
        </div>
      )}
    </div>
  );
}
