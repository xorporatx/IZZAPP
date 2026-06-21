import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, CircleUser, Store, Mail, FileOutput, ReceiptText, LogOut } from "lucide-react";

const font = '"Google Sans", sans-serif';

type SettingsListItemProps = {
  icon: React.ElementType;
  label: string;
  subtitle?: string;
  onClick?: () => void;
  danger?: boolean;
};

function SettingsListItem({ icon: Icon, label, subtitle, onClick, danger }: SettingsListItemProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 0",
        background: "none",
        border: "none",
        cursor: onClick ? "pointer" : "default",
      }}
      dir="ltr"
    >
      {/* LEFT: chevron in white circle */}
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "white",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {onClick && <ChevronLeft style={{ width: 16, height: 16, color: "#a3a3a3" }} />}
      </div>

      {/* CENTER: text */}
      <div style={{ flex: 1, textAlign: "right" }}>
        <p style={{
          fontFamily: font, fontSize: 14, fontWeight: 700,
          color: danger ? "#ef4444" : "#262626",
          margin: 0, lineHeight: "16px", letterSpacing: "-0.42px",
        }}>
          {label}
        </p>
        {subtitle && (
          <p style={{
            fontFamily: font, fontSize: 12, fontWeight: 400,
            color: "#262626", margin: "2px 0 0", lineHeight: "16px",
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* RIGHT: icon circle */}
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "#f5f5f5",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon style={{ width: 20, height: 20, color: danger ? "#ef4444" : "#262626" }} />
      </div>
    </button>
  );
}

export function SettingsScreen() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      style={{ display: "flex", flexDirection: "column", minHeight: "100svh", background: "white", fontFamily: font }}
    >
      {/* iOS status bar */}
      <div style={{ height: 53, background: "white", flexShrink: 0 }} />

      {/* Header with X */}
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
        {/* LEFT: X close button */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "#f5f5f5",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "none", cursor: "pointer", flexShrink: 0,
          }}
          aria-label="סגור"
        >
          <X style={{ width: 20, height: 20, color: "#262626" }} />
        </button>

        {/* CENTER: title */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <p style={{ fontFamily: font, fontSize: 18, fontWeight: 600, color: "#262626", margin: 0, lineHeight: "24px" }}>
            הגדרות
          </p>
        </div>

        {/* RIGHT: invisible spacer */}
        <div style={{ width: 36, flexShrink: 0 }} />
      </div>

      {/* List */}
      <div style={{ flex: 1, padding: "20px var(--page-horizontal-padding)" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SettingsListItem
            icon={CircleUser}
            label="פרופיל העסק"
            subtitle="הגדרות"
            onClick={() => navigate("/settings/business-profile")}
          />
          <SettingsListItem
            icon={Store}
            label="פרטי העסק"
            subtitle="שם, סוג, מטבע"
            onClick={() => navigate("/settings/business-details")}
          />
          <SettingsListItem
            icon={Mail}
            label="התראות"
            subtitle="פוש, מייל"
            onClick={() => navigate("/settings/notifications")}
          />
          <SettingsListItem
            icon={FileOutput}
            label="דוחות וייצוא"
            subtitle="PDF , CSV"
            onClick={() => navigate("/settings/export")}
          />
          <SettingsListItem
            icon={ReceiptText}
            label="קבלות"
            subtitle="קבלות ספקים להורדה"
            onClick={() => navigate("/receipts")}
          />
          <SettingsListItem
            icon={LogOut}
            label="התנתק"
            danger
          />
        </div>
      </div>
    </div>
  );
}
