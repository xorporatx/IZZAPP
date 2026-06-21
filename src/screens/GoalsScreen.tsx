import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BellDot, Menu, Search } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { SideMenuDrawer } from "@/components/SideMenuDrawer";
import { GoalCard, type Goal } from "@/components/goals/GoalCard";
import { GoalEmptyState } from "@/components/goals/GoalEmptyState";

const font = '"Google Sans", sans-serif';
export const GOALS_KEY = "izz_goals";

function loadGoals(): Goal[] {
  try { return JSON.parse(localStorage.getItem(GOALS_KEY) ?? "[]"); }
  catch { return []; }
}

export function GoalsScreen() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [goals] = useState<Goal[]>(loadGoals);

  const TYPE_LABELS: Record<string, string> = {
    income: "הכנסות", labor: "עלויות עובדים",
    expense: "הוצאות כלליות", sales: "מכירות",
  };

  const filtered = search
    ? goals.filter(g => TYPE_LABELS[g.type]?.includes(search))
    : goals;

  return (
    <div dir="rtl" style={{ display: "flex", flexDirection: "column", minHeight: "100svh", background: "white", fontFamily: font }}>
      {/* iOS status bar */}
      <div style={{ height: 53, background: "white", flexShrink: 0 }} />

      {/* Dashboard-style header */}
      <div dir="ltr" style={{
        background: "white",
        padding: "20px var(--page-horizontal-padding)",
        display: "flex", alignItems: "center", gap: 24, flexShrink: 0,
      }}>
        {/* LEFT: bell with dot */}
        <div style={{ position: "relative" }}>
          <button style={{
            width: 36, height: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          }}>
            <BellDot style={{ width: 16, height: 16, color: "#262626" }} />
          </button>
          <div style={{ position: "absolute", top: 13, left: 20, width: 4, height: 4, borderRadius: "50%", background: "#ef4444" }} />
        </div>

        {/* CENTER: greeting */}
        <div style={{ flex: 1, textAlign: "center", paddingRight: 10 }}>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: "#262626", letterSpacing: "-0.36px", lineHeight: "16px", margin: 0 }}>שלום אור,</p>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 400, color: "#737373", lineHeight: "16px", margin: 0 }}>ג׳פניקה סניף אריאל</p>
        </div>

        {/* RIGHT: burger */}
        <button onClick={() => setMenuOpen(true)} style={{
          width: 36, height: 36, borderRadius: "50%", background: "#f5f5f5",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "none", cursor: "pointer", flexShrink: 0,
        }}>
          <Menu style={{ width: 20, height: 20, color: "#262626" }} />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1, overflowY: "auto",
        paddingLeft: "var(--page-horizontal-padding)",
        paddingRight: "var(--page-horizontal-padding)",
        paddingBottom: "calc(96px + env(safe-area-inset-bottom, 0px))",
      }}>
        {goals.length === 0 ? (
          <GoalEmptyState />
        ) : (
          <>
            {/* Title row */}
            <div dir="ltr" style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              paddingTop: 10, paddingBottom: 21,
            }}>
              <button onClick={() => navigate("/goals/new")} style={{
                height: 36, padding: "8px 16px",
                background: "#059669", color: "white",
                border: "none", borderRadius: 8,
                fontFamily: font, fontSize: 14, fontWeight: 600,
                cursor: "pointer", boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
              }}>
                הוסף יעד
              </button>
              <span style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: "#a3a3a3" }}>כל היעדים</span>
            </div>

            {/* Search */}
            <div dir="ltr" style={{
              display: "flex", alignItems: "center", gap: 4,
              height: 36, border: "1px solid #e5e5e5", borderRadius: 8,
              background: "white", padding: "4px 12px",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)", marginBottom: 11,
            }}>
              <Search style={{ width: 16, height: 16, color: "#737373", flexShrink: 0 }} />
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="חיפוש יעד" dir="rtl"
                style={{
                  flex: 1, background: "none", border: "none", outline: "none",
                  fontFamily: font, fontSize: 14, color: "#262626", textAlign: "right",
                }}
              />
            </div>

            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {filtered.map(g => <GoalCard key={g.id} goal={g} />)}
            </div>
          </>
        )}
      </div>

      <BottomNav />
      <SideMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
