import { useState, useRef, useCallback, useEffect } from "react";
import {
  Menu, Upload, FileText, Users, BarChart2,
  BookOpen, ScanLine, CheckCircle, Sparkles, Play,
} from "lucide-react";
import { SideMenuDrawer } from "@/components/SideMenuDrawer";

// TODO: Replace all mock processing with real API calls:
//   POST /api/uploads/:category  →  returns jobId
//   GET  /api/jobs/:jobId/status →  polls until complete
//   POST /api/dashboards/refresh →  triggers KPI recalculation
//
// Business Rule: after any successful upload, refresh ALL relevant
// dashboards, KPIs, AI insights, alerts, and benchmarks automatically.

const font = '"Google Sans", sans-serif';
const GREEN = "#059669";
const GREEN_BG = "#ecfdf5";

// ── Types ────────────────────────────────────────────────────────────────────

type ProcessingState = "idle" | "uploading" | "analyzing" | "importing" | "completed" | "error";

type UploadEntry = {
  file?: File;
  status: ProcessingState;
  uploadedAt?: Date;
  recordsImported?: number;
};

type UploadMap = {
  suppliers: UploadEntry;
  employees: UploadEntry;
  sales: UploadEntry;
  menuPricing: UploadEntry;
  recipes: UploadEntry;
  receipts: UploadEntry;
};

const INIT: UploadEntry = { status: "idle" };

const STEP_LABELS: Record<ProcessingState, string> = {
  idle: "לא הועלה",
  uploading: "מעלה קובץ...",
  analyzing: "מנתח עם AI...",
  importing: "מייבא נתונים...",
  completed: "הועלה בהצלחה",
  error: "שגיאה בהעלאה",
};

function sleep(ms: number) { return new Promise<void>(r => setTimeout(r, ms)); }
function randomRecords(min = 40, max = 280) { return Math.floor(Math.random() * (max - min)) + min; }

const CSS_PULSE = `
@keyframes izz-dot-pulse {
  0%,100% { opacity: 0.25; transform: scale(0.75); }
  50%      { opacity: 1;    transform: scale(1);    }
}
@keyframes izz-spin { to { transform: rotate(360deg); } }
`;

function useGlobalStyle(css: string) {
  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = css;
    document.head.appendChild(tag);
    return () => { document.head.removeChild(tag); };
  }, []);
}

// ── StatusLabel ───────────────────────────────────────────────────────────────

function StatusLabel({ entry }: { entry: UploadEntry }) {
  if (entry.status === "idle") {
    return <span style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: "#a3a3a3" }}>לא הועלה</span>;
  }
  if (entry.status === "completed") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <CheckCircle style={{ width: 12, height: 12, color: GREEN, flexShrink: 0 }} />
        <span style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: GREEN }}>
          {entry.recordsImported?.toLocaleString("he-IL")} רשומות
        </span>
      </div>
    );
  }
  if (entry.status === "error") {
    return <span style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: "#ef4444" }}>שגיאה</span>;
  }
  return <span style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: "#f59e0b" }}>{STEP_LABELS[entry.status]}</span>;
}

// ── ProcessingDots ────────────────────────────────────────────────────────────

function ProcessingDots({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", gap: 5 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: "50%", background: GREEN,
            animation: `izz-dot-pulse 1s ease-in-out ${i * 0.22}s infinite`,
          }} />
        ))}
      </div>
      <p style={{ fontFamily: font, fontSize: 12, color: "#737373", margin: 0 }}>{label}</p>
    </div>
  );
}

// ── UploadDropzone ────────────────────────────────────────────────────────────

type DropzoneProps = {
  label: string;
  accept?: string;
  icon?: React.ElementType;
  entry: UploadEntry;
  onFile: (f: File) => void;
  compact?: boolean;
};

function UploadDropzone({
  label, accept = ".pdf,.xlsx,.xls,.csv,.png,.jpg,.jpeg",
  icon: Icon = Upload, entry, onFile, compact,
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const pick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { onFile(f); e.target.value = ""; }
  }, [onFile]);

  const drop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }, [onFile]);

  const h = compact ? 58 : 76;
  const isProcessing = ["uploading", "analyzing", "importing"].includes(entry.status);

  if (isProcessing) {
    return (
      <div style={{
        height: h, border: "1.5px dashed #d4d4d4", borderRadius: 8,
        background: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <ProcessingDots label={STEP_LABELS[entry.status]} />
      </div>
    );
  }

  if (entry.status === "completed") {
    return (
      <div onClick={() => inputRef.current?.click()} style={{
        height: h, border: `1.5px solid ${GREEN}`, borderRadius: 8,
        background: GREEN_BG, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 10, cursor: "pointer",
      }}>
        <input ref={inputRef} type="file" accept={accept} style={{ display: "none" }} onChange={pick} />
        <CheckCircle style={{ width: 18, height: 18, color: GREEN, flexShrink: 0 }} />
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: GREEN, margin: 0 }}>{entry.file?.name}</p>
          <p style={{ fontFamily: font, fontSize: 11, color: GREEN, margin: 0, opacity: 0.8 }}>לחץ להחלפה</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={drop}
      onClick={() => inputRef.current?.click()}
      style={{
        height: h,
        border: `1.5px dashed ${dragging ? GREEN : "#d4d4d4"}`,
        borderRadius: 8,
        background: dragging ? GREEN_BG : "#fafafa",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 5,
        cursor: "pointer", transition: "all 0.15s ease",
      }}
    >
      <input ref={inputRef} type="file" accept={accept} style={{ display: "none" }} onChange={pick} />
      <Icon style={{ width: 16, height: 16, color: dragging ? GREEN : "#a3a3a3", flexShrink: 0 }} />
      <p style={{ fontFamily: font, fontSize: 12, fontWeight: 500, color: "#737373", margin: 0 }}>{label}</p>
    </div>
  );
}

// ── InfoRow ───────────────────────────────────────────────────────────────────
// Matches Figma: px-20 py-10, rounded-sm (6px), label (12px medium #737373) + value (12px regular #262626)

function InfoRow({ label, value, lime }: { label: string; value: string; lime?: boolean }) {
  return (
    <div style={{
      background: lime ? "#f7fee7" : "#fafafa",
      borderRadius: 6,
      padding: "10px 20px",
      display: "flex", flexDirection: "column",
      gap: 2,
    }}>
      <p style={{ fontFamily: font, fontSize: 12, fontWeight: 500, color: "#737373", margin: 0, textAlign: "right" }}>
        {label}
      </p>
      <p style={{ fontFamily: font, fontSize: 12, fontWeight: 400, color: "#262626", margin: 0, textAlign: "right" }}>
        {value}
      </p>
    </div>
  );
}

// ── AIBadge ───────────────────────────────────────────────────────────────────

function AIBadge() {
  return (
    <div style={{
      background: GREEN_BG, color: GREEN,
      fontFamily: font, fontSize: 10, fontWeight: 700,
      padding: "2px 6px", borderRadius: 4, letterSpacing: "0.5px",
      display: "flex", alignItems: "center", gap: 3, flexShrink: 0,
    }}>
      <Sparkles style={{ width: 10, height: 10 }} />
      AI
    </div>
  );
}

// ── CardShell ─────────────────────────────────────────────────────────────────
// Matches Figma node 464-4175 exactly:
//   - 24px padding, border #f9fafb, shadow/sm
//   - Header: [text-col flex-1] [icon 36px circle] with gap 16px
//   - Text col: [status left | title right] + description
//   - Two InfoRows (white + lime)
//   - Dropzone slot at bottom

type CardShellProps = {
  icon: React.ElementType;
  iconBg: string;    // e.g. "#dcfce7" (green-100)
  iconColor: string; // e.g. "#059669"
  title: string;
  description: string;
  aiTag?: boolean;
  statusEntry: UploadEntry;
  row1: { label: string; value: string };
  row2: { label: string; value: string };
  children: React.ReactNode;
};

function CardShell({
  icon: Icon, iconBg, iconColor, title, description,
  aiTag, statusEntry, row1, row2, children,
}: CardShellProps) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #f9fafb",
      borderRadius: 10,
      boxShadow: "0 1px 2px rgba(0,0,0,0.1), 0 1px 1px rgba(0,0,0,0.06)",
      padding: 24,
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      {/* Header: [text-col flex-1] [icon circle] */}
      <div dir="ltr" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Text column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
          {/* Title row: status left | title+badge right */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <StatusLabel entry={statusEntry} />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {aiTag && <AIBadge />}
              <p style={{
                fontFamily: font, fontSize: 12, fontWeight: 700,
                color: "#262626", margin: 0, letterSpacing: "-0.36px",
                textAlign: "right",
              }}>
                {title}
              </p>
            </div>
          </div>
          {/* Description */}
          <p style={{
            fontFamily: font, fontSize: 12, fontWeight: 400,
            color: "#737373", margin: 0, lineHeight: "16px", textAlign: "right",
          }}>
            {description}
          </p>
        </div>

        {/* Icon circle: 36px, iconBg, border 2px white */}
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: iconBg,
          border: "2px solid white",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.06)",
        }}>
          <Icon style={{ width: 16, height: 16, color: iconColor }} />
        </div>
      </div>

      {/* Two info rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <InfoRow label={row1.label} value={row1.value} />
        <InfoRow label={row2.label} value={row2.value} lime />
      </div>

      {/* Dropzone / extra content */}
      {children}
    </div>
  );
}

// ── StatusChip ────────────────────────────────────────────────────────────────

function StatusChip({ label, active }: { label: string; active: boolean }) {
  return (
    <span style={{
      fontFamily: font, fontSize: 10, fontWeight: 600,
      color: active ? GREEN : "#737373",
      background: active ? GREEN_BG : "#f5f5f5",
      border: `1px solid ${active ? "#a7f3d0" : "#e5e5e5"}`,
      borderRadius: 99, padding: "3px 8px",
    }}>
      {label}
    </span>
  );
}

// ── AIInsightBox ──────────────────────────────────────────────────────────────

function AIInsightBox() {
  // TODO: Replace with real AI output from analysis API
  const insights = [
    { label: "פריט מוביל", value: "פסטה ארביאטה — 23% מהמכירות" },
    { label: "חריגת עלות", value: "כתף כבש — עלות 38% (יעד 28%)" },
    { label: "המלצת מחיר", value: "שניצל — העלאה של ₪5 תשפר רווח ב-12%" },
    { label: "הזדמנות", value: "פריט בסלט — רווחיות נמוכה, שקול הסרה" },
  ];
  return (
    <div style={{
      background: "#fffbeb", border: "1px solid #fde68a",
      borderRadius: 8, padding: 14,
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
        <p style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: "#92400e", margin: 0 }}>תובנות AI</p>
        <Sparkles style={{ width: 14, height: 14, color: "#d97706" }} />
      </div>
      {insights.map(({ label, value }) => (
        <div key={label} style={{ textAlign: "right" }}>
          <span style={{ fontFamily: font, fontSize: 11, fontWeight: 700, color: "#92400e" }}>{label}: </span>
          <span style={{ fontFamily: font, fontSize: 11, color: "#78350f" }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

// ── UploadSummary ─────────────────────────────────────────────────────────────

function UploadSummary({ uploads }: { uploads: UploadMap }) {
  const done = Object.values(uploads).filter(u => u.status === "completed").length;
  const total = Object.keys(uploads).length;
  const totalRecords = Object.values(uploads)
    .filter(u => u.status === "completed")
    .reduce((s, u) => s + (u.recordsImported ?? 0), 0);
  if (done === 0) return null;
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{
        background: GREEN_BG, border: "1px solid #a7f3d0",
        borderRadius: 10, padding: 16,
        display: "flex", flexDirection: "column", gap: 6,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
          <p style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: "#065f46", margin: 0 }}>סיכום העלאות</p>
          <CheckCircle style={{ width: 14, height: 14, color: GREEN }} />
        </div>
        <p style={{ fontFamily: font, fontSize: 12, color: "#047857", margin: 0, textAlign: "right" }}>
          {done} מתוך {total} קטגוריות הועלו · {totalRecords.toLocaleString("he-IL")} רשומות יובאו
        </p>
        <p style={{ fontFamily: font, fontSize: 11, color: "#059669", margin: 0, textAlign: "right" }}>
          ✓ כל הדשבורדים, KPIs והתראות AI עודכנו אוטומטית
        </p>
      </div>
    </div>
  );
}

// ── UploadCenterScreen ────────────────────────────────────────────────────────

export function UploadCenterScreen() {
  useGlobalStyle(CSS_PULSE);
  const [menuOpen, setMenuOpen] = useState(false);

  const [uploads, setUploads] = useState<UploadMap>({
    suppliers:   INIT,
    employees:   INIT,
    sales:       INIT,
    menuPricing: INIT,
    recipes:     INIT,
    receipts:    INIT,
  });

  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  async function handleUpload(key: keyof UploadMap, file: File) {
    const patch = (entry: Partial<UploadEntry>) =>
      setUploads(prev => ({ ...prev, [key]: { ...prev[key], ...entry } }));
    patch({ file, status: "uploading" });
    await sleep(1200);
    patch({ status: "analyzing" });
    await sleep(1600);
    patch({ status: "importing" });
    await sleep(900);
    patch({ status: "completed", uploadedAt: new Date(), recordsImported: randomRecords() });
    // TODO: POST /api/uploads/:key with FormData
    // TODO: POST /api/dashboards/refresh — recalculate KPIs, insights, alerts
  }

  async function runFullAnalysis() {
    if (analysisRunning) return;
    setAnalysisRunning(true);
    await sleep(3000);
    setAnalysisRunning(false);
    setAnalysisComplete(true);
    // TODO: POST /api/analysis/sales-full
  }

  const u = uploads;

  return (
    <div dir="rtl" style={{ display: "flex", flexDirection: "column", minHeight: "100svh", background: "white", fontFamily: font }}>
      {/* iOS status bar */}
      <div style={{ height: 53, background: "white", flexShrink: 0 }} />

      {/* Header */}
      <div dir="ltr" style={{
        background: "white", padding: "var(--page-horizontal-padding)",
        display: "flex", alignItems: "center", gap: 8,
        flexShrink: 0, boxShadow: "0 1px 0 #e5e5e5",
      }}>
        <div style={{ width: 36 }} />
        <div style={{ flex: 1, textAlign: "center" }}>
          <p style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: "#262626", letterSpacing: "-0.36px", margin: 0 }}>שלום אור,</p>
          <p style={{ fontFamily: font, fontSize: 12, color: "#737373", margin: 0 }}>ג׳פניקה סניף אריאל</p>
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            width: 36, height: 36, borderRadius: "50%", background: "#f5f5f5",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "none", cursor: "pointer", flexShrink: 0,
          }}
        >
          <Menu style={{ width: 20, height: 20, color: "#262626" }} />
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{
        flex: 1, overflowY: "auto",
        padding: "20px var(--page-horizontal-padding) 40px",
        display: "flex", flexDirection: "column", gap: 0,
      }}>
        {/* Page title */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: "#262626", margin: "0 0 4px", textAlign: "right" }}>
            העלאת קבצים
          </h1>
          <p style={{ fontFamily: font, fontSize: 13, color: "#737373", margin: 0, textAlign: "right" }}>
            העלו קבצים כדי לעדכן אוטומטית את נתוני העסק
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          {/* 1. Supplier Invoices */}
          <CardShell
            icon={FileText} iconBg="#dcfce7" iconColor="#059669"
            title="הזנת ספקים — ניתוח אוטומטי"
            description="AI מנתח ספקים, מוצרים, מחירים וחריגות"
            statusEntry={u.suppliers}
            row1={{ label: "סוג קבצים", value: "PDF / Excel / CSV" }}
            row2={{ label: "מה מתעדכן", value: "פוד קוסט, מלאי, התראות AI" }}
          >
            <UploadDropzone
              label="העלה קובץ PDF / Excel מהספק"
              icon={FileText}
              entry={u.suppliers}
              onFile={f => handleUpload("suppliers", f)}
              accept=".pdf,.xlsx,.xls,.csv"
            />
          </CardShell>

          {/* 2. Employee Hours */}
          <CardShell
            icon={Users} iconBg="#ede9fe" iconColor="#7c3aed"
            title="שיפטורג׳נייד — שעות עובדים"
            description="הזנה אוטומטית של שעות, עובדים ואומדן שכר"
            statusEntry={u.employees}
            row1={{ label: "סוג קבצים", value: "Excel / CSV / ShiftOrg" }}
            row2={{ label: "מה מתעדכן", value: "דשבורד עובדים, דוחות שכר" }}
          >
            <UploadDropzone
              label="לחץ להעלאת קובץ Excel / CSV"
              icon={Users}
              entry={u.employees}
              onFile={f => handleUpload("employees", f)}
              accept=".xlsx,.xls,.csv"
            />
          </CardShell>

          {/* 3. AI Sales Analysis */}
          <CardShell
            icon={BarChart2} iconBg="#cffafe" iconColor="#0891b2"
            title="אנליזת מכירות לפי פריטים"
            description="המלצות AI על רווחיות, מחירים ופריטים בעייתיים"
            aiTag
            statusEntry={u.sales}
            row1={{ label: "דוח מכירות", value: "Excel / CSV" }}
            row2={{ label: "מחירון תפריט", value: "Excel / CSV" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Two dropzones */}
              <UploadDropzone
                label="העלה דוח מכירות"
                icon={BarChart2}
                entry={u.sales}
                onFile={f => handleUpload("sales", f)}
                accept=".xlsx,.xls,.csv"
                compact
              />
              <UploadDropzone
                label="העלה מחירון תפריט"
                icon={FileText}
                entry={u.menuPricing}
                onFile={f => handleUpload("menuPricing", f)}
                accept=".xlsx,.xls,.csv"
                compact
              />

              {/* Status chips */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                <StatusChip
                  label={u.sales.status === "completed" ? `✓ מכירות: ${u.sales.recordsImported} פריטים` : "מכירות: לא הועלה"}
                  active={u.sales.status === "completed"}
                />
                <StatusChip
                  label={u.menuPricing.status === "completed" ? `✓ מחירון: ${u.menuPricing.recordsImported} פריטים` : "מחירון: לא הועלה"}
                  active={u.menuPricing.status === "completed"}
                />
                <StatusChip label="הזמנות ספקים: לא מחובר" active={false} />
              </div>

              {/* CTA */}
              <button
                disabled={u.sales.status !== "completed" || analysisRunning}
                onClick={runFullAnalysis}
                style={{
                  width: "100%", height: 40,
                  background: u.sales.status === "completed" && !analysisRunning ? GREEN : "#e5e5e5",
                  color: u.sales.status === "completed" && !analysisRunning ? "white" : "#a3a3a3",
                  border: "none", borderRadius: 8,
                  fontFamily: font, fontSize: 14, fontWeight: 600,
                  cursor: u.sales.status === "completed" && !analysisRunning ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "background 0.2s",
                }}
              >
                {analysisRunning ? (
                  <>
                    <div style={{
                      width: 14, height: 14, border: "2px solid white",
                      borderTopColor: "transparent", borderRadius: "50%",
                      animation: "izz-spin 0.8s linear infinite",
                    }} />
                    מנתח...
                  </>
                ) : analysisComplete ? (
                  <><CheckCircle style={{ width: 16, height: 16 }} /> הניתוח הושלם</>
                ) : (
                  <><Play style={{ width: 14, height: 14 }} /> הרץ ניתוח מלא</>
                )}
              </button>

              {analysisComplete && <AIInsightBox />}
            </div>
          </CardShell>

          {/* 4. Recipe Book */}
          <CardShell
            icon={BookOpen} iconBg="#fef3c7" iconColor="#d97706"
            title="ספר מתכונים — משקלי מרכיבים"
            description="חיבור מרכיבים לפריטי תפריט לחישוב עלות מנה"
            aiTag
            statusEntry={u.recipes}
            row1={{ label: "סוג קבצים", value: "Excel / CSV" }}
            row2={{ label: "מה מתעדכן", value: "עלות מנה, רווחיות פריטים" }}
          >
            <UploadDropzone
              label="ספר מתכונים — הזנה ידנית"
              icon={BookOpen}
              entry={u.recipes}
              onFile={f => handleUpload("recipes", f)}
              accept=".xlsx,.xls,.csv"
            />
          </CardShell>

          {/* 5. Receipt Scanner */}
          <CardShell
            icon={ScanLine} iconBg="#fee2e2" iconColor="#dc2626"
            title="סריקת חשבוניות"
            description="AI מזהה ספק, סכום וקטגוריה מתמונה או PDF"
            statusEntry={u.receipts}
            row1={{ label: "סוג קבצים", value: "תמונה / PDF / מצלמה" }}
            row2={{ label: "מה מתעדכן", value: "הוצאות, קבלות, דוחות" }}
          >
            <UploadDropzone
              label="לחץ לצילום או העלאת חשבונית"
              icon={ScanLine}
              entry={u.receipts}
              onFile={f => handleUpload("receipts", f)}
              accept=".pdf,.png,.jpg,.jpeg,.heic"
            />
          </CardShell>

        </div>

        <UploadSummary uploads={uploads} />
      </div>

      <SideMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
