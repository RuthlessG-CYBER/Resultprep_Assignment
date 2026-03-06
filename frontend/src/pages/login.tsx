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

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      toast.success("Login successful");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      toast.error("Login failed");
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
              Login to your account
            </CardTitle>

            <CardDescription className="text-blue-200/70">
              Enter your email below to login
            </CardDescription>

            <CardAction>
              <Link to="/register">
                <Button
                  variant="link"
                  className="text-blue-300 hover:text-blue-200"
                >
                  Sign Up
                </Button>
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
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

                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-blue-200">
                    Password
                  </Label>

                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-blue-950/40 border-blue-400/20 text-white placeholder:text-blue-300/40 focus:border-blue-400 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-3">
            <Button
              type="button"
              onClick={login}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20"
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}