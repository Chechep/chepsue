import { useState } from "react";
import {
  Camera,
  LogOut,
  Mail,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const {
    user,
    logout,
    updateUserProfile,
    isAdmin,
  } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");

  if (!user) {
    return (
      <main className="min-h-screen bg-white pt-32 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Sign in to view your profile
          </h1>

          <Link
            to="/login"
            className="inline-flex mt-6 bg-black text-white px-6 py-3 rounded-xl"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  const getInitials = () => {
    const value = user.displayName || user.email || "U";

    return value
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile(name, photoURL);
      setMessage("Profile updated successfully.");

      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Unable to update your profile.");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-green">
            My Account
          </span>

          <h1
            className="text-5xl font-semibold text-black mt-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Profile
          </h1>
        </div>

        <div className="grid md:grid-cols-[280px_1fr] gap-6 mt-12">

          {/* PROFILE CARD */}
          <div className="bg-white text-black border-gray-500 rounded-[28px] p-7 text-center">

            <div className="w-28 h-28 rounded-full overflow-hidden mx-auto flex items-center justify-center border border-gray-400">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-semibold">
                  {getInitials()}
                </span>
              )}
            </div>

            <h2 className="text-xl font-semibold mt-5">
              {user.displayName || "User"}
            </h2>

            <p className="text-white/60 text-sm mt-1 break-all">
              {user.email}
            </p>

            {isAdmin() && (
              <div className="inline-flex items-center gap-2 mt-5 px-3 py-1.5 rounded-full bg-green/10 text-green text-xs font-semibold">
                <ShieldCheck size={14} />
                Administrator
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full mt-7 flex items-center justify-center gap-2 border border-white/10 py-3 rounded-xl text-red-500 hover:bg-gray-300 transition"
            >
              <LogOut size={17} />
              Sign Out
            </button>
          </div>

          {/* DETAILS */}
          <div className="bg-white border border-black/10 rounded-[28px] p-7 md:p-8">

            <h2
              className="text-3xl font-semibold text-black"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Account Details
            </h2>

            {message && (
              <div className="mt-5 bg-green/10 text-green border border-green/10 rounded-xl px-4 py-3 text-sm">
                {message}
              </div>
            )}

            <form
              onSubmit={saveProfile}
              className="mt-7 space-y-5"
            >
              <div>
                <label className="text-sm font-semibold">
                  Display Name
                </label>

                <div className="relative mt-2">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-black/10 outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Email
                </label>

                <div className="relative mt-2">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    value={user.email || ""}
                    disabled
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-black/10 bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Profile Image URL
                </label>

                <div className="relative mt-2">
                  <Camera
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    value={photoURL}
                    onChange={(e) =>
                      setPhotoURL(e.target.value)
                    }
                    placeholder="https://..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-black/10 outline-none focus:border-black"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-black text-white px-6 py-3.5 rounded-xl flex items-center gap-2 font-semibold hover:bg-green transition"
              >
                <Save size={17} />
                Save Changes
              </button>
            </form>

            {isAdmin() && (
              <Link
                to="/admin"
                className="mt-8 flex items-center justify-center gap-2 w-full bg-black/5 border border-black/10 py-4 rounded-xl font-semibold hover:bg-black hover:text-white transition"
              >
                <ShieldCheck size={18} />
                Open Admin Dashboard
              </Link>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}