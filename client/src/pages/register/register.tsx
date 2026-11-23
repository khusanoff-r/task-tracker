import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation } from "@/libs/react-query";
import { ROUTES } from "@/constants";

export const Register = () => {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    registerMutation.mutate(
      {
        name: name.trim(),
        email: email.trim(),
        password,
      },
      {
        onSuccess: () => {
          navigate(ROUTES.root);
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-sm"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
          <p className="text-sm text-gray-500">Sign up to get started</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
            required
            minLength={6}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
          />
        </div>

        {registerMutation.isError && (
          <p className="text-sm text-red-500">
            Registration failed. Check your details or try another email.
          </p>
        )}

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full rounded-lg bg-violet-600 py-3 font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
        >
          {registerMutation.isPending
            ? "Creating account..."
            : "Create account"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-violet-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};
