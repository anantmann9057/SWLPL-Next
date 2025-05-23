"use client";
import Navbar from "./components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { MoonLoader } from "react-spinners";
const MapPreview = dynamic(() => import("./components/MapPreview"), {
  ssr: false,
});
export default function Home() {
  const [monitoringData, setMonitoringData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://node-backend-oyy4.onrender.com/api/v1/users/login-data")
      .then((response) => {
        setMonitoringData(response.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching monitoring data:", err);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  const openCoordinatesInGoogleMaps = (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 items-center">
      <Navbar />
      <main className="p-6 sm:p-10">
        {loading && (
          <div className="flex justify-center items-center h-[calc(100vh-80px)]">
            <MoonLoader
              color={"red"}
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {error && <div className="text-center text-red-500">{error}</div>}

        {!loading && !error && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-[80px]">
            {monitoringData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-2xl cursor-pointer"
                onClick={() => setSelectedUser(item)}
              >
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {item.name}
                  </h2>
                  <span className="inline-block mt-2 px-3 py-1 text-sm font-medium bg-cyan-900 text-cyan-800 rounded-full">
                    {item.login_type}
                  </span>
                </div>
                <div className="text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Name:</span> {item.fullName}
                  </p>
                  <p>
                    <span className="font-semibold">Emp Id:</span> {item.empId}
                  </p>
                  <p>
                    <span className="font-semibold">Device Id:</span>{" "}
                    {item.deviceId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-start overflow-y-auto pt-10 pb-10 px-4">
          <div className="bg-white  p-6 rounded-xl shadow-lg relative w-[80%]">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedUser.name}</h2>

            <div className="text-gray-700 space-y-2 text-sm">
              <p>
                <span className="font-semibold">Full Name:</span>{" "}
                {selectedUser.fullName}
              </p>
              <p>
                <span className="font-semibold">Emp Id:</span>{" "}
                {selectedUser.empId}
              </p>
              <p>
                <span className="font-semibold">Device Id:</span>{" "}
                {selectedUser.deviceId}
              </p>
              <p>
                <span className="font-semibold">Last Location:</span>{" "}
                {selectedUser.location.coordinates[0]},{" "}
                {selectedUser.location.coordinates[1]}
              </p>
            </div>

            <div className="mt-4">
              <button
                onClick={() =>
                  openCoordinatesInGoogleMaps(
                    selectedUser.location.coordinates[1],
                    selectedUser.location.coordinates[0]
                  )
                }
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold"
              >
                View on Map
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 mt-4">
                📱 Accounts Accessed
              </h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {selectedUser.usedBy?.length > 0 ? (
                  selectedUser.usedBy.map((entry, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 bg-gray-50 shadow-sm"
                    >
                      <p className="font-semibold">{entry.fullName}</p>
                      <p className="text-sm text-gray-600">
                        Phone: {entry.phone}
                      </p>
                      <p className="text-sm text-gray-600">
                        App Type: {entry.appType}
                      </p>
                      <p className="text-sm text-gray-600">
                        Accessed: {new Date(entry.createdAt).toLocaleString()}
                      </p>
                      <button
                        onClick={() =>
                          openCoordinatesInGoogleMaps(
                            entry.location.coordinates[1],
                            entry.location.coordinates[0]
                          )
                        }
                        className="mt-1 inline-block text-cyan-600 text-sm hover:underline font-bold"
                      >
                        View Location on Map
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No access records found.
                  </p>
                )}
              </div>
            </div>
            <div className="mt-[20px]">
              <MapPreview
                lat={selectedUser.location.coordinates[1]}
                lng={selectedUser.location.coordinates[0]}
                history={selectedUser.usedBy}
              />
            </div>
          </div>
          {/* Used By Section */}
        </div>
      )}
    </div>
  );
}
