"use client";

import { useEffect, useState } from "react";

export default function NetflixLikeApp() {
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // skeleton
  }, []);

  useEffect(() => {
    if (timer === 0) {
      navigator.vibrate?.(200);
      window.location.href =
        "https://www.w3schools.com/html/mov_bbb.mp4";
    }
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    }
  }, [timer]);

  function openModal() {
    new Audio("/sounds/tudum.mp3").play();
    setOpen(true);
  }

  return (
    <div className="container">
      {/* HERO */}
      <div className="hero" onClick={openModal}>
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          autoPlay
          muted
          loop
        />
        <div className="hero-overlay">
          <h1>Inzo World</h1>
          <p>Tap to explore</p>
        </div>
      </div>

      {/* ROWS */}
      {["Trending", "New", "Recommended"].map((row) => (
        <div key={row}>
          <h2 className="row-title">{row}</h2>
          <div className="row">
            {[1, 2, 3, 4, 5].map((i) =>
              loading ? (
                <div key={i} className="skeleton"></div>
              ) : (
                <div key={i} className="thumb"></div>
              )
            )}
          </div>
        </div>
      ))}

      {/* MODAL */}
      {open && (
        <div className="modal">
          <div className="modal-card">
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              autoPlay
              muted
              loop
            />

            <div className="modal-info">
              <h2>Movie Title</h2>
              <p>
                Full cinematic description. Netflix-style premium experience.
              </p>

              <button
                className="download-btn"
                onClick={() => setTimer(5)}
              >
                ⬇ Download
              </button>

              {timer !== null && (
                <div className="timer">
                  Download starts in {timer}
                </div>
              )}

              <button className="close" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}