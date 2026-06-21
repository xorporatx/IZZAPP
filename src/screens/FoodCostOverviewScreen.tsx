import { useState } from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { SideMenuDrawer } from "@/components/SideMenuDrawer";

// TODO: Replace mock supplier data with API data
const SUPPLIERS = [
  {
    id: "unimarket",
    name: "יונימרקט",
    orders: "5 הזמנות",
    pct: 0.9,
    amount: 2633,
    barFill: 50,
  },
  {
    id: "zhano-fish",
    name: "ז׳אנו דגים",
    orders: "6 הזמנות",
    pct: 1.9,
    amount: 4733,
    barFill: 75,
  },
];

const font = '"Google Sans", sans-serif';

function ils(n: number) {
  return `₪${n.toLocaleString("he-IL")}`;
}

// ── SupplierCostCard ────────────────────────────────────────────────────────

type SupplierCostCardProps = {
  name: string;
  orders: string;
  pct: number;
  amount: number;
  barFill: number;
  onClick: () => void;
};

function SupplierCostCard({ name, orders, pct, amount, barFill, onClick }: SupplierCostCardProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        background: "white",
        border: "1px solid #e5e5e5",
        borderRadius: 10,
        boxShadow: "0px 1px 1px rgba(0,0,0,0.05)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        cursor: "pointer",
        textAlign: "right",
      }}
    >
      {/* Top row: pct+amount LEFT | name+orders RIGHT */}
      <div
        dir="ltr"
        style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%" }}
      >
        {/* LEFT: percentage + amount */}
        <div style={{ textAlign: "left" }}>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: "#059669", lineHeight: "16px", margin: 0 }}>
            {pct}%
          </p>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 400, color: "#737373", lineHeight: "16px", margin: 0 }}>
            {ils(amount)}
          </p>
        </div>

        {/* RIGHT: name + orders */}
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: "#262626", lineHeight: "16px", margin: 0 }}>
            {name}
          </p>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 400, color: "#737373", lineHeight: "16px", margin: 0 }}>
            {orders}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 8, background: "#e5e5e5", borderRadius: 9999, width: "100%", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${barFill}%`,
            background: "#059669",
            borderRadius: 9999,
          }}
        />
      </div>
    </button>
  );
}

// ── Screen ──────────────────────────────────────────────────────────────────

export function FoodCostOverviewScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      style={{ display: "flex", flexDirection: "column", minHeight: "100svh", background: "white", fontFamily: font }}
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

        <div style={{ flex: 1, textAlign: "center" }}>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: "#262626", letterSpacing: "-0.36px", lineHeight: "16px", margin: 0 }}>
            שלום אור,
          </p>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 400, color: "#737373", lineHeight: "16px", margin: 0 }}>
            ג׳פניקה סניף אריאל
          </p>
        </div>

        {/* placeholder for symmetry */}
        <div style={{ width: 36 }} />
      </div>

      {/* ── Scrollable content ──────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingLeft: "var(--page-horizontal-padding)",
          paddingRight: "var(--page-horizontal-padding)",
          paddingBottom: "calc(96px + env(safe-area-inset-bottom, 0px))",
          paddingTop: 0,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {/* Page title */}
        <div style={{ height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: "#262626", margin: 0 }}>
            פודקוסט — מבט כללי
          </p>
        </div>

        {/* ── KPI row ───────────────────────────────────────────────────────── */}
        <div
          dir="ltr"
          style={{ display: "flex", gap: 10, height: 114, alignItems: "center" }}
        >
          {/* LEFT: סה״כ הוצאה */}
          <div
            style={{
              flex: 1,
              background: "white",
              borderRadius: 10,
              boxShadow: "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)",
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <p style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: "#262626", margin: 0, textAlign: "right" }}>
              סה״כ הוצאה
            </p>
            <p style={{ fontFamily: font, fontSize: 24, fontWeight: 700, color: "#262626", lineHeight: "32px", margin: 0, textAlign: "right" }}>
              ₪2,633
            </p>
            <p style={{ fontFamily: font, fontSize: 12, fontWeight: 400, color: "#737373", lineHeight: "16px", margin: 0, textAlign: "right" }}>
              מ-₪303,865 מכירות
            </p>
          </div>

          {/* RIGHT: פוד קוסט כולל — green bg */}
          <div
            style={{
              flex: 1,
              background: "#ecfdf5",
              borderRadius: 10,
              boxShadow: "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)",
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <p style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: "#262626", margin: 0, textAlign: "right" }}>
              פוד קוסט כולל
            </p>
            <p style={{ fontFamily: font, fontSize: 24, fontWeight: 700, color: "#059669", lineHeight: "32px", margin: 0, textAlign: "right" }}>
              0.9%
            </p>
            <p style={{ fontFamily: font, fontSize: 12, fontWeight: 400, color: "#059669", lineHeight: "16px", margin: 0, textAlign: "right" }}>
              תקין
            </p>
          </div>
        </div>

        {/* ── Action row ───────────────────────────────────────────────────── */}
        <div
          dir="ltr"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, paddingBottom: 14 }}
        >
          {/* LEFT: "הוסף יעד" button */}
          <button
            style={{
              height: 36,
              paddingInline: 16,
              background: "#059669",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontFamily: font,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0px 1px 1px rgba(0,0,0,0.05)",
              whiteSpace: "nowrap",
            }}
          >
            הוסף יעד
          </button>

          {/* RIGHT: section label */}
          <span style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: "#a3a3a3" }}>
            פירוט ספקים
          </span>
        </div>

        {/* ── Supplier cards ───────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 21 }}>
          {SUPPLIERS.map((s) => (
            <SupplierCostCard
              key={s.id}
              name={s.name}
              orders={s.orders}
              pct={s.pct}
              amount={s.amount}
              barFill={s.barFill}
              onClick={() => navigate(`/food-cost/${s.id}`)}
            />
          ))}
        </div>
      </div>

      <BottomNav />
      <SideMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
