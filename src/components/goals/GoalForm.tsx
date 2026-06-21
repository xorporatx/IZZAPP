import { useState } from "react";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import type { Goal, GoalType } from "./GoalCard";

const font = '"Google Sans", sans-serif';

const GOAL_TYPES: { value: GoalType; label: string }[] = [
  { value: "income",  label: "הכנסות" },
  { value: "labor",   label: "עלויות עובדים" },
  { value: "expense", label: "הוצאות כלליות" },
  { value: "sales",   label: "מכירות" },
];

const inputRow: React.CSSProperties = {
  width: "100%", height: 36,
  border: "1px solid #e5e5e5", borderRadius: 8,
  background: "white", boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
  display: "flex", alignItems: "center", gap: 4,
  padding: "4px 12px", boxSizing: "border-box",
};

const baseInput: React.CSSProperties = {
  flex: 1, background: "none", border: "none", outline: "none",
  fontFamily: font, fontSize: 14, color: "#262626",
  textAlign: "right", direction: "rtl",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: "#262626", textAlign: "right", display: "block" }}>
        {label}
      </span>
      {children}
    </div>
  );
}

export function GoalForm({ onSave }: { onSave: (goal: Goal) => void }) {
  const [type, setType] = useState<GoalType | "">("");
  const [percent, setPercent] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");

  const valid = type !== "" && (Number(percent) > 0 || Number(quantity) > 0 || Number(amount) > 0);

  function handleSave() {
    if (!valid) return;
    onSave({
      id: crypto.randomUUID(),
      type: type as GoalType,
      goalPercent: Number(percent) || 0,
      goalQuantity: Number(quantity) || 0,
      goalAmount: Number(amount) || 0,
      currentValue: 0,
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ flex: 1, padding: "0 16px", display: "flex", flexDirection: "column", gap: 16, paddingTop: 16 }}>
        {/* Type dropdown */}
        <Field label="ספק/פרט">
          <div style={{ ...inputRow, position: "relative" }}>
            <ChevronDown style={{ width: 16, height: 16, color: "#737373", flexShrink: 0 }} />
            <select
              value={type}
              onChange={e => setType(e.target.value as GoalType)}
              style={{ ...baseInput, appearance: "none", cursor: "pointer", color: type ? "#262626" : "#737373" }}
            >
              <option value="" disabled>בחר סוג יעד</option>
              {GOAL_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        </Field>

        <Field label="יעד מקסימום (%)">
          <div style={inputRow}>
            <ChevronsUpDown style={{ width: 16, height: 16, color: "#737373", flexShrink: 0 }} />
            <input type="number" min={0} value={percent} onChange={e => setPercent(e.target.value)} placeholder="0" style={baseInput} />
          </div>
        </Field>

        <Field label="יעד מקסימום (כמות)">
          <div style={inputRow}>
            <ChevronsUpDown style={{ width: 16, height: 16, color: "#737373", flexShrink: 0 }} />
            <input type="number" min={0} value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="0" style={baseInput} />
          </div>
        </Field>

        <Field label="יעד מקסימום (₪)">
          <div style={inputRow}>
            <ChevronsUpDown style={{ width: 16, height: 16, color: "#737373", flexShrink: 0 }} />
            <input type="number" min={0} value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" style={baseInput} />
          </div>
        </Field>
      </div>

      {/* Sticky save button */}
      <div style={{ padding: 16, paddingBottom: 22, flexShrink: 0 }}>
        <button
          onClick={handleSave}
          disabled={!valid}
          style={{
            width: "100%", height: 40,
            background: valid ? "#059669" : "#d4d4d4",
            border: "none", borderRadius: 8,
            color: "white", fontFamily: font, fontSize: 14, fontWeight: 600,
            cursor: valid ? "pointer" : "default",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          הגדר יעד
        </button>
      </div>
    </div>
  );
}
