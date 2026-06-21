import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AuthHeaderProps = {
  onClose?: () => void;
};

export function AuthHeader({ onClose }: AuthHeaderProps) {
  const navigate = useNavigate();
  const handleClose = onClose ?? (() => navigate(-1));

  return (
    <div dir="ltr" style={{
      display: "flex",
      height: 56,
      padding: "0 16px",
      alignItems: "center",
      backgroundColor: "white",
    }}>
      {/* X button — LEFT side (RTL: consistent auth pattern) */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="סגור"
        style={{
          display: "flex",
          width: 44,
          height: 44,
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: "none",
          border: "none",
          cursor: "pointer",
          borderRadius: 8,
        }}
        className="hover:bg-muted"
      >
        <X style={{ width: 20, height: 20 }} />
      </button>
    </div>
  );
}
