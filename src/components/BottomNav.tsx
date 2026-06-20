import { useNavigate, useLocation } from "react-router-dom";
import { UserRound, Expand, CircleCheck, BarChart2, Plus } from "lucide-react";

// Figma node 401:7528 — Navigation Bar 4
// LTR slot order: פרופיל | הוצאות | FAB | יעדים | בקרה
// RTL visual (right→left): בקרה | יעדים | FAB | הוצאות | פרופיל

const ACTIVE = "#059669"; // emerald-600
const MUTED  = "#737373"; // muted-foreground
const FAB_BG = "#047857"; // emerald-700

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
        gap: 4,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        width: "100%",
        height: "100%",
        minWidth: 0,   // allow grid cell to shrink
      }}
    >
      <Icon style={{ width: 22, height: 22, color, flexShrink: 0 }} />
      <span style={{
        fontFamily: '"Google Sans", sans-serif',
        fontSize: 9,
        lineHeight: 1,
        color,
        textAlign: "center",
        display: "block",
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
    // dir="ltr" — explicit 5-column order, never auto-mirrored by RTL
    <div
      dir="ltr"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        // overflow visible so FAB drop-shadow is not clipped
        overflow: "visible",
      }}
    >
      {/* White card: starts 27px from top so FAB overflows above it */}
      <div style={{
        position: "relative",
        background: "white",
        borderRadius: "24px 24px 0 0",
        borderTop: "1px solid #f0f0f0",
        boxShadow: "0px -2px 16px rgba(0,0,0,0.07)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}>
        {/* 5-column grid — tab row height 64px */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          height: 64,
          position: "relative",
          overflow: "visible",
        }}>

          {/* Slot 1 — פרופיל */}
          <NavItem Icon={UserRound}   label="פרופיל" active={is("/profile")}   onClick={() => navigate("/profile")} />

          {/* Slot 2 — הוצאות */}
          <NavItem Icon={Expand}      label="הוצאות" active={is("/expenses")}  onClick={() => navigate("/expenses")} />

          {/* Slot 3 — FAB (floats above the card using negative top margin) */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            overflow: "visible",
          }}>
            <button
              onClick={() => navigate("/daily-entry")}
              aria-label="הוסף"
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: FAB_BG,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: -28,          // floats above the white card top edge
                filter: "drop-shadow(0 0 14px rgba(4,120,87,0.60))",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Plus style={{ width: 24, height: 24, color: "white", strokeWidth: 2.5 }} />
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
