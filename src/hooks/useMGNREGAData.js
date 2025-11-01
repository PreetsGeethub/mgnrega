import { useState, useEffect } from "react";

export default function useMGNREGAData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api.data.gov.in/resource/0e3c08e0-9bdb-4b08-aad3-92823c1c2b27?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=10"); // Replace with real API URL
        if (!res.ok) throw new Error("API error");
        const result = await res.json();
        setData(result);
        localStorage.setItem("mgnregaCache", JSON.stringify(result));
      } catch {
        const cached = localStorage.getItem("mgnregaCache");
        if (cached) {
          setData(JSON.parse(cached));
          setError("⚠️ Showing saved data (API down)");
        } else {
          setError("❌ Could not load data");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
