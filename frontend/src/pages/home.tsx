import { useState, useEffect } from "react";
import DarkVeil from "../components/DarkVeil";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Trash2,
  Plus,
  CheckCircle,
  LogOut,
  Pencil,
  CheckCheck,
  XCircle,
} from "lucide-react";
import axios from "axios";
import { API_URL } from "../constants/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: "pending" | "completed";
  created_at: string;
}

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      if (!title || !description) {
        toast.error("Please fill in all fields");
        return;
      }

      await axios.post(
        `${API_URL}/tasks`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Task created successfully");
      setTitle("");
      setDescription("");
      setOpen(false);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const openEditDialog = (task: Task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditOpen(true);
  };

  const updateTask = async () => {
    try {
      if (!editId) return;

      await axios.put(
        `${API_URL}/tasks/${editId}`,
        {
          title: editTitle,
          description: editDescription,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Task updated successfully");
      setEditOpen(false);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const statusTask = async (task: Task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";

    try {
      await axios.put(
        `${API_URL}/tasks/${task.id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Task status updated");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter((t) => t.id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.length - completed;

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
            Task Dashboard
          </h1>

          <div className="flex items-center gap-3 pt-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 bg-white text-black text-sm font-bold px-5 py-2.5 rounded-2xl hover:bg-white/90 transition-all duration-200">
                  <Plus size={15} />
                  New Task
                </button>
              </DialogTrigger>

              <DialogContent className="bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-3xl text-white">
                <DialogHeader>
                  <DialogTitle>Create a task</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-3 mt-2">
                  <Input
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <Textarea
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <button
                    onClick={addTask}
                    className="bg-white text-black py-3 rounded-xl font-bold"
                  >
                    Create Task
                  </button>
                </div>
              </DialogContent>
            </Dialog>

            <button
              onClick={logout}
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 text-sm font-semibold px-4 py-2.5 rounded-2xl hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-300 transition-all duration-200"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 mb-9">
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-7 justify-between flex items-center">
            <div>
              <p className="text-white/40 text-sm">Total Tasks</p>
              <p className="text-4xl font-bold text-white">{tasks.length}</p>
            </div>
            <div>
              <CheckCircle size={24} className="text-green-500" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-7 justify-between flex items-center">
            <div>
              <p className="text-white/40 text-sm">Completed</p>
              <p className="text-4xl font-bold text-white">{completed}</p>
            </div>
            <div>
              <CheckCheck size={24} className="text-green-500" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-7 justify-between flex items-center">
            <div>
              <p className="text-white/40 text-sm">Pending</p>
              <p className="text-4xl font-bold text-white">{pending}</p>
            </div>
            <div>
              <XCircle size={24} className="text-red-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-semibold text-white uppercase">
              Tasks
            </h2>
            <p className="text-white/40 text-sm">{tasks.length} tasks</p>
          </div>
          {tasks.map((t) => (
            <div
              key={t.id}
              className="relative flex items-start justify-between gap-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 mt-3"
            >
              <div className="flex gap-4 flex-1">
                <button
                  onClick={() => statusTask(t)}
                  className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center ${
                    t.status === "completed"
                      ? "bg-green-500 border-transparent"
                      : "border-white/30"
                  }`}
                >
                  {t.status === "completed" && (
                    <svg width="11" height="9" viewBox="0 0 11 9">
                      <path
                        d="M1 4L4 7L10 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${
                        t.status === "completed"
                          ? "line-through text-white/30"
                          : "text-white"
                      }`}
                    >
                      {t.title}
                    </span>

                    <span className="text-xs text-white/40">{t.status}</span>
                  </div>

                  {t.description && (
                    <p className="text-white/40 text-sm mt-1">
                      {t.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => openEditDialog(t)}
                  className="p-2 rounded-lg hover:bg-blue-500/10"
                >
                  <Pencil size={16} className="text-blue-400" />
                </button>

                <button
                  onClick={() => deleteTask(t.id)}
                  className="p-2 rounded-lg hover:bg-red-500/10"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="bg-zinc-950 border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-3">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <button
                onClick={updateTask}
                className="bg-blue-500 py-3 rounded-xl font-bold"
              >
                Update Task
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
