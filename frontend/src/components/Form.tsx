import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ALEC_LOGO, SMART_LOGO, ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants"
import React, { useState } from "react";
import api from "@/api";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "@/components/LoadingIndicator";

interface FormProps {
  route: string;
  method: "login" | "register";
}

export default function Form({ route, method }: FormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username: email, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/")
      } else {
        navigate("/login")
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={ALEC_LOGO} alt="Logo 1" className="h-12 mr-4" />
          <img src={SMART_LOGO} alt="Logo 2" className="h-12" />
        </div>
        <h1 className="text-2xl font-bold text-center">{name}</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4"
          />
          {loading && <LoadingIndicator />}
          <Button type="submit" className="w-full bg-blue-500" disabled={loading}>
            {name}
          </Button>
        </form>
        <p className="text-sm text-center">
          {method === "login" ? (
            <>Don't have an account? <a href="/register" className="text-blue-500">Register</a></>
          ) : (
            <>Already have an account? <a href="/login" className="text-blue-500">Login</a></>
          )}
        </p>
      </div>
    </div>
  );
}
