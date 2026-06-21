import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackHeader } from "@/components/BackHeader";
import { Check } from "lucide-react";

// TODO: Replace local state with API-persisted preferences

const font = '"Google Sans", sans-serif';

const NOTIFICATION_ITEMS = [
  { id: "push",         label: "התראות Push" },
  { id: "email",        label: "התראות במייל" },
  { id: "daily",        label: "דוח יומי" },
  { id: "weekly",       label: "דוח שבועי" },
  { id: "monthly",      label: "דוח חודשי" },
  { id: "food_excess",  label: "חריגה בעלות מזון" },
  { id: "labor_excess", label: "חריגה בעלות עובדים" },
  { id: "profit_drop",  label: "ירידה ברווח" },
  { id: "inventory",    label: "זליגת מלאי" },
  { id: "expiry",       label: "פגי תוקף מתקרבים" },
  { id: "ai",           label: "תובנות AI חדשות" },
];

function CheckboxRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 16, width: "100%" }}
      dir="ltr"
    >
      {/* Checkbox */}
      <button
        onClick={onChange}
        style={{
          width: 22, height: 22,
          borderRadius: 4,
          background: checked ? "#171717" : "white",
          border: `1.5px solid ${checked ? "#171717" : "#d4d4d4"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          cursor: "pointer",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
        aria-checked={checked}
        role="checkbox"
      >
        {checked && <Check style={{ width: 14, height: 14, color: "white", strokeWidth: 2.5 }} />}
      </button>

      {/* Label (on right in RTL display) */}
      <div style={{ flex: 1, textAlign: "right" }}>
        <p style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: "#0a0a0a", margin: 0, lineHeight: "20px" }}>
          {label}
        </p>
      </div>
    </div>
  );
}

export function NotificationsScreen() {
  const navigate = useNavigate();

  const initialState = Object.fromEntries(NOTIFICATION_ITEMS.map(i => [i.id, true]));
  const [checked, setChecked] = useState<Record<string, boolean>>(initialState);

  function toggle(id: string) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div
      dir="rtl"
      style={{ display: "flex", flexDirection: "column", minHeight: "100svh", background: "white", fontFamily: font }}
    >
      <BackHeader
        onBack={() => navigate("/settings")}
        title="התראות"
        subtitle="לקבוע אילו התראות מתקבלות."
      />

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px var(--page-horizontal-padding) 40px",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid #e5e5e5",
            paddingBottom: 20,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {NOTIFICATION_ITEMS.map(item => (
            <CheckboxRow
              key={item.id}
              label={item.label}
              checked={checked[item.id]}
              onChange={() => toggle(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
