import { useState, useEffect, useRef, useCallback } from "react";

const font = '"Google Sans", sans-serif';

export type FixedExpense = {
  id: string;
  category: string;
  amount: number;
};

type Props = {
  open: boolean;
  expenses: FixedExpense[];
  onSave: (updated: FixedExpense[]) => void;
  onClose: () => void;
};

export function EditFixedExpensesDrawer({ open, expenses, onSave, onClose }: Props) {
  // Local draft — initialised from props whenever drawer opens
  const [draft, setDraft] = useState<FixedExpense[]>([]);

  useEffect(() => {
    if (open) setDraft(expenses.map((e) => ({ ...e })));
  }, [open, expenses]);

  // ── Swipe-down to close ──────────────────────────────────────────────────────
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const dragDelta = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartY.current = e.clientY;
    dragDelta.current = 0;
  };
  const onPointerMove = useCallback((e: PointerEvent) => {
    if (dragStartY.current === null || !sheetRef.current) return;
    const delta = e.clientY - dragStartY.current;
    if (delta > 0) {
      dragDelta.current = delta;
      sheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  }, []);
  const onPointerUp = useCallback(() => {
    if (dragStartY.current === null || !sheetRef.current) return;
    if (dragDelta.current > 100) {
      onClose();
    } else {
      sheetRef.current.style.transform = "";
    }
    dragStartY.current = null;
    dragDelta.current = 0;
  }, [onClose]);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function setAmount(id: string, raw: string) {
    const numeric = raw.replace(/[^\d.]/g, "");
    setDraft((prev) =>
      prev.map((e) => (e.id === id ? { ...e, amount: numeric === "" ? 0 : Number(numeric) } : e))
    );
  }

  function handleSave() {
    onSave(draft);
    onClose();
  }

  return (
    <>
      {/* ── Backdrop ───────────────────────────────────────────────────── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 200,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 280ms ease-out",
        }}
      />

      {/* ── Bottom Sheet ────────────────────────────────────────────────── */}
      <div
        ref={sheetRef}
        dir="rtl"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 201,
          maxHeight: "85vh",
          background: "white",
          borderRadius: "16px 16px 0 0",
          boxShadow: "0px -4px 24px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 280ms ease-out",
          willChange: "transform",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Drag handle */}
        <div
          onPointerDown={onPointerDown}
          style={{
            paddingTop: 16,
            paddingBottom: 0,
            display: "flex",
            justifyContent: "center",
            cursor: "grab",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 48,
              height: 6,
              borderRadius: 9999,
              background: "#e5e5e5",
            }}
          />
        </div>

        {/* Drawer header */}
        <div
          style={{
            padding: "16px 16px 24px",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <h2
            style={{
              fontFamily: font,
              fontSize: 18,
              fontWeight: 600,
              color: "#262626",
              margin: 0,
            }}
          >
            הוצאות קבועות
          </h2>
        </div>

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0 16px",
            WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
          }}
        >
          {/* Card */}
          <div
            style={{
              background: "white",
              border: "1px solid #e5e5e5",
              borderRadius: 16,
              padding: 16,
              marginBottom: 8,
            }}
          >
            {/* Table header */}
            <div
              dir="ltr"
              style={{
                display: "flex",
                gap: 8,
                height: 40,
                alignItems: "center",
                paddingBottom: 8,
              }}
            >
              {/* LEFT col header = עלות */}
              <div style={{ flex: 1, fontFamily: font, fontSize: 14, fontWeight: 500, color: "#737373", textAlign: "left" }}>
                עלות
              </div>
              {/* RIGHT col header = סוג */}
              <div style={{ flex: 1, fontFamily: font, fontSize: 14, fontWeight: 500, color: "#737373", textAlign: "right" }}>
                סוג
              </div>
            </div>

            {/* Expense rows */}
            {draft.map((expense, idx) => (
              <div
                key={expense.id}
                dir="ltr"
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  height: 52,
                  borderBottom: idx < draft.length - 1 ? "1px solid #e5e5e5" : "none",
                }}
              >
                {/* LEFT: amount input */}
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={expense.amount === 0 ? "" : `₪${expense.amount.toLocaleString("he-IL")}`}
                    onChange={(e) => setAmount(expense.id, e.target.value.replace(/₪|,/g, ""))}
                    style={{
                      width: "100%",
                      height: "var(--input-height)",
                      border: "1px solid #e5e5e5",
                      borderRadius: 12,
                      padding: "0 12px",
                      fontFamily: font,
                      fontSize: 14,
                      color: "#262626",
                      textAlign: "left",
                      direction: "ltr",
                      boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
                      outline: "none",
                      background: "white",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* RIGHT: category name (read-only styled as input) */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      width: "100%",
                      height: "var(--input-height)",
                      border: "1px solid #e5e5e5",
                      borderRadius: 12,
                      padding: "0 12px",
                      fontFamily: font,
                      fontSize: 14,
                      color: "#262626",
                      textAlign: "right",
                      direction: "rtl",
                      boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
                      background: "white",
                      display: "flex",
                      alignItems: "center",
                      overflow: "hidden",
                      whiteSpace: "nowrap" as const,
                      textOverflow: "ellipsis",
                      boxSizing: "border-box" as const,
                    }}
                  >
                    {expense.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky footer */}
        <div
          style={{
            flexShrink: 0,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            background: "white",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          {/* שמור — primary */}
          <button
            onClick={handleSave}
            style={{
              width: "100%",
              height: "var(--input-height)",
              background: "#059669",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontFamily: font,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            שמור
          </button>

          {/* חזור — secondary */}
          <button
            onClick={onClose}
            style={{
              width: "100%",
              height: "var(--input-height)",
              background: "white",
              color: "#262626",
              border: "1px solid #e5e5e5",
              borderRadius: 8,
              fontFamily: font,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            חזור
          </button>
        </div>
      </div>
    </>
  );
}
