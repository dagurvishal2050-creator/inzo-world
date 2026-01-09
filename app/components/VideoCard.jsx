export default function VideoCard({ video, onOpen }) {
  return (
    <div
      className="thumb"
      onClick={() => onOpen(video)}
    >
      <img
        src={video.banner_url}
        alt={video.title}
        loading="lazy"
      />
    </div>
  );
}