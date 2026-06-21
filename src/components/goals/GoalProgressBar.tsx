type Props = { value: number }; // 0-100

export function GoalProgressBar({ value }: Props) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div style={{
      width: "100%", height: 8, borderRadius: 9999,
      background: "rgba(132, 204, 22, 0.2)",
      overflow: "hidden", position: "relative",
    }}>
      <div style={{
        position: "absolute", left: 0, top: 0,
        height: "100%", width: `${pct}%`,
        background: "#84cc16", borderRadius: 9999,
      }} />
    </div>
  );
}
