"use client";
import { useState } from "react";

const legalCategories = [
  { icon: "🏠", label: "Rent & Housing", prompt: "I have an issue with my landlord regarding my rental agreement in Bangladesh." },
  { icon: "💼", label: "Job & Labor", prompt: "I have a problem with my employer regarding my job rights in Bangladesh." },
  { icon: "👨‍👩‍👧", label: "Family & Divorce", prompt: "I need help understanding my rights regarding family law in Bangladesh." },
  { icon: "🤝", label: "Business Contract", prompt: "I need help understanding a business contract or agreement in Bangladesh." },
  { icon: "🌾", label: "Land Dispute", prompt: "I have a land ownership or boundary dispute in Bangladesh." },
  { icon: "💰", label: "Loan & Money", prompt: "Someone owes me money or I am being pressured to repay a loan in Bangladesh." },
];

type DrawerProps = {
  onSelectPrompt: (prompt: string) => void;
};

export default function Drawer({ onSelectPrompt }: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 bg-white text-green-700 border border-green-300 p-2 rounded-lg shadow-md hover:bg-green-50 transition"
      >
        ☰
      </button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setIsOpen(false)} />}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="bg-green-700 text-white p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">⚖️ AI Lawyer BD</h2>
          <button onClick={() => setIsOpen(false)} className="text-white text-xl hover:text-green-200">
            ✕
          </button>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          {/* How to use */}
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-700 mb-2">📖 How to Use</h3>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>1. Upload a legal PDF document</li>
              <li>2. Or describe your situation in text</li>
              <li>3. Click "Get Legal Help"</li>
              <li>4. Get instant analysis in Bangla & English</li>
            </ul>
          </div>

          {/* Legal Categories */}
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-700 mb-3">⚡ Quick Legal Topics</h3>
            <div className="space-y-2">
              {legalCategories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => {
                    onSelectPrompt(cat.prompt);
                    setIsOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-50 border border-gray-100 transition"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-sm text-gray-700 font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-700 mb-2">💡 Tips</h3>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>✅ Be as specific as possible</li>
              <li>✅ Include dates and amounts</li>
              <li>✅ Mention your location in BD</li>
              <li>✅ Upload contracts as PDF for best results</li>
            </ul>
          </div>

          {/* About */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-700 mb-2">ℹ️ About</h3>
            <p className="text-sm text-gray-500">
              AI Lawyer BD helps common people understand their legal rights in Bangladesh. Powered by AI — available 24/7, completely free.
            </p>
            <p className="text-xs text-red-400 mt-3">
              ⚠️ This is not professional legal advice. For serious matters consult a licensed lawyer.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
