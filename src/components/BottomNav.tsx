import { useNavigate, useLocation } from "react-router-dom";
import { UserRound, Expand, CircleCheck, BarChart2, Plus } from "lucide-react";

// Figma node 479-3985
// Container: 360×106px, flex center, rounded 26 26 0 0
// Inner row: 316×43px, flex between, items-start
// Each tab slot: 36px wide — icon 22px (h-35) + label 9px (h-8)
// FAB: ~46px circle centered in 43px row, glow via box-shadow

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
        justifyContent: "flex-end",    // anchor to bottom of 35px icon zone
        gap: 0,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        width: 36,
        flexShrink: 0,
      }}
    >
      {/* icon zone — 35px tall, icon centered within */}
      <div style={{ height: 35, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <Icon style={{ width: 22, height: 22, color, flexShrink: 0 }} />
      </div>
      {/* label zone — 8px tall */}
      <div style={{ height: 8, display: "flex", alignItems: "center", justifyContent: "center", width: 33 }}>
        <span style={{
          fontFamily: '"Google Sans", sans-serif',
          fontSize: 9,
          lineHeight: 1,
          color,
          textAlign: "center",
          whiteSpace: "nowrap",
          display: "block",
        }}>
          {label}
        </span>
      </div>
    </button>
  );
}

export function BottomNav() {
  const navigate     = useNavigate();
  const { pathname } = useLocation();
  const is           = (p: string) => pathname === p;

  return (
    // Outer fixed wrapper — overflow visible so FAB glow is never clipped
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
      {/* White nav card — 106px, rounded top corners */}
      <div
        style={{
          position: "relative",
          background: "white",
          borderRadius: "26px 26px 0 0",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          overflow: "visible",
          height: 106,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Inner content row — 316px wide, 43px tall, flex between */}
        <div
          style={{
            width: 316,
            height: 43,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            overflow: "visible",
            position: "relative",
          }}
        >
          {/* LEFT group: פרופיל + הוצאות */}
          <div style={{ display: "flex", gap: 22, alignItems: "flex-start", flexShrink: 0 }}>
            <NavItem Icon={UserRound} label="פרופיל" active={is("/profile")}  onClick={() => navigate("/profile")} />
            <NavItem Icon={Expand}    label="הוצאות" active={is("/expenses")} onClick={() => navigate("/expenses")} />
          </div>

          {/* CENTER: FAB — 46px circle, vertically centered in 43px row, glow via box-shadow */}
          <div
            style={{
              position: "relative",
              overflow: "visible",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 43,
            }}
          >
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
                boxShadow: "0 0 0 16px rgba(4,120,87,0.12), 0 0 0 8px rgba(4,120,87,0.18)",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Plus style={{ width: 18, height: 18, color: "white", strokeWidth: 2.5 }} />
            </button>
          </div>

          {/* RIGHT group: יעדים + בקרה */}
          <div style={{ display: "flex", gap: 22, alignItems: "flex-start", flexShrink: 0 }}>
            <NavItem Icon={CircleCheck} label="יעדים" active={is("/goals")}     onClick={() => navigate("/goals")} />
            <NavItem Icon={BarChart2}   label="בקרה"  active={is("/dashboard")} onClick={() => navigate("/dashboard")} />
          </div>
        </div>
      </div>
    </div>
  );
}
