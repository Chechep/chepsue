import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import {
  ArrowLeft,
  CheckCircle2,
  LockKeyhole,
  Mail,
  Loader2,
} from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/user-not-found":
          setError("No account was found with this email.");
          break;

        default:
          setError("Unable to send reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-black mx-auto flex items-center justify-center">
            <LockKeyhole size={28} className="text-white" />
          </div>

          <h1
            className="text-5xl font-semibold text-black mt-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Reset Password
          </h1>

          <p className="text-gray-500 mt-3 leading-6">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <div className="bg-white border border-black/10 rounded-[28px] p-7 md:p-9 shadow-sm">

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center py-5">

              <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} className="text-green" />
              </div>

              <h2 className="text-xl font-semibold text-black mt-5">
                Check your email
              </h2>

              <p className="text-gray-500 text-sm leading-6 mt-3">
                We've sent a password reset link to{" "}
                <span className="font-semibold text-black">
                  {email}
                </span>
                .
              </p>

              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 w-full mt-7 bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                <ArrowLeft size={17} />
                Back to Sign In
              </Link>

            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              <label className="block text-sm font-medium text-black mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-black/10 outline-none focus:border-black transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-5 bg-black text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-50 transition"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>

              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-black mt-6 transition"
              >
                <ArrowLeft size={16} />
                Back to Sign In
              </Link>

            </form>
          )}

        </div>
      </div>
    </main>
  );
}