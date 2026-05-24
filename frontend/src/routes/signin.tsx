import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/brand/Logo";

import { ArrowRight, Github, Loader2 } from "lucide-react";

import { login } from "@/lib/api/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in · Bookora" },
      {
        name: "description",
        content: "Sign in to your Bookora operator workspace.",
      },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      localStorage.setItem("token", response.token);
      toast.success("Signed in");

      navigate({
        to: "/admin/dashboard",
      });
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 lg:px-16">
        <Logo />

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          <h1 className="font-display text-4xl tracking-tight">
            Welcome back.
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your operator console.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-card">
              <GoogleIcon />
              Google
            </Button>

            <Button variant="outline" className="bg-card">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or with email
            <span className="h-px flex-1 bg-border" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="hello@yourbusiness.com"
                className="bg-card"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>

                <button
                  type="button"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Forgot?
                </button>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-card"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Bookora?{" "}
            <Link to="/signup" className="font-medium text-foreground">
              Create workspace
            </Link>
          </p>
        </div>

        <div className="text-xs text-muted-foreground">
          © 2026 Bookora Labs
        </div>
      </div>

      <div className="relative hidden border-l border-border bg-card lg:block">
        <div className="absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />

        <div className="relative flex h-full flex-col justify-between p-12">
          <blockquote className="max-w-md font-display text-3xl leading-snug">
            "We went from spreadsheet chaos to a 79% slot fill-rate.
            Bookora is the operations layer I always wanted."
          </blockquote>

          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-canvas p-4 shadow-card">
              <div className="flex items-center justify-between text-xs">
                <div className="font-medium">
                  Peak Hour Training · 6:30 PM
                </div>

                <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] text-success">
                  79% booked
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-foreground"
                  style={{ width: "79%" }}
                />
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              — Meera N., Studio Linea
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.6 32.4 29.2 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 43.5c5.1 0 9.7-1.9 13.2-5.1l-6.1-5c-2 1.5-4.5 2.4-7.1 2.4-5.2 0-9.6-3.1-11.3-7.5l-6.6 5.1C9.6 39 16.2 43.5 24 43.5z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.4l6.1 5C40.9 35.7 43.5 30.3 43.5 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}
