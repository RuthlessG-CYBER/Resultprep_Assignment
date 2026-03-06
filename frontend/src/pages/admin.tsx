import { useEffect, useState } from "react";
import DarkVeil from "../components/DarkVeil";
import axios from "axios";
import { API_URL } from "../constants/api";
import { useNavigate } from "react-router-dom";
import { Trash2, Users, Shield, LogOut } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: number;
  email: string;
  role: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((u) => u.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const admins = users.filter((u) => u.role === "admin").length;
  const normalUsers = users.length - admins;

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <DarkVeil
        hueShift={0}
        noiseIntensity={0}
        scanlineIntensity={0}
        speed={0.5}
        scanlineFrequency={0}
        warpAmount={0}
      />

      <div className="absolute inset-0 overflow-auto px-12 py-10">
        <div className="flex justify-between items-start mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            Admin Dashboard
          </h1>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 text-sm font-semibold px-4 py-2.5 rounded-2xl hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-300 transition-all duration-200"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-3 gap-5 mb-9">
          <div className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/40 rounded-3xl p-7 hover:-translate-y-1 hover:bg-white/[0.08] transition-all duration-300">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[11px] uppercase text-white/35 font-semibold mb-2">
                  Total Users
                </p>
                <p className="text-5xl font-extrabold text-white">
                  {users.length}
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
                <Users size={20} className="text-sky-400" />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/40 rounded-3xl p-7 hover:-translate-y-1 hover:bg-white/[0.08] transition-all duration-300">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[11px] uppercase text-white/35 font-semibold mb-2">
                  Admins
                </p>
                <p className="text-5xl font-extrabold text-white">
                  {admins}
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center">
                <Shield size={20} className="text-purple-400" />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/40 rounded-3xl p-7 hover:-translate-y-1 hover:bg-white/[0.08] transition-all duration-300">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[11px] uppercase text-white/35 font-semibold mb-2">
                  Users
                </p>
                <p className="text-5xl font-extrabold text-white">
                  {normalUsers}
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-green-400/10 border border-green-400/20 flex items-center justify-center">
                <Users size={20} className="text-green-400" />
              </div>
            </div>
          </div>
        </div>

        <p className="text-[11px] uppercase text-white/30 font-semibold mb-4 pl-1">
          Users
        </p>

        <div className="flex flex-col gap-3 pb-10">
          {users.length === 0 && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col items-center justify-center py-16">
              <p className="text-base font-semibold text-white/30">
                No users found
              </p>
            </div>
          )}

          {users.map((user) => (
            <div
              key={user.id}
              className="relative group flex items-start justify-between gap-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 hover:bg-white/[0.09] hover:translate-x-1 hover:border-white/[0.13] transition-all duration-200"
            >
              <div className="flex flex-col flex-1">
                <span className="text-base font-semibold text-white">
                  {user.email}
                </span>

                <span
                  className={`text-[10px] font-semibold tracking-wide px-2.5 py-0.5 mt-1 rounded-full border w-fit ${
                    user.role === "admin"
                      ? "text-purple-400 bg-purple-400/10 border-purple-400/20"
                      : "text-sky-400 bg-sky-400/10 border-sky-400/20"
                  }`}
                >
                  {user.role}
                </span>
              </div>

              <button
                onClick={() => deleteUser(user.id)}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-transparent hover:bg-red-500/10 hover:border-red-500/25 transition-all duration-200 flex-shrink-0"
              >
                <Trash2
                  size={15}
                  className="text-red-400/40 group-hover:text-red-400 transition-colors duration-200"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}