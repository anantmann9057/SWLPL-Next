"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
export default function VersionPage() {
  const [version, setVersion] = useState("1.0.0"); // default or fetched
  const [newVersion, setNewVersion] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchAppVersion();
  }, []);
  const notify = (message) => toast(message);
  const handleUpdate = () => {
    if (!newVersion.trim()) {
      setStatus("Please enter a version");
      return;
    }

    // Here you could send to API route

    updateVersion(newVersion);
    setStatus("Version updated successfully 🎉");
    setNewVersion("");
  };

  const fetchAppVersion = () => {
    axios
      .get("/api/version")
      .then((response) => {
        setVersion(response.data.data[response.data.data.length - 1].version);
      })
      .catch((e) => {});
  };
  const updateVersion = (version) => {
    axios
      .post("/api/version", {
        version,
      })
      .then((response) => {
        notify("version update success");
        fetchAppVersion();
      })
      .catch((e) => {});
  };
  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-r from-sky-500 to-cyan-600 flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Change current App Version
          </h1>

          <div className="text-center mb-4">
            <p className="text-gray-600">Current Version:</p>
            <p className="text-2xl font-mono text-indigo-600">{version}</p>
          </div>

          <div className="mt-6 space-y-3">
            <label
              htmlFor="newVersion"
              className="block text-sm font-medium text-gray-700"
            >
              Change Version
            </label>
            <input
              id="newVersion"
              type="text"
              value={newVersion}
              onChange={(e) => setNewVersion(e.target.value)}
              placeholder="e.g. 1.0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={handleUpdate}
              className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition"
            >
              Update Version
            </button>
            {status && (
              <p className="text-center text-sm text-green-600 mt-2">
                {status}
              </p>
            )}
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
