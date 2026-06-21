import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// TODO: Replace mock supplier data with API data
type OrderRow = { item: string; pct: string; kg: number; cost: number };

type Supplier = {
  id: string;
  name: string;
  rows: OrderRow[];
  totalOrders: string;
  totalPct: string;
  totalKg: number;
  totalCost: number;
};

const SUPPLIER_DETAILS: Record<string, Supplier> = {
  unimarket: {
    id: "unimarket",
    name: "יונימרקט",
    rows: [
      { item: "#10251", pct: "2%",   kg: 2,   cost: 4775 },
      { item: "#10251", pct: "1.0%", kg: 1.5, cost: 5125 },
      { item: "#10251", pct: "1.0%", kg: 1,   cost: 4450 },
      { item: "#10251", pct: "1.0%", kg: 2,   cost: 3550 },
      { item: "#10251", pct: "1.0%", kg: 2,   cost: 3550 },
    ],
    totalOrders: "7 הזמנות",
    totalPct: "22%",
    totalKg: 20,
    totalCost: 22388,
  },
  "zhano-fish": {
    id: "zhano-fish",
    name: "ז׳אנו דגים",
    rows: [
      { item: "#10251", pct: "2%",   kg: 3,   cost: 5125 },
      { item: "#10251", pct: "1.5%", kg: 2,   cost: 4775 },
      { item: "#10251", pct: "1.0%", kg: 1.5, cost: 3550 },
      { item: "#10251", pct: "1.0%", kg: 2,   cost: 4450 },
      { item: "#10251", pct: "1.0%", kg: 2,   cost: 3550 },
      { item: "#10251", pct: "1.0%", kg: 2,   cost: 3550 },
    ],
    totalOrders: "6 הזמנות",
    totalPct: "7.5%",
    totalKg: 12.5,
    totalCost: 25000,
  },
};

const font = '"Google Sans", sans-serif';

function ils(n: number) {
  return `₪${n.toLocaleString("he-IL")}`;
}

// ── OrdersTable ─────────────────────────────────────────────────────────────

function OrdersTable({ supplier }: { supplier: Supplier }) {
  const colHead: React.CSSProperties = {
    fontFamily: font,
    fontSize: 14,
    fontWeight: 500,
    color: "#737373",
    textAlign: "right",
    height: 40,
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #e5e5e5",
    padding: "0 8px",
    flexShrink: 0,
  };
  const colCell: React.CSSProperties = {
    fontFamily: font,
    fontSize: 14,
    fontWeight: 400,
    color: "#262626",
    textAlign: "right",
    height: 52,
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #e5e5e5",
    padding: "0 8px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    flexShrink: 0,
  };
  const colCellBold: React.CSSProperties = { ...colCell, fontWeight: 700, borderBottom: "none" };

  return (
    // dir="ltr" — columns in DOM: עלות | כמות ק״ג | אחוזים | פריטים
    // RTL visual order right-to-left: פריטים | אחוזים | כמות ק״ג | עלות
    <div dir="ltr" style={{ display: "flex", width: "100%" }}>

      {/* Col 1 — עלות (leftmost in LTR DOM = leftmost visually) */}
      <div style={{ display: "flex", flexDirection: "column", width: 70, flexShrink: 0 }}>
        <div style={colHead}>עלות</div>
        {supplier.rows.map((r, i) => (
          <div key={i} style={colCell}>{ils(r.cost)}</div>
        ))}
        <div style={colCellBold}>{ils(supplier.totalCost)}</div>
      </div>

      {/* Col 2 — כמות ק״ג */}
      <div style={{ display: "flex", flexDirection: "column", width: 70, flexShrink: 0 }}>
        <div style={colHead}>כמות ק״ג</div>
        {supplier.rows.map((r, i) => (
          <div key={i} style={colCell}>{r.kg}</div>
        ))}
        <div style={colCellBold}>{supplier.totalKg}</div>
      </div>

      {/* Col 3 — אחוזים (flex-1 so it grows) */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
        <div style={colHead}>אחוזים</div>
        {supplier.rows.map((r, i) => (
          <div key={i} style={colCell}>{r.pct}</div>
        ))}
        <div style={colCellBold}>{supplier.totalPct}</div>
      </div>

      {/* Col 4 — פריטים (rightmost in LTR DOM = rightmost visually) */}
      <div style={{ display: "flex", flexDirection: "column", width: 78, flexShrink: 0 }}>
        <div style={{ ...colHead, textAlign: "right" }}>פריטים</div>
        {supplier.rows.map((r, i) => (
          <div key={i} style={colCell}>{r.item}</div>
        ))}
        <div style={colCellBold}>{supplier.totalOrders}</div>
      </div>

    </div>
  );
}

// ── Screen ──────────────────────────────────────────────────────────────────

export function FoodCostSupplierDetailsScreen() {
  const { supplierId } = useParams<{ supplierId: string }>();
  const navigate = useNavigate();
  const supplier = supplierId ? SUPPLIER_DETAILS[supplierId] : undefined;

  if (!supplier) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100svh", fontFamily: font, color: "#737373" }}>
        ספק לא נמצא
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      style={{ display: "flex", flexDirection: "column", minHeight: "100svh", background: "white", fontFamily: font }}
    >
      {/* iOS status bar */}
      <div style={{ height: 53, background: "white", flexShrink: 0 }} />

      {/* ── Header — back chevron on right, no bottom nav ─────────────────── */}
      <div
        dir="ltr"
        style={{
          background: "white",
          padding: "20px var(--page-horizontal-padding)",
          display: "flex",
          alignItems: "center",
          gap: 24,
          flexShrink: 0,
        }}
      >
        {/* Placeholder left (invisible) for centering */}
        <div style={{ width: 36, flexShrink: 0 }} />

        {/* CENTER: empty (title is in page body) */}
        <div style={{ flex: 1 }} />

        {/* RIGHT: back chevron */}
        <button
          onClick={() => navigate("/food-cost")}
          style={{
            width: 36, height: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer", flexShrink: 0,
          }}
          aria-label="חזרה"
        >
          <ChevronRight style={{ width: 20, height: 20, color: "#262626" }} />
        </button>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Page title */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 var(--page-horizontal-padding)", height: 36 }}>
          <p style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: "#262626", margin: 0 }}>
            {supplier.name}- ספק
          </p>
        </div>

        {/* Card with table */}
        <div style={{ padding: "10px var(--page-horizontal-padding) 20px" }}>
          <div
            style={{
              background: "white",
              border: "1px solid #e5e5e5",
              borderRadius: 10,
              boxShadow: "0px 1px 1px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            {/* Card caption */}
            <div style={{ padding: "24px 24px 0", height: 66, display: "flex", alignItems: "center" }}>
              <p style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: "#262626", margin: 0 }}>
                הזמנות
              </p>
            </div>

            {/* Table with 24px horizontal padding wrapper */}
            <div style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
              <OrdersTable supplier={supplier} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
