import { useNavigate, useLocation } from "react-router-dom";
import { UserRound, Expand, CircleCheck, BarChart2, Plus } from "lucide-react";

// Figma node 479-3985 — Navigation Bar
// LTR slot order: פרופיל | הוצאות | FAB | יעדים | בקרה
// RTL visual (right→left): בקרה | יעדים | FAB | הוצאות | פרופיל

const ACTIVE = "#059669";
const MUTED  = "#737373";
const FAB_BG = "#047857";

type NavItemProps = {
  Icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
};

function NavItem({ Icon, label, active, onClick }: NavItemProps) {
  const color = active ? ACTIVE : MUTED;
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        width: "100%",
        height: "100%",
        minWidth: 0,
      }}
    >
      <Icon style={{ width: 24, height: 24, color, flexShrink: 0 }} />
      <span style={{
        fontFamily: '"Google Sans", sans-serif',
        fontSize: 10,
        lineHeight: 1,
        color,
        textAlign: "center",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
    </button>
  );
}

export function BottomNav() {
  const navigate     = useNavigate();
  const { pathname } = useLocation();
  const is           = (p: string) => pathname === p;

  return (
    <div
      dir="ltr"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "white",
          borderRadius: "26px 26px 0 0",
          boxShadow: "0px -2px 12px rgba(0,0,0,0.08)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          overflow: "visible",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            height: 80,
            alignItems: "center",
            overflow: "visible",
          }}
        >
          {/* Slot 1 — פרופיל */}
          <NavItem Icon={UserRound}   label="פרופיל" active={is("/profile")}   onClick={() => navigate("/profile")} />

          {/* Slot 2 — הוצאות */}
          <NavItem Icon={Expand}      label="הוצאות" active={is("/expenses")}  onClick={() => navigate("/expenses")} />

          {/* Slot 3 — FAB: positioned at top-center of this cell, floats above the card */}
          <div
            style={{
              position: "relative",
              height: "100%",
              overflow: "visible",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => navigate("/daily-entry")}
              aria-label="הוסף"
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: FAB_BG,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 0 20px 6px rgba(4,120,87,0.40)",
                zIndex: 2,
              }}
            >
              <Plus style={{ width: 28, height: 28, color: "white", strokeWidth: 2.5 }} />
            </button>
          </div>

          {/* Slot 4 — יעדים */}
          <NavItem Icon={CircleCheck} label="יעדים"  active={is("/goals")}     onClick={() => navigate("/goals")} />

          {/* Slot 5 — בקרה */}
          <NavItem Icon={BarChart2}   label="בקרה"   active={is("/dashboard")} onClick={() => navigate("/dashboard")} />
        </div>
      </div>
    </div>
  );
}
