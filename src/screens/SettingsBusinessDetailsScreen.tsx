import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackHeader } from "@/components/BackHeader";

// TODO: Replace local state with API data

const font = '"Google Sans", sans-serif';

function Input({ placeholder }: { placeholder: string }) {
  return (
    <input
      placeholder={placeholder}
      dir="rtl"
      style={{
        width: "100%",
        height: 40,
        border: "1px solid #e5e5e5",
        borderRadius: 8,
        background: "white",
        fontFamily: font,
        fontSize: 14,
        color: "#262626",
        padding: "0 12px",
        boxSizing: "border-box",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        outline: "none",
      }}
    />
  );
}

export function SettingsBusinessDetailsScreen() {
  const navigate = useNavigate();
  const [multiBranch, setMultiBranch] = useState(false);

  return (
    <div
      dir="rtl"
      style={{ display: "flex", flexDirection: "column", minHeight: "100svh", background: "white", fontFamily: font }}
    >
      <BackHeader
        onBack={() => navigate("/settings")}
        title="פרטי העסק"
        subtitle="כל המידע הבסיסי על העסק."
      />

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px var(--page-horizontal-padding) 40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Input placeholder="שם העסק" />
          <Input placeholder='שם חברה בע"מ' />
          <Input placeholder="מספר ח.פ / עוסק" />
          <Input placeholder="סוג העסק (מסעדה, בית קפה, בר וכו׳)" />
          <Input placeholder="כתובת" />

          {/* Multi-branch toggle */}
          <div
            style={{
              background: "#f7fee7",
              borderRadius: 16,
              padding: 24,
              display: "flex",
              alignItems: "center",
              gap: 13,
            }}
            dir="ltr"
          >
            {/* Toggle */}
            <button
              onClick={() => setMultiBranch(v => !v)}
              style={{
                width: 47,
                height: 26,
                borderRadius: 9999,
                background: multiBranch ? "#065f46" : "#e5e5e5",
                border: "none",
                cursor: "pointer",
                position: "relative",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
              role="switch"
              aria-checked={multiBranch}
            >
              <div style={{
                position: "absolute",
                top: 3,
                left: multiBranch ? 24 : 3,
                width: 20, height: 20,
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                transition: "left 0.2s",
              }} />
            </button>

            {/* Text */}
            <div style={{ flex: 1, textAlign: "right" }}>
              <p style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: "#262626", margin: 0 }}>
                מספר סניפים
              </p>
              <p style={{ fontFamily: font, fontSize: 14, fontWeight: 400, color: "#737373", margin: "2px 0 0" }}>
                יש לי יותר מסניף אחד
              </p>
            </div>
          </div>

          {/* Logo upload */}
          <div
            style={{
              background: "#fafafa",
              border: "1px dashed #e5e5e5",
              borderRadius: 16,
              height: 76,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 13,
              cursor: "pointer",
            }}
            dir="ltr"
          >
            <div style={{
              width: 50, height: 36,
              background: "#e5e5e5",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 18, color: "#a3a3a3" }}>🖼</span>
            </div>
            <p style={{ fontFamily: font, fontSize: 14, fontWeight: 400, color: "#737373", margin: 0, textAlign: "right" }}>
              לחץ להעלאת לוגו עסקי
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
