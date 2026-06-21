import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, BellDot, Menu, Calendar, ChevronLeft, AlertCircle } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { SideMenuDrawer } from "@/components/SideMenuDrawer";

// TODO: Replace mock random dashboard values with real API data

type DashboardRange = "היום" | "השבוע" | "החודש" | "12 חודשים";

type KpiData = {
  value: string;
  subtitle: string;
  valueColor?: string;
  subtitleColor?: string;
};

type DashboardData = {
  accumulatedSales: KpiData;
  currentProfit: KpiData;
  foodCost: KpiData;
  laborCost: KpiData;
  fixedExpenses: KpiData;
  variableExpenses: KpiData;
};

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatILS(n: number) {
  return `₪${n.toLocaleString("he-IL")}`;
}

function generateDashboardMockData(range: DashboardRange): DashboardData {
  const multipliers: Record<DashboardRange, number> = {
    "היום": 1,
    "השבוע": 7,
    "החודש": 30,
    "12 חודשים": 365,
  };
  const m = multipliers[range];
  const sales = rand(800, 2000) * m;
  const profitPct = rand(8, 18);
  const profit = Math.floor(sales * (profitPct / 100));
  const foodCostPct = rand(28, 42);
  const laborCostPct = rand(28, 45);
  const fixed = rand(4000, 6000) * Math.max(1, Math.ceil(m / 30));
  const variable = rand(400, 900) * Math.max(1, Math.ceil(m / 7));
  const salesGoal = range === "היום" ? "1.5K₪" : range === "השבוע" ? "10K₪" : range === "החודש" ? "120K₪" : "1.4M₪";
  const foodOk = foodCostPct <= 32;
  const laborOk = laborCostPct <= 32;

  return {
    accumulatedSales: {
      value: formatILS(sales),
      subtitle: `צפי / יעד ${salesGoal}`,
    },
    currentProfit: {
      value: formatILS(profit),
      subtitle: `${profitPct}% רווחיות`,
      valueColor: "#059669",
    },
    foodCost: {
      value: `${foodCostPct}%`,
      subtitle: foodOk ? "תקין — יעד 32%" : "חריגה — יעד 32%",
      valueColor: foodOk ? "#262626" : "#dc2626",
      subtitleColor: foodOk ? "#059669" : "#dc2626",
    },
    laborCost: {
      value: `${laborCostPct}%`,
      subtitle: "יעד — 32% לחץ לפירוט",
      valueColor: laborOk ? "#059669" : "#dc2626",
    },
    fixedExpenses: {
      value: formatILS(fixed),
      subtitle: `${rand(1, 5)}% יותר`,
    },
    variableExpenses: {
      value: formatILS(variable),
      subtitle: `${rand(2, 8)} הוצאות החודש`,
    },
  };
}

// ── Shared layout helpers ─────────────────────────────────────────────────────
// All layout rows use dir="ltr" with explicit left/right regions so RTL text
// content is preserved while visual placement matches Figma exactly.

const row: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
};

// ── KPI Card ─────────────────────────────────────────────────────────────────
// Figma: RIGHT = title + subtitle  |  LEFT = value (+ chevron if tappable)

type KpiCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  subtitleColor?: string;
  valueColor?: string;
  tappable?: boolean;
  onClick?: () => void;
};

function KpiCard({ title, value, subtitle, subtitleColor = "#737373", valueColor = "#262626", tappable = false, onClick }: KpiCardProps) {
  return (
    // dir="ltr" so we control left/right explicitly
    <div
      dir="ltr"
      onClick={onClick}
      style={{
        background: "white",
        borderRadius: 10,
        border: "1px solid #f9fafb",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)",
        padding: "0 16px",
        height: 62,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: tappable ? "pointer" : "default",
        width: "100%",
      }}
    >
      {/* LEFT side: value + chevron */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {tappable && <ChevronLeft style={{ width: 17, height: 17, color: "#737373", flexShrink: 0 }} />}
        <span style={{ fontFamily: '"Google Sans"', fontSize: 20, fontWeight: 600, color: valueColor, lineHeight: "28px" }}>
          {value}
        </span>
      </div>

      {/* RIGHT side: title + subtitle (text is RTL) */}
      <div dir="rtl" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
        <span style={{ fontFamily: '"Google Sans"', fontSize: 14, fontWeight: 600, color: "#262626", lineHeight: "18px", whiteSpace: "nowrap" }}>
          {title}
        </span>
        {subtitle && (
          <span style={{ fontFamily: '"Google Sans"', fontSize: 12, fontWeight: 400, color: subtitleColor, lineHeight: "16px", whiteSpace: "nowrap" }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
// Figma: RIGHT = "המלצות" title  |  LEFT = "הכל" + chevron

function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <div dir="ltr" style={{ ...row, marginBottom: 8 }}>
      {/* LEFT: הכל + chevron */}
      <button
        onClick={onSeeAll}
        style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: "8px 0" }}
      >
        <ChevronLeft style={{ width: 16, height: 16, color: "#262626" }} />
        <span style={{ fontFamily: '"Google Sans"', fontSize: 12, fontWeight: 700, color: "#262626", letterSpacing: "-1px" }}>הכל</span>
      </button>

      {/* RIGHT: section title */}
      <span dir="rtl" style={{ fontFamily: '"Google Sans"', fontSize: 12, fontWeight: 700, color: "#a3a3a3", letterSpacing: "-1px" }}>
        {title}
      </span>
    </div>
  );
}

// ── Insight Card ──────────────────────────────────────────────────────────────
// Figma: badge icon on LEFT  |  text block (title + description) on RIGHT

type InsightCardProps = {
  priority: "urgent" | "warning" | "info";
  title: string;
  description: string;
  reason: string;
  action: string;
  onDismiss?: () => void;
};

function InsightCard({ title, description, reason, action, onDismiss }: InsightCardProps) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 10,
        border: "1px solid #f9fafb",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.1)",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
      }}
    >
      {/* Header row: dir="ltr" → badge LEFT, text RIGHT */}
      <div dir="ltr" style={{ display: "flex", alignItems: "center", gap: 16, width: "100%" }}>
        {/* LEFT: dismiss badge */}
        <button
          onClick={onDismiss}
          style={{
            width: 36, height: 36,
            borderRadius: "50%",
            background: "#fee2e2",
            border: "2px solid white",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0,
          }}
          aria-label="Dismiss"
        >
          <AlertCircle style={{ width: 16, height: 16, color: "#dc2626" }} />
        </button>

        {/* RIGHT: title + description (RTL text) */}
        <div dir="rtl" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontFamily: '"Google Sans"', fontSize: 12, fontWeight: 700, color: "#262626", letterSpacing: "-0.36px" }}>
            {title}
          </span>
          <p style={{ fontFamily: '"Google Sans"', fontSize: 12, color: "#737373", lineHeight: "16px", margin: 0 }}>
            {description}
          </p>
        </div>
      </div>

      {/* Reason block — RTL content */}
      <div dir="rtl" style={{ background: "#fafafa", borderRadius: 6, padding: "10px 20px" }}>
        <p style={{ fontFamily: '"Google Sans"', fontSize: 12, fontWeight: 500, color: "#737373", lineHeight: "16px", margin: 0 }}>הסיבה</p>
        <p style={{ fontFamily: '"Google Sans"', fontSize: 12, color: "#262626", lineHeight: "16px", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {reason}
        </p>
      </div>

      {/* Action block — RTL content */}
      <div dir="rtl" style={{ background: "#f7fee7", borderRadius: 6, padding: "10px 20px" }}>
        <p style={{ fontFamily: '"Google Sans"', fontSize: 12, fontWeight: 500, color: "#737373", lineHeight: "16px", margin: 0 }}>מה לעשות</p>
        <p style={{ fontFamily: '"Google Sans"', fontSize: 12, color: "#262626", lineHeight: "16px", margin: 0 }}>
          {action}
        </p>
      </div>
    </div>
  );
}

// ── Date range tabs ───────────────────────────────────────────────────────────
// Figma order RIGHT→LEFT: היום | השבוע | החודש | 12 חודשים | 📅

const DATE_TABS = ["היום", "השבוע", "החודש", "12 חודשים"];

// ── Main Screen ───────────────────────────────────────────────────────────────

export function DashboardScreen() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardRange>("השבוע");
  const [dashData, setDashData] = useState<DashboardData>(() => generateDashboardMockData("השבוע"));

  function handleTabChange(tab: DashboardRange) {
    setActiveTab(tab);
    setDashData(generateDashboardMockData(tab));
  }

  const [insights, setInsights] = useState([
    {
      id: 1,
      priority: "urgent" as const,
      title: "דחוף",
      description: "5 מוצרים יפוגו ב-48 השעות הקרובות",
      reason: "מוצרי חלב וירקות עלים...",
      action: "הריצו מבצע מהיר או עדכנו תפריט יומי",
    },
  ]);

  return (
    <div dir="rtl" className="flex min-h-svh flex-col" style={{ background: "var(--base/card, white)" }}>
      {/* Status bar */}
      <div className="h-[53px] bg-white" />

      {/* ── Header ───────────────────────────────────────────────────────────
           Figma: RIGHT = camera + bell  |  CENTER = greeting  |  LEFT = menu
           dir="ltr" → first child LEFT, last child RIGHT in DOM = explicit control */}
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
          <p style={{ fontFamily: '"Google Sans"', fontSize: 12, fontWeight: 700, color: "#262626", letterSpacing: "-0.36px", lineHeight: "16px", margin: 0 }}>
            שלום אור,
          </p>
          <p style={{ fontFamily: '"Google Sans"', fontSize: 12, fontWeight: 400, color: "#737373", lineHeight: "16px", margin: 0 }}>
            ג׳פניקה סניף אריאל
          </p>
        </div>

        {/* RIGHT: camera */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Camera / logo */}
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
      </div>

      {/* ── Date range switcher ───────────────────────────────────────────────
           Figma (right→left): Calendar | היום | השבוע | החודש | 12 חודשים
           dir="ltr": tabs left, calendar pinned to far right via marginLeft:auto */}
      <div
        dir="ltr"
        style={{ background: "white", padding: "0 var(--page-horizontal-padding) 12px", display: "flex", alignItems: "center", gap: 10 }}
      >
        {/* LEFT side: tabs — DOM order 12חודשים→היום so visually rightmost = היום */}
        <div style={{ display: "flex", gap: 4 }}>
          {[...DATE_TABS].reverse().map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab as DashboardRange)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: '"Google Sans"',
                  fontSize: 14,
                  fontWeight: 500,
                  background: isActive ? "#047857" : "transparent",
                  color: isActive ? "white" : "#262626",
                  boxShadow: isActive ? "0px 1px 2px rgba(0,0,0,0.1)" : "none",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* RIGHT side: calendar icon pinned far right */}
        <button
          style={{
            width: 36, height: 36, borderRadius: 8, border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", cursor: "pointer",
            boxShadow: "0px 1px 1px rgba(0,0,0,0.05)",
            flexShrink: 0,
            marginLeft: "auto",
          }}
          aria-label="Custom date range"
        >
          <Calendar style={{ width: 16, height: 16, color: "#262626" }} />
        </button>
      </div>

      {/* ── Scrollable content ────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px var(--page-horizontal-padding)", paddingBottom: "calc(96px + env(safe-area-inset-bottom, 0px))" }}>

        {/* KPI cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          <KpiCard title="מכירות מצטברות" {...dashData.accumulatedSales} />
          <KpiCard title="רווח עדכני"      {...dashData.currentProfit} />
          <KpiCard title="פוד קוסט"        {...dashData.foodCost} tappable />
          <KpiCard title="ליבור קוסט"      {...dashData.laborCost} tappable onClick={() => navigate("/labor-cost")} />
          <KpiCard title="הוצאות קבועות"  {...dashData.fixedExpenses} tappable onClick={() => navigate("/expenses")} />
          <KpiCard title="הוצאות משתנות"  {...dashData.variableExpenses} tappable />
        </div>

        {/* Insights section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SectionHeader title="המלצות" onSeeAll={() => {}} />
          {insights.map((insight) => (
            <InsightCard
              key={insight.id}
              {...insight}
              onDismiss={() => setInsights((prev) => prev.filter((i) => i.id !== insight.id))}
            />
          ))}

          {/* Second placeholder section */}
          <div style={{ marginTop: 16 }}>
            <SectionHeader title="המלצות" onSeeAll={() => {}} />
            <div style={{
              background: "white",
              borderRadius: 10,
              border: "1px solid #f9fafb",
              boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
              height: 100,
            }} />
          </div>
        </div>
      </div>

      <BottomNav />
      <SideMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
