import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import DarkVeil from "../components/DarkVeil";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../constants/api";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");

  const signup = async () => {
    try {
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      await axios.post(`${API_URL}/register`, {
        email,
        password,
        role,
      });

      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error("Signup failed");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen relative">
      <DarkVeil
        hueShift={0}
        noiseIntensity={0}
        scanlineIntensity={0}
        speed={0.5}
        scanlineFrequency={0}
        warpAmount={0}
      />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <Card className="w-full max-w-sm backdrop-blur-xl bg-blue-950/40 border border-blue-400/20 shadow-2xl shadow-blue-900/40">
          <CardHeader>
            <CardTitle className="text-white text-2xl">
              Create an account
            </CardTitle>

            <CardDescription className="text-blue-200/70">
              Enter your details to create your account
            </CardDescription>

            <CardAction>
              <Link to="/">
                <Button
                  variant="link"
                  className="text-blue-300 hover:text-blue-200"
                >
                  Log In
                </Button>
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6">

              <div className="space-y-2">
                <Label className="text-blue-200">Select Role</Label>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setRole("user")}
                    className={`border-blue-400/30 text-black hover:bg-blue-500/20 ${
                      role === "user" ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    User
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setRole("admin")}
                    className={`border-blue-400/30 text-black hover:bg-blue-500/20 ${
                      role === "admin" ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    Admin
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-200">
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-blue-950/40 border-blue-400/20 text-white placeholder:text-blue-300/40 focus:border-blue-400 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-200">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-blue-950/40 border-blue-400/20 text-white placeholder:text-blue-300/40 focus:border-blue-400 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-blue-200">
                  Confirm Password
                </Label>

                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-blue-950/40 border-blue-400/20 text-white placeholder:text-blue-300/40 focus:border-blue-400 focus:ring-blue-400"
                  required
                />
              </div>

            </div>
          </CardContent>

          <CardFooter className="flex-col gap-3">
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20"
              onClick={signup}
            >
              Register
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}