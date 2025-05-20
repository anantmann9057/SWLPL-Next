"use client";
import { useState } from "react";

export default function UrlPage() {
  const urlOptions = {
    live: "https://myapp.com",
    test: "https://test.myapp.com",
  };

  const [currentUrl, setCurrentUrl] = useState(urlOptions.live);
  const [selectedEnv, setSelectedEnv] = useState("live");
  const [status, setStatus] = useState("");

  const handleUpdate = () => {
    setCurrentUrl(urlOptions[selectedEnv]);
    setStatus(`URL updated to ${selectedEnv.toUpperCase()} ✅`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          App Environment URL
        </h1>

        <div className="text-center mb-4">
          <p className="text-gray-600">Current URL:</p>
          <p className="text-lg font-mono text-cyan-600">{currentUrl}</p>
        </div>

        <div className="mt-6 space-y-4">
          <label
            htmlFor="env"
            className="block text-sm font-medium text-gray-700"
          >
            Select Environment
          </label>
          <select
            id="env"
            value={selectedEnv}
            onChange={(e) => setSelectedEnv(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="live">Live</option>
            <option value="test">Test</option>
          </select>

          <button
            onClick={handleUpdate}
            className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            Update URL
          </button>

          {status && (
            <p className="text-center text-sm text-green-600 mt-2">{status}</p>
          )}
        </div>
      </div>
    </div>
  );
}
