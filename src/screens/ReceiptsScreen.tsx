import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, ArrowDown, Calendar, Download } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { SideMenuDrawer } from "@/components/SideMenuDrawer";

// TODO: Replace mock data with API data

const font = '"Google Sans", sans-serif';

const RECEIPTS = [
  { name: "יונימרקט",      date: "12/12/2026", amount: "₪4,024.92" },
  { name: "ז׳אנו דגים",   date: "12/12/2026", amount: "₪9,952.52" },
  { name: "מנשה פירות",   date: "12/12/2026", amount: "₪3,153.64" },
  { name: "יש חסד",       date: "12/12/2026", amount: "₪7,369.55" },
  { name: "קצבית ישראל",  date: "12/12/2026", amount: "₪2,192.86" },
];

function ReceiptRow({ name, date, amount }: { name: string; date: string; amount: string }) {
  const cell: React.CSSProperties = {
    height: 72,
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #e5e5e5",
    padding: "0 8px",
    flexShrink: 0,
  };
  const text: React.CSSProperties = {
    fontFamily: font, fontSize: 14,
    color: "#262626", whiteSpace: "nowrap",
    overflow: "hidden", textOverflow: "ellipsis",
  };

  return (
    <div dir="ltr" style={{ display: "flex", width: "100%" }}>
      {/* Download button — leftmost */}
      <div style={{ ...cell, width: 60, justifyContent: "center" }}>
        <button style={{
          width: 36, height: 36,
          border: "1px solid #e5e5e5",
          borderRadius: 8,
          background: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0,0,0,0.05)",
        }}>
          <Download style={{ width: 16, height: 16, color: "#262626" }} />
        </button>
      </div>

      {/* Amount */}
      <div style={{ ...cell, flex: 1, justifyContent: "flex-end" }}>
        <span style={{ ...text, fontWeight: 400, textAlign: "right" }}>{amount}</span>
      </div>

      {/* Date */}
      <div style={{ ...cell, flex: 1, justifyContent: "flex-end" }}>
        <span style={{ ...text, fontWeight: 500, textAlign: "right" }}>{date}</span>
      </div>

      {/* Name — rightmost */}
      <div style={{ ...cell, flex: 1, justifyContent: "flex-end" }}>
        <span style={{ ...text, fontWeight: 500, textAlign: "right" }}>{name}</span>
      </div>
    </div>
  );
}

export function ReceiptsScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const headCell: React.CSSProperties = {
    height: 40,
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #e5e5e5",
    padding: "0 8px",
    flexShrink: 0,
  };
  const headText: React.CSSProperties = {
    fontFamily: font, fontSize: 14, fontWeight: 500,
    color: "#737373", textAlign: "right", width: "100%",
  };

  return (
    <div
      dir="rtl"
      style={{ display: "flex", flexDirection: "column", minHeight: "100svh", background: "white", fontFamily: font }}
    >
      {/* iOS status bar */}
      <div style={{ height: 53, background: "white", flexShrink: 0 }} />

      {/* Header */}
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
        {/* LEFT: scan/action buttons (placeholder) */}
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{
            width: 36, height: 36, borderRadius: 8,
            background: "white", border: "1px solid #e5e5e5",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 1px 1px rgba(0,0,0,0.05)",
          }}>
            <Download style={{ width: 16, height: 16, color: "#262626" }} />
          </button>
        </div>

        {/* CENTER: greeting */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: "#262626", letterSpacing: "-0.36px", lineHeight: "16px", margin: 0 }}>
            שלום אור,
          </p>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 400, color: "#737373", lineHeight: "16px", margin: 0 }}>
            ג׳פניקה סניף אריאל
          </p>
        </div>

        {/* RIGHT: menu */}
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
      </div>

      {/* Scrollable content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingLeft: "var(--page-horizontal-padding)",
          paddingRight: "var(--page-horizontal-padding)",
          paddingBottom: "calc(96px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {/* Action row */}
        <div
          dir="ltr"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 24 }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{
              height: 36, paddingInline: 16,
              background: "#059669", color: "white",
              border: "none", borderRadius: 8,
              fontFamily: font, fontSize: 14, fontWeight: 600,
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
              boxShadow: "0 1px 1px rgba(0,0,0,0.05)",
            }}>
              <ArrowDown style={{ width: 16, height: 16 }} />
              דוח מסכם
            </button>
            <button style={{
              width: 36, height: 36,
              border: "1px solid #e5e5e5",
              borderRadius: 8,
              background: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0,0,0,0.05)",
            }}>
              <Calendar style={{ width: 16, height: 16, color: "#262626" }} />
            </button>
          </div>
          <span style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: "#262626" }}>קבלות</span>
        </div>

        {/* Table */}
        <div>
          {/* Header */}
          <div dir="ltr" style={{ display: "flex", width: "100%" }}>
            <div style={{ ...headCell, width: 60 }} />
            <div style={{ ...headCell, flex: 1 }}><span style={headText}>סכום</span></div>
            <div style={{ ...headCell, flex: 1 }}><span style={headText}>תאריך</span></div>
            <div style={{ ...headCell, flex: 1 }}><span style={headText}>שם קבלה</span></div>
          </div>

          {RECEIPTS.map(r => (
            <ReceiptRow key={r.name} name={r.name} date={r.date} amount={r.amount} />
          ))}
        </div>
      </div>

      <BottomNav />
      <SideMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
