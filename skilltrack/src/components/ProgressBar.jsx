export default function ProgressBar({ value }) {
  return (
    <div className="bar-track">
      <div className="bar-fill" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
