import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Lock } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/");
    } else {
      setError("Invalid credentials. Use demo / demo123");
    }
  };

  return (
    <Container className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm mx-auto animate-fade-in-up">
        <div className="bg-white rounded-2xl shadow-modal border border-border/60 p-8">
          <div className="flex flex-col items-center mb-8">
            <span className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center mb-4">
              <Lock size={24} />
            </span>
            <h1 className="text-2xl font-extrabold text-text-primary">Sign In</h1>
            <p className="text-sm text-text-secondary mt-1">Access your learning workspace</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700 font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <Button type="submit" className="w-full mt-2" size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-border/60 text-center">
            <p className="text-xs text-text-tertiary mb-1">Demo Credentials</p>
            <p className="text-sm font-bold text-text-secondary">demo / demo123</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
