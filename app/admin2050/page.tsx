"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fbborhcjkuxomwqkfubw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiYm9yaGNqa3V4b213cWtmdWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5ODM3ODksImV4cCI6MjA4MzU1OTc4OX0.bmgBdWdNcvoJhuSXWa4XOV6NXNwnxZqn6Ir1TracmS4"
);

export default function Admin2050() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const { error } = await supabase.from("videos").insert({
      title: form.title.value,
      banner_url: form.banner.value,
      preview_url: form.preview.value,
      video_url: form.video.value,
      description: form.desc.value,
    });

    setLoading(false);

    if (error) {
      alert("Error uploading");
    } else {
      alert("Video uploaded successfully");
      form.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 30, maxWidth: 500 }}>
      <h2>Upload Video</h2>

      <input name="title" placeholder="Title" required />
      <input name="banner" placeholder="Banner Image URL" required />
      <input name="preview" placeholder="5 sec Preview Video URL" required />
      <input name="video" placeholder="Main Download Video URL" required />
      <textarea name="desc" placeholder="Description"></textarea>

      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Save"}
      </button>

      <style jsx>{`
        input, textarea, button {
          width: 100%;
          margin-bottom: 10px;
          padding: 10px;
        }
      `}</style>
    </form>
  );
}