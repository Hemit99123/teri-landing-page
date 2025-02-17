"use client"

import React from "react";
import { useParams } from "next/navigation";

const PDFViewer = () => {
  const params = useParams()
  const { id } = params;

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <iframe
        src={`/reports/${id}/index.pdf`}
        className="w-full h-full border-none"
      ></iframe>
    </div>
  );
};

export default PDFViewer;
