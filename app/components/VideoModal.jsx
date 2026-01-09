import { useEffect, useState } from "react";
import { playSound } from "../utils/sound";

export default function VideoModal({ video, onClose }) {
  const [t, setT] = useState(null);

  useEffect(() => {
    if (t === 0) {
      playSound("/sounds/download.mp3");
      window.location.href = video.video_url;
    }

    if (t > 0) {
      const timer = setTimeout(() => setT(t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [t, video]);

  return (
    <div className="modal">
      <div className="modal-card">
        <video
          src={video.preview_url}
          autoPlay
          muted
          loop
        />

        <div className="modal-info">
          <h2>{video.title}</h2>
          <p>{video.description}</p>

          <button
            className="download-btn"
            disabled={t !== null}
            onClick={() => setT(5)}
          >
            {t === null ? "⬇ Download" : `⏳ ${t}s`}
          </button>

          {t !== null && (
            <div className="timer">
              Download starting…
            </div>
          )}

          <button
            className="close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}