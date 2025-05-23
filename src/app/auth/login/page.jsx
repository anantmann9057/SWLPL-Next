"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const notify = (message) => toast(message);
  const router = useRouter();
  const login = (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    axios
      .post("/api/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status == 200) {
          notify("login success");
          router.push("/");
        }
      })
      .catch((error) => {
        notify("login failed");

        router.push("/auth/signup");
      });
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md m-5">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign in to your account
        </h2>

        <form className="space-y-5" onSubmit={login}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
      <Toaster />
    </div>
  );
}
