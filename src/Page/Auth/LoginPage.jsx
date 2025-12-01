import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Config/Supabase";
import Logo from "../../assets/umbrella-corporation-preview.png";

export default function LoginPage() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      return alert(error.message);
    }

    nav("/");
  };

  return (
     <div className="min-h-screen w-full bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="rounded-2xl p-8 md:p-10 
                        bg-zinc-900/60 backdrop-blur-xl
                        border border-zinc-800
                        shadow-xl">

      {/* Tambahkan logo di sini */}
      <div className="flex justify-center mb-6">
        <img 
          src={Logo} 
          alt="umbrella-corporation-preview.png"
          className="w-50 h-50 object-contain"
        />
      </div>

          {/* Header */}
          <h2 className="text-center text-white text-3xl font-semibold">
            Nusantara Division
          </h2>
          <p className="text-center text-white mt-2">
            Sign in to your account
          </p>

          {/* Form */}
          <form className="mt-6 space-y-5" onSubmit={handleLogin}>

            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full mt-2 px-4 py-3 rounded-lg 
                           bg-zinc-800 text-gray-100
                           border border-zinc-700
                           placeholder-gray-500 
                           focus:outline-none 
                           focus:ring-2 focus:ring-blue-500
                           transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 text-sm font-medium">
                Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full pr-12 px-4 py-3 rounded-lg 
                             bg-zinc-800 text-gray-100        
                             border border-zinc-700            
                             placeholder-gray-500 
                             focus:outline-none 
                             focus:ring-2 focus:ring-blue-500  
                             transition"
                  required
                />

                {/* Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2
                              bg-gray-500 rounded-lg hover:bg-white transition"
                >
              {showPass ? (
        /* 👁️ Mata Terbuka */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-red-400"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
        /* 👁️ Mata Tertutup */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-red-400"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-5.52 0-10-4.48-10-10 0-2.05.62-3.95 1.69-5.54" />
                  <path d="M1 1l22 22" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
                </button>
              </div>
            </div>

            {/* Remember Me (tetap) */}
            <label className="flex items-center text-gray-300 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2 w-4 h-4"
              />
              Remember me
            </label>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-medium text-black
                         bg-gray-300 hover:bg-blue-700 hover:text-white
                         transition shadow-md disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
