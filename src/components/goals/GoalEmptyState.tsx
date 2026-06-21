import { useNavigate } from "react-router-dom";

const font = '"Google Sans", sans-serif';

export function GoalEmptyState() {
  const navigate = useNavigate();
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      textAlign: "center", paddingTop: 60, paddingBottom: 64,
      paddingInline: 20, gap: 17,
    }}>
      <div style={{ fontSize: 80, lineHeight: 1 }}>🎯</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
        <p style={{
          fontFamily: font, fontSize: 24, fontWeight: 700,
          color: "#262626", letterSpacing: "-1.68px", margin: 0, lineHeight: "27.8px",
        }}>
          <span style={{ color: "#84cc16" }}>אין יעדים </span>
          <span>עדיין בעסק</span>
        </p>
        <p style={{ fontFamily: font, fontSize: 14, fontWeight: 400, color: "#737373", margin: 0, lineHeight: "20px" }}>
          לחץ כאן ליצירת יעדים חדשים עבור העסק שלך
        </p>
      </div>
      <button
        onClick={() => navigate("/goals/new")}
        style={{
          width: "100%", height: 36,
          background: "#059669", border: "none", borderRadius: 8,
          color: "white", fontFamily: font, fontSize: 14, fontWeight: 600,
          cursor: "pointer", boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        הוסף יעד חדש
      </button>
    </div>
  );
}
