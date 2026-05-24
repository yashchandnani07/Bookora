import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { AdminTopbar } from "@/components/layout/AdminTopbar";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Upload } from "lucide-react";

import { getMyBusiness, updateBusiness } from "@/lib/api/business";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/profile")({
  head: () => ({
    meta: [
      {
        title: "Business profile · Bookora",
      },
      {
        name: "description",
        content: "Manage business profile.",
      },
    ],
  }),

  component: Profile,
});

function Profile() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [businessId, setBusinessId] = useState<string | null>(null);

  const [business, setBusiness] = useState({
    name: "",
    businessType: "",
    ownerName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    async function loadBusiness() {
      try {
        const data = await getMyBusiness();

        setBusinessId(data?.id ?? null);

        setBusiness({
          name: data?.name || "",
          businessType: data?.businessType || "",
          ownerName: data?.ownerName || "",
          phone: data?.phone || "",
          email: data?.email || "",
          city: data?.city || "",
          address: data?.address || "",
          description: data?.description || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadBusiness();
  }, []);

  async function handleSave() {
    if (!businessId) return;

    setSaving(true);
    setSaveError(null);

    try {
      await updateBusiness(businessId, business);
      await queryClient.invalidateQueries({ queryKey: ["business", "me"] });
      toast.success("Business profile saved");
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "Failed to save changes"
      );
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-sm text-muted-foreground">
        Loading business profile...
      </div>
    );
  }

  return (
    <>
      <AdminTopbar
        title="Business profile"
        subtitle="How your venue shows up in the marketplace"
        action={
          <Button
            className="rounded-full"
            onClick={handleSave}
            disabled={saving || !businessId}
          >
            {saving ? "Saving..." : "Save changes"}
          </Button>
        }
      />

      {saveError && (
        <div className="mx-6 mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive lg:mx-10">
          {saveError}
        </div>
      )}

      <div className="p-6 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Logo
              </div>

              <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-border bg-canvas p-6">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-foreground font-display text-3xl text-background">
                  {business.name?.[0] ||
                    "B"}
                </div>

                <div className="mt-3 text-sm font-medium">
                  {business.name ||
                    "Business"}
                </div>

                <button className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                  <Upload className="h-3 w-3" />
                  Replace
                </button>
              </div>

              <div className="mt-3 text-[11px] text-muted-foreground">
                PNG / SVG · up to 2MB ·
                square.
              </div>
            </div>
          </div>

          <form className="space-y-8">
            <Section
              title="Business"
              desc="Public info shown to customers."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <F label="Business name">
                  <Input
                    value={
                      business.name
                    }
                    className="bg-card"
                    onChange={(e) =>
                      setBusiness({
                        ...business,
                        name:
                          e.target.value,
                      })
                    }
                  />
                </F>

                <F label="Business type">
                  <Input
                    value={business.businessType}
                    className="bg-card"
                    onChange={(e) =>
                      setBusiness({
                        ...business,
                        businessType: e.target.value,
                      })
                    }
                  />
                </F>

                <F label="Owner name">
                  <Input
                    value={
                      business.ownerName
                    }
                    className="bg-card"
                    onChange={(e) =>
                      setBusiness({
                        ...business,
                        ownerName:
                          e.target.value,
                      })
                    }
                  />
                </F>

                <F label="Phone">
                  <Input
                    value={
                      business.phone
                    }
                    className="bg-card"
                    onChange={(e) =>
                      setBusiness({
                        ...business,
                        phone:
                          e.target.value,
                      })
                    }
                  />
                </F>

                <F label="Email">
                  <Input
                    value={
                      business.email
                    }
                    className="bg-card"
                    onChange={(e) =>
                      setBusiness({
                        ...business,
                        email:
                          e.target.value,
                      })
                    }
                  />
                </F>

                <F label="City">
                  <Input
                    value={
                      business.city
                    }
                    className="bg-card"
                    onChange={(e) =>
                      setBusiness({
                        ...business,
                        city:
                          e.target.value,
                      })
                    }
                  />
                </F>
              </div>

              <F label="Address">
                <Textarea
                  rows={2}
                  value={
                    business.address
                  }
                  className="bg-card"
                  onChange={(e) =>
                    setBusiness({
                      ...business,
                      address:
                        e.target.value,
                    })
                  }
                />
              </F>
            </Section>

            <Section
              title="Hours"
              desc="Default opening hours"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <F label="Opening time">
                  <Input
                    type="time"
                    defaultValue="06:00"
                    className="bg-card"
                  />
                </F>

                <F label="Closing time">
                  <Input
                    type="time"
                    defaultValue="22:00"
                    className="bg-card"
                  />
                </F>
              </div>
            </Section>

            <Section
              title="About"
              desc="Business description"
            >
              <Textarea
                rows={4}
                className="bg-card"
                value={
                  business.description
                }
                onChange={(e) =>
                  setBusiness({
                    ...business,
                    description:
                      e.target.value,
                  })
                }
              />
            </Section>
          </form>
        </div>
      </div>
    </>
  );
}

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 border-b border-border pb-8 md:grid-cols-[220px_1fr]">
      <div>
        <h2 className="font-display text-xl">
          {title}
        </h2>

        <p className="mt-1 text-xs text-muted-foreground">
          {desc}
        </p>
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function F({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
