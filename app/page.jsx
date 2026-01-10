"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import VideoRow from "./components/VideoRow";
import VideoModal from "./components/VideoModal";
import SearchBar from "./components/SearchBar";
import SkeletonRow from "./components/SkeletonRow";
import EmptyState from "./components/EmptyState";
import { playSound } from "./utils/sound";
import { sortLatest } from "./utils/sort";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(null);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    playSound("/sounds/intro.mp3");

    supabase.from("videos").select("*").then(({ data }) => {
      setVideos(sortLatest(data || []));
      setLoading(false);
    });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="netflix-bg">
      <Header />

      {loading && <SkeletonRow />}

      {!loading && videos.length === 0 && <EmptyState />}

      {!loading && videos.length > 0 && (
        <>
          <HeroBanner video={videos[0]} onOpen={setOpen} />
          <SearchBar value={q} onChange={setQ} />
          <VideoRow title="Trending" videos={filtered} onOpen={setOpen} />
          <VideoRow title="Recommended" videos={filtered} onOpen={setOpen} />
        </>
      )}

      {open && <VideoModal video={open} onClose={() => setOpen(null)} />}
    </div>
  );
}