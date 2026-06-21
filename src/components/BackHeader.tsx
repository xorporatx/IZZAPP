import { ChevronRight } from "lucide-react";

const font = '"Google Sans", sans-serif';

type BackHeaderProps = {
  onBack: () => void;
  title: string;
  subtitle?: string;
};

export function BackHeader({ onBack, title, subtitle }: BackHeaderProps) {
  return (
    <>
      {/* iOS status bar */}
      <div style={{ height: 53, background: "white", flexShrink: 0 }} />

      {/* Header row */}
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
        <div style={{ width: 36, flexShrink: 0 }} />
        <div style={{ flex: 1 }} />
        <button
          onClick={onBack}
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

      {/* Title + subtitle */}
      <div
        style={{
          borderBottom: "1px solid #e5e5e5",
          paddingBottom: 20,
          paddingLeft: "var(--page-horizontal-padding)",
          paddingRight: "var(--page-horizontal-padding)",
          flexShrink: 0,
        }}
        dir="rtl"
      >
        <p style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: "#262626", margin: 0, lineHeight: "28px", textAlign: "right" }}>
          {title}
        </p>
        {subtitle && (
          <p style={{ fontFamily: font, fontSize: 14, fontWeight: 400, color: "#737373", margin: "3px 0 0", lineHeight: "20px", textAlign: "right" }}>
            {subtitle}
          </p>
        )}
      </div>
    </>
  );
}
