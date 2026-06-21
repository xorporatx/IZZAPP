import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { GoalForm } from "@/components/goals/GoalForm";
import type { Goal } from "@/components/goals/GoalCard";
import { GOALS_KEY } from "./GoalsScreen";

const font = '"Google Sans", sans-serif';

export function AddGoalScreen() {
  const navigate = useNavigate();

  function handleSave(goal: Goal) {
    const existing: Goal[] = (() => {
      try { return JSON.parse(localStorage.getItem(GOALS_KEY) ?? "[]"); }
      catch { return []; }
    })();
    localStorage.setItem(GOALS_KEY, JSON.stringify([...existing, goal]));
    navigate("/goals");
  }

  return (
    <div dir="rtl" style={{ display: "flex", flexDirection: "column", height: "100svh", background: "white", fontFamily: font }}>
      {/* iOS status bar */}
      <div style={{ height: 53, background: "white", flexShrink: 0 }} />

      {/* Header */}
      <div dir="ltr" style={{
        display: "flex", height: 56, padding: "0 20px",
        alignItems: "center", justifyContent: "space-between", flexShrink: 0,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            width: 36, height: 36, borderRadius: "50%", background: "#f5f5f5",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "none", cursor: "pointer",
          }}
        >
          <X style={{ width: 20, height: 20, color: "#262626" }} />
        </button>
        <p style={{ fontFamily: font, fontSize: 18, fontWeight: 600, color: "#262626", margin: 0 }}>הזנת יעד חדש</p>
        <div style={{ width: 36 }} />
      </div>

      <GoalForm onSave={handleSave} />
    </div>
  );
}
