import { useNavigate } from "react-router-dom";
import { ArrowDown, Calendar, Download } from "lucide-react";
import { BackHeader } from "@/components/BackHeader";

// TODO: Replace mock data with API data

const font = '"Google Sans", sans-serif';

const REPORTS = [
  { name: "דוח רווח והפסד", date: "12/12/2026" },
  { name: "דוח עלות מזון",  date: "12/12/2026" },
  { name: "דוח עלות עובדים", date: "12/12/2026" },
  { name: "דוח מלאי",       date: "12/12/2026" },
  { name: "דוח מכירות",     date: "12/12/2026" },
];

function DownloadRow({ name, date }: { name: string; date: string }) {
  const cell: React.CSSProperties = {
    height: 72,
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #e5e5e5",
    padding: "0 8px",
    flexShrink: 0,
  };
  const text: React.CSSProperties = {
    fontFamily: font, fontSize: 14, fontWeight: 500,
    color: "#262626", whiteSpace: "nowrap",
    overflow: "hidden", textOverflow: "ellipsis",
  };

  return (
    <div dir="ltr" style={{ display: "flex", width: "100%" }}>
      {/* Download button column — leftmost */}
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

      {/* Date column */}
      <div style={{ ...cell, flex: 1, justifyContent: "flex-end" }}>
        <span style={{ ...text, textAlign: "right" }}>{date}</span>
      </div>

      {/* Name column — rightmost */}
      <div style={{ ...cell, flex: 1, justifyContent: "flex-end" }}>
        <span style={{ ...text, textAlign: "right" }}>{name}</span>
      </div>
    </div>
  );
}

export function ExportReportsScreen() {
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
    color: "#737373", textAlign: "right",
  };

  return (
    <div
      dir="rtl"
      style={{ display: "flex", flexDirection: "column", minHeight: "100svh", background: "white", fontFamily: font }}
    >
      <BackHeader
        onBack={() => navigate("/settings")}
        title="דוחות וייצוא"
        subtitle="הורדת מידע וייצוא למערכות אחרות."
      />

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 var(--page-horizontal-padding) 40px" }}>
        {/* Action row */}
        <div
          dir="ltr"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0 0" }}
        >
          {/* LEFT: buttons */}
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
              הורד הכל
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

          {/* RIGHT: section label */}
          <span style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: "#262626" }}>
            דוחות
          </span>
        </div>

        {/* Table */}
        <div style={{ marginTop: 0 }}>
          {/* Header row */}
          <div dir="ltr" style={{ display: "flex", width: "100%" }}>
            <div style={{ ...headCell, width: 60 }} />
            <div style={{ ...headCell, flex: 1 }}>
              <span style={{ ...headText, width: "100%" }}>תאריך</span>
            </div>
            <div style={{ ...headCell, flex: 1 }}>
              <span style={{ ...headText, width: "100%" }}>שם קבלה</span>
            </div>
          </div>

          {REPORTS.map((r) => (
            <DownloadRow key={r.name} name={r.name} date={r.date} />
          ))}
        </div>
      </div>
    </div>
  );
}
