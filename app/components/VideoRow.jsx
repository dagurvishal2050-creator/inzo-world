import VideoCard from "./VideoCard";

export default function VideoRow({ title, videos, onOpen }) {
  if (!videos || videos.length === 0) return null;

  return (
    <>
      <h3 className="row-title">{title}</h3>
      <div className="row">
        {videos.map(video => (
          <VideoCard
            key={video.id}
            video={video}
            onOpen={onOpen}
          />
        ))}
      </div>
    </>
  );
}