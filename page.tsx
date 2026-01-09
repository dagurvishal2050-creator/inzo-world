"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fbborhcjkuxomwqkfubw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiYm9yaGNqa3V4b213cWtmdWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5ODM3ODksImV4cCI6MjA4MzU1OTc4OX0.bmgBdWdNcvoJhuSXWa4XOV6NXNwnxZqn6Ir1TracmS4"
);

export default function HomePage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [timers, setTimers] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setVideos(data);
        const initialTimers: any = {};
        data.forEach((v) => (initialTimers[v.id] = 5));
        setTimers(initialTimers);
      }
    }
    load();
  }, []);

  function startTimer(id: string) {
    if (timers[id] === 0) return;

    const interval = setInterval(() => {
      setTimers((prev) => {
        if (prev[id] <= 1) {
          clearInterval(interval);
          return { ...prev, [id]: 0 };
        }
        return { ...prev, [id]: prev[id] - 1 };
      });
    }, 1000);
  }

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "auto" }}>
      <h1 style={{ marginBottom: 30 }}>Inzo World</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {videos.map((v) => (
          <div
            key={v.id}
            style={{
              background: "#151515",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <img src={v.banner_url} style={{ width: "100%" }} />

            <video
              src={v.preview_url}
              muted
              autoPlay
              loop
              playsInline
              style={{ width: "100%" }}
              onPlay={() => startTimer(v.id)}
            />

            <div style={{ padding: 15 }}>
              <h3>{v.title}</h3>
              <p style={{ opacity: 0.7 }}>{v.description}</p>

              {timers[v.id] > 0 ? (
                <button
                  disabled
                  style={{
                    width: "100%",
                    padding: 10,
                    background: "#333",
                    color: "#aaa",
                    borderRadius: 8,
                    border: "none",
                  }}
                >
                  ⏳ Wait {timers[v.id]} sec
                </button>
              ) : (
                <a
                  href={v.video_url}
                  download
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: 10,
                    padding: 10,
                    background: "#2563eb",
                    borderRadius: 8,
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  ⬇ Download
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}