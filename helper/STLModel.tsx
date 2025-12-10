import { STLLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";

export default function STLModel({ url }: { url: string }) {
  // Hook useLoader sẽ tự động tải và parse file STL
  const geometry = useLoader(STLLoader, url);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      {/* STL chỉ có hình dáng, không có màu nên ta phải tự tô màu (Material) */}
      <meshStandardMaterial
        color="#b0b0b0" // Màu xám kim loại
        roughness={0.5}
        metalness={0.8}
      />
    </mesh>
  );
}
