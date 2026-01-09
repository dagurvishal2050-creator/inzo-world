export default function HeroBanner({ video, onOpen }) {
  if (!video) return null;

  return (
    <div className="hero" onClick={() => onOpen(video)}>
      <video
        src={video.preview_url}
        autoPlay
        muted
        loop
      />
      <div className="hero-overlay">
        <h1>{video.title}</h1>
        <p>{video.description}</p>
      </div>
    </div>
  );
}