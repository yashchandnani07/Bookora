export const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export async function api<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  if (!API_URL) {
    throw new Error("Missing VITE_API_URL. Set it to your Render backend URL plus /api.");
  }

  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API request failed");
  }

  return response.json();
}
