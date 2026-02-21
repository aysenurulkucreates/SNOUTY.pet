import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/UseAuth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:8800/api/user/login",
        formData,
      );
      const userData = res.data.user || res.data.others || res.data;
      login(res.data.token, userData);
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed login");
      } else {
        setError("An unexpected error occured.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md p-10 border border-zinc-100 shadow-sm rounded-sm">
        <h2 className="text-3xl font-serif text-center mb-8">
          Member
          <span className="font-bold border-b-4 border-orange-400"> Login</span>
        </h2>

        {error && (
          <p className="text-red-500 text-[10px] font-mono mb-4 text-center uppercase tracking-widest">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-mono uppercase text-zinc-400">
              Email
            </label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              autoComplete="email"
              className="border-b border-zinc-200 py-2 focus:outline-none focus:border-black font-mono text-sm"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-mono uppercase text-zinc-400">
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              autoComplete="current-password"
              className="border-b border-zinc-200 py-2 focus:outline-none focus:border-black font-mono text-sm"
              required
            />
          </div>
          <button
            disabled={loading}
            className="mt-4 py-4 bg-black text-white font-mono font-bold uppercase tracking-widest text-[11px] hover:opacity-90 disabled:bg-zinc-300 transition-all active:scale-95"
          >
            {loading ? "System Loading..." : "Enter Squad"}
          </button>
        </form>
        <p className="mt-8 text-center text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
          Not a member yet?{" "}
          <Link to="/register" className="font-bold text-black underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
