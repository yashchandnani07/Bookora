import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Logo } from "@/components/brand/Logo";

import {
  ArrowRight,
  Check,
  Loader2,
} from "lucide-react";

import { register } from "@/lib/api/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your workspace · Bookora" },
      {
        name: "description",
        content:
          "Set up your Bookora workspace and accept your first realtime booking in minutes.",
      },
    ],
  }),
  component: SignUp,
});

function SignUp() {
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessType, setBusinessType] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    if (
      !businessName ||
      !ownerName ||
      !businessType ||
      !email ||
      !password
    ) {
      setError("Please fill all required fields.");
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const response = await register({
        fullName: ownerName,
        email,
        password,
        businessName,
        businessType,
      });

      localStorage.setItem("token", response.token);
      toast.success("Workspace created");

      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      console.error(err);
      setError("Failed to create workspace.");
      toast.error("Failed to create workspace");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <div className="flex flex-col px-6 py-8 lg:px-16">
        <div className="flex items-center justify-between">
          <Logo />

          <Link
            to="/signin"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Sign in
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Create workspace
          </div>

          <h1 className="mt-3 font-display text-4xl leading-tight">
            Let's set up your venue.
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            A few details and you're live. We'll handle the rest.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>
                  Business name
                </Label>

                <Input
                  placeholder="Northside Fitness"
                  className="bg-card"
                  value={businessName}
                  onChange={(e) =>
                    setBusinessName(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label>
                  Owner name
                </Label>

                <Input
                  placeholder="Jordan Park"
                  className="bg-card"
                  value={ownerName}
                  onChange={(e) =>
                    setOwnerName(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>
                Business type
              </Label>

              <Select
                value={businessType}
                onValueChange={
                  setBusinessType
                }
              >
                <SelectTrigger className="bg-card">
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>

                <SelectContent>
                  {[
                    "Gym",
                    "Salon",
                    "Cafe",
                    "Restaurant",
                    "Clinic",
                    "Coaching",
                    "Turf",
                    "Spa",
                    "Other",
                  ].map((c) => (
                    <SelectItem
                      key={c}
                      value={c}
                    >
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>
                Work email
              </Label>

              <Input
                type="email"
                placeholder="hello@yourbusiness.com"
                className="bg-card"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label>
                Create password
              </Label>

              <Input
                type="password"
                placeholder="At least 6 characters"
                className="bg-card"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
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
                  Creating workspace...
                </>
              ) : (
                <>
                  Create workspace
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By continuing you agree
              to our{" "}
              <a
                href="#"
                className="underline"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline"
              >
                Privacy
              </a>
              .
            </p>
          </form>
        </div>

        <div className="text-xs text-muted-foreground">
          © 2026 Bookora Labs
        </div>
      </div>

      <div className="relative hidden border-l border-border bg-card p-12 lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Why operators choose
            Bookora
          </div>

          <ul className="mt-6 space-y-5">
            {[
              [
                "Live in 4 minutes",
                "Profile, first offer, first booking — same coffee.",
              ],
              [
                "Realtime, by default",
                "No double-bookings. No stale availability.",
              ],
              [
                "Designed for venues",
                "Built with gyms, cafes, salons and clinics.",
              ],
              [
                "Operator-first analytics",
                "Peak hours, revenue, conversion — at a glance.",
              ],
            ].map(([t, d]) => (
              <li
                key={t}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-lime">
                  <Check className="h-3.5 w-3.5" />
                </span>

                <div>
                  <div className="font-medium">
                    {t}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {d}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-canvas p-5">
          <div className="text-xs text-muted-foreground">
            Live revenue · this
            week
          </div>

          <div className="mt-1 font-display text-3xl">
            ₹4.2L
          </div>

          <div className="mt-3 flex h-10 items-end gap-1">
            {[
              30, 42, 28, 55, 40,
              68, 72, 50, 80, 62,
              90, 74, 82, 95,
            ].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-foreground/80"
                style={{
                  height: `${h}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
