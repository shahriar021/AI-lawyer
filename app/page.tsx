"use client";
import { useState } from "react";
import Drawer from "@/components/Drawer";

export default function Home() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (f: File) => {
    setFile(f);
    const formData = new FormData();
    formData.append("file", f);
    const res = await fetch("/api/parse-doc", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.text) setInput(data.text);
  };

  const analyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult("");
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setResult(data.result || data.error);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Drawer onSelectPrompt={(prompt) => setInput(prompt)} />
      {/* Header */}
      <div className="bg-green-700 text-white py-6 px-4 text-center">
        <h1 className="text-3xl font-bold">⚖️ AI Lawyer BD</h1>
        <p className="mt-1 text-green-100">
          Upload your legal document or describe your situation — get instant legal help in Bangla & English
        </p>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Upload Box */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-3">📄 Upload a Legal Document (PDF)</h2>
          <div
            className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center cursor-pointer hover:bg-green-50 transition"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f) handleFileUpload(f);
            }}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            {file ? (
              <p className="text-green-700 font-medium">✅ {file.name}</p>
            ) : (
              <>
                <p className="text-gray-400 text-4xl mb-2">📂</p>
                <p className="text-gray-500">Drag & drop your PDF here or click to browse</p>
                <p className="text-gray-400 text-sm mt-1">Supports: rent agreements, job contracts, court notices etc.</p>
              </>
            )}
            <input
              id="fileInput"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileUpload(f);
              }}
            />
          </div>
        </div>

        {/* Text Input */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-3">✍️ Or Describe Your Situation</h2>
          <textarea
            className="w-full border rounded-lg p-3 text-gray-700 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="e.g. My landlord is refusing to return my advance money after I moved out. What can I do? Or paste your document text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Analyze Button */}
        <button
          onClick={analyze}
          disabled={loading || !input.trim()}
          className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition"
        >
          {loading ? "⏳ Analyzing your situation..." : "⚖️ Get Legal Help"}
        </button>

        {/* Result */}
        {result && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-3">📋 Legal Analysis</h2>
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{result}</div>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-gray-400 text-xs pb-6">
          ⚠️ This is AI-generated legal information, not professional legal advice. For serious matters, consult a licensed lawyer.
        </p>
      </div>
    </main>
  );
}
