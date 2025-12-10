// components/ImageUploader.tsx
"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

interface ImageUploaderProps {
  id: number;
  image: string | null;
  onUpload: (id: number, file: File) => void;
  onRemove: (id: number) => void;
  label: string;
}

export default function ImageUploader({
  id,
  image,
  onUpload,
  onRemove,
  label,
}: ImageUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(id, e.target.files[0]);
    }
  };

  return (
    <div className="relative group">
      <label
        className={`
        flex flex-col items-center justify-center w-full h-40 
        border-2 border-dashed rounded-lg cursor-pointer 
        transition-all duration-300
        ${
          image
            ? "border-indigo-500 bg-indigo-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }
      `}
      >
        {image ? (
          <div className="relative w-full h-full p-2">
            <Image
              src={image}
              alt={`View ${id}`}
              fill
              className="object-contain rounded-md"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-gray-500" />
            <p className="text-sm text-gray-500 font-medium">{label}</p>
            <p className="text-xs text-gray-400">PNG, JPG</p>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={!!image}
        />
      </label>

      {/* Nút xóa ảnh */}
      {image && (
        <button
          onClick={() => onRemove(id)}
          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
