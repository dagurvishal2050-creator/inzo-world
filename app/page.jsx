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

export default function Home() {
  const [supabase, setSupabase] = useState(null);
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(null);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    playSound("/sounds/intro.mp3");

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.error("Supabase env missing");
      setLoading(false);
      return;
    }

    const client = createClient(url, key);
    setSupabase(client);

    client
      .from("videos")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          setLoading(false);
          return;
        }
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