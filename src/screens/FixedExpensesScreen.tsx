import { useState } from "react";
import { Camera, Menu } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { SideMenuDrawer } from "@/components/SideMenuDrawer";
import { EditFixedExpensesDrawer, type FixedExpense } from "@/components/EditFixedExpensesDrawer";

const font = '"Google Sans", sans-serif';

const INITIAL_EXPENSES: FixedExpense[] = [
  { id: "rent",            category: "שכירות",          amount: 4775  },
  { id: "insurance",       category: "ביטוח",            amount: 5125  },
  { id: "arnona",          category: "ארנונה",           amount: 4450  },
  { id: "comm",            category: "תקשורת",           amount: 3550  },
  { id: "accountant",      category: "רואה חשבון",       amount: 3550  },
  { id: "extermination",   category: "הדברה",            amount: 4775  },
  { id: "kashrut",         category: "כשרות",            amount: 5125  },
  { id: "marketing",       category: "שיווק",            amount: 4450  },
  { id: "scent",           category: "שירותי ריח",       amount: 3550  },
  { id: "foreign-workers", category: "שכד עובדים זרים",  amount: 3550  },
  { id: "security",        category: "שמירה",            amount: 4775  },
  { id: "office",          category: "שרותי משרד",       amount: 5125  },
];

function formatILS(n: number) {
  return `₪${n.toLocaleString("he-IL")}`;
}

type Tab = "fixed" | "variable";

export function FixedExpensesScreen() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [activeTab,   setActiveTab]   = useState<Tab>("fixed");
  const [expenses,    setExpenses]    = useState<FixedExpense[]>(INITIAL_EXPENSES);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div dir="rtl" style={{ display: "flex", flexDirection: "column", minHeight: "100svh", background: "white", fontFamily: font }}>

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

        {/* RIGHT: camera */}
        <button
          style={{
            width: 36, height: 36, borderRadius: 8,
            background: "#d9f99d",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "none", cursor: "pointer", flexShrink: 0,
            boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
          }}
          aria-label="Logo"
        >
          <Camera style={{ width: 16, height: 16, color: "#262626" }} />
        </button>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────────── */}
      <div
        dir="ltr"
        style={{
          height: 59,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 var(--page-horizontal-padding)",
          flexShrink: 0,
        }}
      >
        {/* LTR order → הוצאות משתנות LEFT, הוצאות קבועות RIGHT */}
        <button
          onClick={() => setActiveTab("variable")}
          style={{
            flex: "1 0 auto",
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontFamily: font,
            fontSize: 14,
            fontWeight: 500,
            background: activeTab === "variable" ? "#ecfccb" : "transparent",
            color: activeTab === "variable" ? "#047857" : "#262626",
            whiteSpace: "nowrap",
          }}
        >
          הוצאות משתנות
        </button>
        <button
          onClick={() => setActiveTab("fixed")}
          style={{
            flex: "1 0 auto",
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontFamily: font,
            fontSize: 14,
            fontWeight: 500,
            background: activeTab === "fixed" ? "#ecfccb" : "transparent",
            color: activeTab === "fixed" ? "#047857" : "#262626",
            whiteSpace: "nowrap",
          }}
        >
          הוצאות קבועות
        </button>
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
        }}
      >
        {activeTab === "fixed" && (
          <div
            style={{
              background: "white",
              border: "1px solid #e5e5e5",
              borderRadius: 10,
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            {/* Table caption row */}
            <div
              dir="ltr"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 16px 0",
                marginBottom: 16,
              }}
            >
              {/* LEFT: ערוך button */}
              <button
                onClick={() => setDrawerOpen(true)}
                style={{
                  height: 36,
                  padding: "0 16px",
                  background: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontFamily: font,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                ערוך
              </button>

              {/* RIGHT: section title */}
              <span dir="rtl" style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: "#262626" }}>
                הוצאות קבועות
              </span>
            </div>

            {/* Table content — single 24px horizontal padding wrapper */}
            <div style={{ paddingLeft: 24, paddingRight: 24 }}>

              {/* Column headers */}
              <div
                dir="ltr"
                style={{
                  display: "flex",
                  borderBottom: "1px solid #e5e5e5",
                  height: 40,
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1, fontFamily: font, fontSize: 14, fontWeight: 500, color: "#737373", textAlign: "left" }}>
                  עלות
                </div>
                <div style={{ flex: 1, fontFamily: font, fontSize: 14, fontWeight: 500, color: "#737373", textAlign: "right" }}>
                  סוג
                </div>
              </div>

              {/* Data rows */}
              {expenses.map((expense, idx) => (
                <div
                  key={expense.id}
                  dir="ltr"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 52,
                    borderBottom: idx < expenses.length - 1 ? "1px solid #e5e5e5" : "none",
                  }}
                >
                  <div style={{ flex: 1, fontFamily: font, fontSize: 14, color: "#262626", textAlign: "left" }}>
                    {formatILS(expense.amount)}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      fontFamily: font,
                      fontSize: 14,
                      color: "#262626",
                      textAlign: "right",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {expense.category}
                  </div>
                </div>
              ))}

              {/* Total row */}
              <div
                dir="ltr"
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 52,
                  borderTop: "1px solid #e5e5e5",
                }}
              >
                <div style={{ flex: 1, fontFamily: font, fontSize: 14, fontWeight: 700, color: "#262626", textAlign: "left" }}>
                  {formatILS(total)}
                </div>
                <div style={{ flex: 1, fontFamily: font, fontSize: 14, fontWeight: 700, color: "#262626", textAlign: "right" }}>
                  סה״כ קבוע
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === "variable" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 200,
              color: "#737373",
              fontFamily: font,
              fontSize: 14,
            }}
          >
            הוצאות משתנות — בקרוב
          </div>
        )}
      </div>

      <BottomNav />
      <SideMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <EditFixedExpensesDrawer
        open={drawerOpen}
        expenses={expenses}
        onSave={setExpenses}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
