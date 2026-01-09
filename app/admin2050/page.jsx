"use client";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fbborhcjkuxomwqkfubw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiYm9yaGNqa3V4b213cWtmdWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5ODM3ODksImV4cCI6MjA4MzU1OTc4OX0.bmgBdWdNcvoJhuSXWa4XOV6NXNwnxZqn6Ir1TracmS4"
);

export default function AdminPage() {
  async function submit(e) {
    e.preventDefault();
    const f = e.target;

    await supabase.from("videos").insert({
      title: f.title.value,
      banner_url: f.banner.value,
      preview_url: f.preview.value,
      video_url: f.video.value,
      description: f.desc.value,
    });

    alert("Uploaded");
    f.reset();
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 400 }}>
      <h2>Upload Video</h2>

      <input name="title" placeholder="Title" required />
      <input name="banner" placeholder="Banner URL" required />
      <input name="preview" placeholder="Preview URL" required />
      <input name="video" placeholder="Download URL" required />
      <textarea name="desc" placeholder="Description" />

      <button type="submit">Save</button>

      <style>{`
        input, textarea, button {
          width: 100%;
          margin-bottom: 10px;
          padding: 10px;
        }
      `}</style>
    </form>
  );
}