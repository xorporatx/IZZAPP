import { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart2, ChefHat, UserCheck, Expand,
  Settings, BellDot, TrendingUp, Receipt, X,
  Droplet, UserRound, FileSymlink,
} from "lucide-react";

// ── Menu definition ───────────────────────────────────────────────────────────

const MENU_ITEMS = [
  { label: "בקרה",         icon: BarChart2,   path: "/dashboard"  },
  { label: "פודקוסט",      icon: ChefHat,     path: "/food-cost"  },
  { label: "ליבר קוסט",   icon: UserCheck,   path: "/labor-cost" },
  { label: "הוצאות",       icon: Expand,      path: "/expenses"   },
  { label: "הגדרות",       icon: Settings,    path: "/settings"   },
  { label: "התראות",       icon: BellDot,     path: "/alerts"     },
  { label: "יעדים",        icon: TrendingUp,  path: "/goals"      },
  { label: "קבלות",        icon: Receipt,     path: "/receipts"   },
  { label: "פרופיל אישי", icon: UserRound,   path: "/profile"    },
];

// Separate bottom section items (below divider)
const MENU_ITEMS_BOTTOM = [
  { label: "העלאת קבצים", icon: FileSymlink, path: "/uploads" },
];

// ── Props ─────────────────────────────────────────────────────────────────────

type SideMenuDrawerProps = {
  open: boolean;
  onClose: () => void;
};

// ── Component ─────────────────────────────────────────────────────────────────

export function SideMenuDrawer({ open, onClose }: SideMenuDrawerProps) {
  const navigate      = useNavigate();
  const { pathname }  = useLocation();

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  function go(path: string) {
    navigate(path);
    onClose();
  }

  return (
    <>
      {/* ── Backdrop ──────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* ── Drawer panel ──────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="תפריט ניווט"
        dir="rtl"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "68%",
          maxWidth: 260,
          zIndex: 101,
          background: "white",
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.26s cubic-bezier(0.32, 0, 0.12, 1)",
          willChange: "transform",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* ── Close button — top-left corner of drawer (RTL = visual top-left) */}
        <div style={{
          display: "flex",
          justifyContent: "flex-start",   // far-left in RTL = left edge of panel
          padding: "12px 12px 0",
        }}>
          <button
            onClick={onClose}
            aria-label="סגור תפריט"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a3a3a3",
            }}
          >
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* ── Business profile ────────────────────────────────────────────── */}
        {/* dir="rtl" → avatar flows to the RIGHT, text to the LEFT */}
        <div style={{
          display: "flex",
          flexDirection: "row",          // RTL: first child = right
          alignItems: "center",
          gap: 10,
          padding: "16px 20px 20px",
        }}>
          {/* Avatar — RIGHT side (first child in RTL) */}
          <div style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#1e232d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <Droplet style={{ width: 18, height: 18, color: "white" }} />
          </div>

          {/* Name + switch link — LEFT of avatar */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flex: 1,
            minWidth: 0,
            textAlign: "right",
          }}>
            <span style={{
              fontFamily: '"Google Sans", sans-serif',
              fontSize: 13,
              fontWeight: 600,
              color: "#262626",
              lineHeight: "18px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              ג׳אפניקה סניף אריאל,
            </span>
            <button
              onClick={() => {}}
              style={{
                fontFamily: '"Google Sans", sans-serif',
                fontSize: 11,
                fontWeight: 400,
                color: "#262626",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
                textAlign: "right",
              }}
            >
              החלף סניף
            </button>
          </div>
        </div>

        {/* Separator */}
        <div style={{ height: 1, background: "#f0f0f0", margin: "0 0 8px" }} />

        {/* ── Nav items ───────────────────────────────────────────────────── */}
        <nav aria-label="ניווט ראשי" style={{ flex: 1, padding: "4px 10px" }}>
          <ul style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
          }}>
            {MENU_ITEMS.map(({ label, icon: Icon, path }) => {
              const isActive = pathname === path;
              return (
                <li key={path}>
                  <button
                    onClick={() => go(path)}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",      // RTL: icon on right, text on left
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 10px",
                      borderRadius: 8,
                      background: isActive ? "#f0fdf4" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "right",
                    }}
                  >
                    {/* Icon — RIGHT (first child in RTL row) */}
                    <Icon style={{
                      width: 20,
                      height: 20,
                      color: isActive ? "#047857" : "#737373",
                      flexShrink: 0,
                    }} />
                    {/* Label */}
                    <span style={{
                      fontFamily: '"Google Sans", sans-serif',
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#047857" : "#262626",
                      lineHeight: "20px",
                    }}>
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Separator + bottom items */}
        <div style={{ height: 1, background: "#f0f0f0", margin: "8px 0" }} />
        <nav aria-label="ניווט נוסף" style={{ padding: "4px 10px" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
            {MENU_ITEMS_BOTTOM.map(({ label, icon: Icon, path }) => {
              const isActive = pathname === path;
              return (
                <li key={path}>
                  <button
                    onClick={() => go(path)}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      width: "100%",
                      display: "flex", flexDirection: "row",
                      alignItems: "center", gap: 10,
                      padding: "9px 10px", borderRadius: 8,
                      background: isActive ? "#f0fdf4" : "transparent",
                      border: "none", cursor: "pointer", textAlign: "right",
                    }}
                  >
                    <Icon style={{ width: 20, height: 20, color: isActive ? "#047857" : "#737373", flexShrink: 0 }} />
                    <span style={{
                      fontFamily: '"Google Sans", sans-serif',
                      fontSize: 14, fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#047857" : "#262626", lineHeight: "20px",
                    }}>
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div style={{ height: 32 }} />
      </div>
    </>
  );
}
