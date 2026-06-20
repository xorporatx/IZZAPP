import { useState } from "react";
import { BellDot, Menu } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { SideMenuDrawer } from "@/components/SideMenuDrawer";

const font = '"Google Sans", sans-serif';

// ── Data ────────────────────────────────────────────────────────────────────

type Employee = {
  name: string;
  dept: string;
  net: number;
  employer: number;
  isSummary?: boolean;
};

const EMPLOYEES: Employee[] = [
  { name: "זיאד בשר",    dept: "משלוחים", net: 3820, employer: 4775 },
  { name: "חאתם איבדח",  dept: "מטבח",    net: 4100, employer: 5125 },
  { name: "טאאר איבדח",  dept: "מטבח",    net: 3560, employer: 4450 },
  { name: "יוסף מצלח",   dept: "אריזות",  net: 2840, employer: 3550 },
  { name: "יוסף מצלח",   dept: "אריזות",  net: 2840, employer: 3550 },
  { name: "יזיד לאמי",   dept: "פלור",    net: 1910, employer: 2388, isSummary: true },
];

type Department = {
  name: string;
  pct: number;
  color: string;
};

const DEPARTMENTS: Department[] = [
  { name: "מטבח",    pct: 18.4, color: "#eab308" }, // warning — yellow
  { name: "פלור",    pct: 5.2,  color: "#059669" }, // ok — green
  { name: "משלוחים", pct: 4.1,  color: "#059669" },
  { name: "אריזות",  pct: 2.1,  color: "#059669" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function ils(n: number) {
  return `₪${n.toLocaleString("he-IL")}`;
}

// ── Card shell ───────────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  background: "white",
  border: "1px solid #EAEAEA",
  borderRadius: 16,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  overflow: "hidden",
};

// ── Screen ───────────────────────────────────────────────────────────────────

export function LaborCostScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      dir="rtl"
      style={{ display: "flex", flexDirection: "column", minHeight: "100svh", background: "#f5f5f5", fontFamily: font }}
    >
      {/* iOS status bar */}
      <div style={{ height: 53, background: "white", flexShrink: 0 }} />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div
        dir="ltr"
        style={{
          background: "white",
          padding: "var(--page-horizontal-padding)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        {/* LEFT: menu */}
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "#f5f5f5",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "none", cursor: "pointer", flexShrink: 0,
          }}
          aria-label="פתח תפריט"
        >
          <Menu style={{ width: 20, height: 20, color: "#262626" }} />
        </button>

        {/* CENTER: greeting */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: "#262626", letterSpacing: "-0.36px", lineHeight: "16px", margin: 0 }}>
            שלום אור,
          </p>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 400, color: "#737373", lineHeight: "16px", margin: 0 }}>
            ג׳פניקה סניף אריאל
          </p>
        </div>

        {/* RIGHT: bell */}
        <div style={{ position: "relative" }}>
          <button
            style={{
              width: 36, height: 36, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "none", border: "none", cursor: "pointer",
            }}
            aria-label="התראות"
          >
            <BellDot style={{ width: 16, height: 16, color: "#262626" }} />
          </button>
          <span style={{
            position: "absolute", top: 8, right: 8,
            width: 4, height: 4, borderRadius: "50%",
            background: "#dc2626",
          }} />
        </div>
      </div>

      {/* ── Page title ──────────────────────────────────────────────────────── */}
      <div
        style={{
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 36,
          flexShrink: 0,
        }}
      >
        <p style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: "#262626", margin: 0 }}>
          לייבור קוסט — אריזות
        </p>
      </div>

      {/* ── Scrollable content ──────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingLeft: "var(--page-horizontal-padding)",
          paddingRight: "var(--page-horizontal-padding)",
          paddingTop: 16,
          paddingBottom: 120,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >

        {/* ════════════════════════════════════════════════════════════════
            Card 1 — עובדים פעילים
        ════════════════════════════════════════════════════════════════ */}
        <div style={cardStyle}>

          {/* Card header */}
          <div
            dir="ltr"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 24px 0",
              height: 66,
            }}
          >
            {/* LEFT: action button */}
            <button
              style={{
                height: 40,
                paddingInline: 16,
                background: "#059669",
                color: "white",
                border: "none",
                borderRadius: 12,
                fontFamily: font,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              הוסף עובד
            </button>

            {/* RIGHT: section title */}
            <span style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: "#262626" }}>
              עובדים פעילים
            </span>
          </div>

          {/* Table — 24px wrapper, columns in dir="ltr" left-to-right: +מעביד | נטו | מחלקה | שם */}
          <div style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 0 }}>

            {/* Column headers */}
            <div
              dir="ltr"
              style={{
                display: "flex",
                alignItems: "center",
                height: 40,
                borderBottom: "1px solid #e5e5e5",
              }}
            >
              <div style={{ width: 64, fontFamily: font, fontSize: 14, fontWeight: 500, color: "#737373", textAlign: "right", flexShrink: 0 }}>
                +מעביד
              </div>
              <div style={{ width: 64, fontFamily: font, fontSize: 14, fontWeight: 500, color: "#737373", textAlign: "right", flexShrink: 0 }}>
                נטו
              </div>
              <div style={{ width: 72, fontFamily: font, fontSize: 14, fontWeight: 500, color: "#737373", textAlign: "right", flexShrink: 0 }}>
                מחלקה
              </div>
              <div style={{ flex: 1, fontFamily: font, fontSize: 14, fontWeight: 500, color: "#737373", textAlign: "right" }}>
                שם
              </div>
            </div>

            {/* Employee rows */}
            {EMPLOYEES.map((emp, idx) => {
              const isLast = idx === EMPLOYEES.length - 1;
              const fw = emp.isSummary ? 600 : 400;
              return (
                <div
                  key={idx}
                  dir="ltr"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 56,
                    borderBottom: isLast ? "none" : "1px solid #e5e5e5",
                  }}
                >
                  <div style={{ width: 64, fontFamily: font, fontSize: 14, fontWeight: fw, color: "#262626", textAlign: "right", flexShrink: 0 }}>
                    {ils(emp.employer)}
                  </div>
                  <div style={{ width: 64, fontFamily: font, fontSize: 14, fontWeight: fw, color: "#262626", textAlign: "right", flexShrink: 0 }}>
                    {ils(emp.net)}
                  </div>
                  <div style={{ width: 72, fontFamily: font, fontSize: 14, fontWeight: fw, color: "#262626", textAlign: "right", flexShrink: 0, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                    {emp.dept}
                  </div>
                  <div style={{ flex: 1, fontFamily: font, fontSize: 14, fontWeight: fw, color: "#262626", textAlign: "right", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                    {emp.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            Card 2 — עלות לפי מחלקה
        ════════════════════════════════════════════════════════════════ */}
        <div style={cardStyle}>

          {/* Card header */}
          <div
            dir="ltr"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 24px",
              height: 68,
            }}
          >
            {/* LEFT: action button */}
            <button
              style={{
                height: 40,
                paddingInline: 16,
                background: "#059669",
                color: "white",
                border: "none",
                borderRadius: 12,
                fontFamily: font,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              הוסף מחלקה
            </button>

            {/* RIGHT: section title */}
            <span style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: "#262626" }}>
              עלות לפי מחלקה
            </span>
          </div>

          {/* Department rows */}
          <div style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {DEPARTMENTS.map((dept) => (
              <div key={dept.name} dir="ltr" style={{ display: "flex", alignItems: "center", gap: 11 }}>
                {/* LEFT: percentage */}
                <span style={{ fontFamily: font, fontSize: 14, color: "#737373", whiteSpace: "nowrap", flexShrink: 0, minWidth: 44, textAlign: "right" }}>
                  {dept.pct}%
                </span>

                {/* Progress bar */}
                <div style={{ flex: 1, height: 8, borderRadius: 9999, background: "#EAEAEA", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${dept.pct * 5}%`, // scale: 20% pct = 100% bar
                      maxWidth: "100%",
                      borderRadius: 9999,
                      background: dept.color,
                    }}
                  />
                </div>

                {/* RIGHT: department name */}
                <span style={{ fontFamily: font, fontSize: 14, color: "#737373", whiteSpace: "nowrap", flexShrink: 0, minWidth: 64, textAlign: "right" }}>
                  {dept.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <BottomNav />
      <SideMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
