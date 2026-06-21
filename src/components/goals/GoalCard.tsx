import { WalletCards, Sparkles, Timer, TrendingUp } from "lucide-react";
import { GoalProgressBar } from "./GoalProgressBar";

const font = '"Google Sans", sans-serif';

export type GoalType = "income" | "labor" | "expense" | "sales";

export interface Goal {
  id: string;
  type: GoalType;
  goalPercent: number;
  goalQuantity: number;
  goalAmount: number;
  currentValue: number;
  createdAt: string;
}

const TYPE_CONFIG: Record<GoalType, { label: string; iconBg: string; Icon: React.ElementType }> = {
  income:  { label: "יעד הכנסות חודשי (₪)", iconBg: "#fef9c3", Icon: WalletCards },
  labor:   { label: "יעד עלות עובדים (%)",   iconBg: "#fee2e2", Icon: Sparkles },
  expense: { label: "יעד הוצאות כלליות (%)", iconBg: "#f3e8ff", Icon: Timer },
  sales:   { label: "יעד מכירות",             iconBg: "#dbeafe", Icon: TrendingUp },
};

function formatGoalValue(goal: Goal): string {
  if (goal.goalAmount > 0) {
    const fmt = (n: number) => `₪${n.toLocaleString("he-IL")}`;
    return `${fmt(goal.currentValue)} מתוך ${fmt(goal.goalAmount)}`;
  }
  if (goal.goalPercent > 0) return `${goal.currentValue}% מתוך ${goal.goalPercent}%`;
  if (goal.goalQuantity > 0) return `${goal.currentValue} מתוך ${goal.goalQuantity}`;
  return "אין נתונים להצגת התקדמות";
}

function getProgressPct(goal: Goal): number {
  if (goal.goalAmount > 0 && goal.goalAmount > 0) return (goal.currentValue / goal.goalAmount) * 100;
  if (goal.goalPercent > 0) return (goal.currentValue / goal.goalPercent) * 100;
  if (goal.goalQuantity > 0) return (goal.currentValue / goal.goalQuantity) * 100;
  return 0;
}

export function GoalCard({ goal }: { goal: Goal }) {
  const { label, iconBg, Icon } = TYPE_CONFIG[goal.type];
  const pct = getProgressPct(goal);
  const currentDisplay = goal.goalAmount > 0
    ? `₪${goal.currentValue.toLocaleString("he-IL")}`
    : `${goal.currentValue}`;

  return (
    <div style={{
      background: "white",
      border: "1px solid #e5e5e5",
      borderRadius: 10,
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 17,
    }}>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }} dir="ltr">
        {/* Left: percentage + current value */}
        <div style={{ width: 56, flexShrink: 0 }}>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: "#059669", lineHeight: "16px", margin: 0 }}>
            {pct.toFixed(1)}%
          </p>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 400, color: "#737373", lineHeight: "16px", margin: 0 }}>
            {currentDisplay}
          </p>
        </div>
        {/* Center: title + progress text */}
        <div style={{ flex: 1, textAlign: "right" }}>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: "#262626", lineHeight: "16px", letterSpacing: "-0.36px", margin: 0 }}>
            {label}
          </p>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 400, color: "#737373", lineHeight: "16px", margin: 0 }}>
            {formatGoalValue(goal)}
          </p>
        </div>
        {/* Right: icon circle */}
        <div style={{
          width: 36, height: 36, borderRadius: 9999,
          background: iconBg,
          border: "2px solid white",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon style={{ width: 16, height: 16, color: "#262626" }} />
        </div>
      </div>
      <GoalProgressBar value={pct} />
    </div>
  );
}
