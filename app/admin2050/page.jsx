"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function AdminUpload() {
  const [supabase, setSupabase] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const [v, setV] = useState({
    title: "",
    banner: "",
    preview: "",
    video: "",
    description: "",
  });

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      alert("Supabase env missing");
      return;
    }

    const client = createClient(url, key);
    setSupabase(client);
    setReady(true);
  }, []);

  const upload = async () => {
    if (!supabase || !ready) {
      alert("Admin not ready");
      return;
    }

    if (!v.title || !v.banner || !v.preview || !v.video) {
      alert("All fields required");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("videos").insert([
      {
        title: v.title,
        banner_url: v.banner,
        preview_url: v.preview,
        video_url: v.video,
        description: v.description,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Upload failed");
    } else {
      alert("Uploaded ✅");
      setV({
        title: "",
        banner: "",
        preview: "",
        video: "",
        description: "",
      });
    }
  };

  if (!ready) {
    return (
      <div className="admin-upload">
        <h3>Loading admin…</h3>
      </div>
    );
  }

  return (
    <div className="admin-upload">
      <h2>Upload Video</h2>

      <input
        placeholder="Title"
        value={v.title}
        onChange={e => setV({ ...v, title: e.target.value })}
      />

      <input
        placeholder="Banner Image URL"
        value={v.banner}
        onChange={e => setV({ ...v, banner: e.target.value })}
      />

      <input
        placeholder="5 sec Preview Video URL"
        value={v.preview}
        onChange={e => setV({ ...v, preview: e.target.value })}
      />

      <input
        placeholder="Download Video URL"
        value={v.video}
        onChange={e => setV({ ...v, video: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={v.description}
        onChange={e => setV({ ...v, description: e.target.value })}
      />

      <button onClick={upload} disabled={loading}>
        {loading ? "Uploading…" : "UPLOAD"}
      </button>
    </div>
  );
}