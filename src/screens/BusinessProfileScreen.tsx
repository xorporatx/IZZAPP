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

export function BusinessProfileScreen() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      style={{ display: "flex", flexDirection: "column", minHeight: "100svh", background: "white", fontFamily: font }}
    >
      <BackHeader
        onBack={() => navigate("/settings")}
        title="פרופיל העסק"
        subtitle="ניהול בעלי החשבון וההרשאות."
      />

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px var(--page-horizontal-padding) 40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Input placeholder="שם בעל העסק" />

          {/* Profile photo upload */}
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
              לחץ להעלאת תמונת פרופיל
            </p>
          </div>

          <Input placeholder="אימייל" />
          <Input placeholder="טלפון" />
          <Input placeholder="תפקיד (בעלים / מנהל / רואה חשבון)" />
          <Input placeholder="שינוי סיסמה" />
        </div>
      </div>
    </div>
  );
}
