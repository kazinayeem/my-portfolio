"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const modules = {
    toolbar: [
      // Headings
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // Font & size
      [{ font: [] }, { size: [] }],
      // Formatting
      ["bold", "italic", "underline", "strike", { script: "sub" }, { script: "super" }],
      // Color & background
      [{ color: [] }, { background: [] }],
      // Block types
      ["blockquote", "code-block"],
      // Lists
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      // Indent
      [{ indent: "-1" }, { indent: "+1" }],
      // Align
      [{ align: [] }],
      // Links, media
      ["link", "image", "video"],
      // Tables (requires Quill table module)
      ["table"],
      // Remove formatting
      ["clean"],
    ],
    table: true, // enable table module if your build supports it
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "script",
    "color",
    "background",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "check",
    "indent",
    "align",
    "link",
    "image",
    "video",
    "table",
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      className="min-h-[250px] dark:bg-gray-800 dark:text-white rounded-md"
    />
  );
}
