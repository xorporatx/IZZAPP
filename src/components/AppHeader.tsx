import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AppHeaderProps = {
  onBack?: () => void;
  leftAction?: {
    label: string;
    onClick: () => void;
  };
  progress?: number; // 0–100 percentage, or pixel width if > 100
};

export function AppHeader({ onBack, leftAction }: AppHeaderProps) {
  const navigate = useNavigate();

  const handleBack = onBack ?? (() => navigate(-1));

  return (
    // dir="ltr" so flex direction is NOT reversed by RTL:
    // LEFT = optional text action, RIGHT = back chevron
    <div dir="ltr">
      <div className="flex h-14 items-center justify-between bg-white px-5">
        {/* LEFT: optional text action */}
        {leftAction ? (
          <button
            type="button"
            onClick={leftAction.onClick}
            style={{
              fontFamily: '"Google Sans"',
              fontSize: 14,
              fontWeight: 500,
              color: "#737373",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {leftAction.label}
          </button>
        ) : (
          <div style={{ width: 36 }} />
        )}

        {/* RIGHT: back chevron */}
        <button
          type="button"
          onClick={handleBack}
          style={{
            display: "flex",
            width: 36,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            borderRadius: 8,
          }}
          className="hover:bg-muted"
          aria-label="Back"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>
      </div>

    </div>
  );
}
