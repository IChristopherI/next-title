import { Suspense } from "react";
import AnimeCatalogClient from "./AnimeCatalogClient";

export default function AnimeCatalog() {
 
  return (
    <Suspense fallback={<div className="text-center text-white">Загрузка...</div>}>
      <AnimeCatalogClient />
    </Suspense>
  );
}