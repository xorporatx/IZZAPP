import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthHeader } from "@/components/AuthHeader";
import CoinImage from "@/assets/coin.png";

// Israeli phone validation
function isValidIsraeliPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, "");
  return /^(972|0)?([2-9]\d{8}|\d{9})$/.test(cleanPhone);
}

export function PhoneVerificationScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValid = isValidIsraeliPhone(phone);

  const handleSubmit = async () => {
    if (!isValid) return;
    setIsLoading(true);
    setTimeout(() => {
      navigate("/auth/otp", { state: { phone } });
    }, 500);
  };

  return (
    <div dir="rtl" className="flex h-full min-h-svh flex-col bg-white">
      {/* Status bar */}
      <div className="h-14 bg-white" />

      <AuthHeader onClose={() => navigate(-1)} />

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center gap-6 px-4 py-8">
        {/* Coin illustration */}
        <div className="flex h-40 w-40 items-center justify-center">
          <img src={CoinImage} alt="Coin illustration" className="h-full w-full" />
        </div>

        {/* Title */}
        <div className="w-full max-w-sm text-center">
          <h1
            style={{
              color: "#262626",
              textAlign: "center",
              fontFamily: '"Google Sans"',
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "27.8px",
              letterSpacing: "-1.68px",
            }}
          >
            כל המספרים של העסק
            <br />
            <span style={{ color: "#84cc16" }}>במקום אחד</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          style={{
            color: "#737373",
            textAlign: "center",
            fontFamily: '"Google Sans"',
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "20px",
          }}
          className="w-full max-w-sm"
        >
          הכניסו את מספר הטלפון ואנחנו נשלח אליכן בדקות הקרובות קוד אימות
        </p>

        {/* Phone Input */}
        <div className="w-full max-w-sm">
          <Input
            type="tel"
            placeholder="+972"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-10 text-center text-base"
            inputMode="tel"
          />
        </div>

        {/* Primary Button */}
        <Button
          size="lg"
          disabled={!isValid || isLoading}
          onClick={handleSubmit}
          className="h-10 w-full max-w-sm bg-emerald-600 text-white hover:bg-emerald-700"
        >
          {isLoading ? "טוען..." : "קבלו קוד אימות"}
        </Button>

        {/* Registration Link */}
        <div style={{ textAlign: "center", fontSize: "14px" }}>
          <span style={{ color: "#737373" }}>עדיין אין לכם חשבון? </span>
          <button
            onClick={() => navigate("/auth/register")}
            style={{
              textDecoration: "underline",
              color: "#262626",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: '"Google Sans"',
            }}
          >
            להרשמה
          </button>
        </div>
      </div>
    </div>
  );
}
