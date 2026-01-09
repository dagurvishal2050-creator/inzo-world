export default function SkeletonRow() {
  return (
    <>
      <h3 className="row-title">Loading…</h3>
      <div className="row">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton"></div>
        ))}
      </div>
    </>
  );
}