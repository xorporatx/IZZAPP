import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import CoinImage from "@/assets/coin.png";
import { AppHeader } from "@/components/AppHeader";

export function OtpScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone: string = location.state?.phone ?? "0500000000";
  const maskedPhone = `${phone.slice(-4)}${"*".repeat(6)}`;

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (otp.length < 4) return;
    setIsLoading(true);
    setTimeout(() => {
      navigate("/onboarding/business-details");
    }, 500);
  };

  const handleResend = () => {
    // TODO: resend OTP
  };

  return (
    <div dir="rtl" className="flex h-full min-h-svh flex-col bg-white">
      {/* Status bar */}
      <div className="h-14 bg-white" />

      <AppHeader />

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center gap-5 px-4 py-8">
        {/* Coin illustration */}
        <div className="flex h-32 w-36 items-center justify-center">
          <img src={CoinImage} alt="Coin" className="h-full w-full object-contain" />
        </div>

        {/* Title */}
        <div className="w-full text-center">
          <h1
            style={{
              fontFamily: '"Google Sans"',
              fontSize: "24px",
              fontWeight: "700",
              letterSpacing: "-1.68px",
              lineHeight: "27.8px",
              color: "#262626",
            }}
          >
            שלחנו לך קוד אימות
            <br />
            <span style={{ color: "#84cc16" }}>למספר {maskedPhone}</span>
          </h1>
        </div>

        {/* OTP Input */}
        <InputOTP
          maxLength={4}
          value={otp}
          onChange={setOtp}
          pattern={REGEXP_ONLY_DIGITS}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="h-9 w-9 text-base" />
            <InputOTPSlot index={1} className="h-9 w-9 text-base" />
            <InputOTPSlot index={2} className="h-9 w-9 text-base" />
            <InputOTPSlot index={3} className="h-9 w-9 text-base" />
          </InputOTPGroup>
        </InputOTP>

        {/* Primary Button */}
        <Button
          disabled={otp.length < 4 || isLoading}
          onClick={handleSubmit}
          className="h-10 w-full max-w-sm bg-emerald-600 text-white hover:bg-emerald-700"
        >
          {isLoading ? "טוען..." : "כניסה"}
        </Button>

        {/* Resend link */}
        <div
          style={{
            fontFamily: '"Google Sans"',
            fontSize: "14px",
            lineHeight: "20px",
            textAlign: "left",
          }}
          className="flex gap-1 justify-start"
        >
          <button
            onClick={handleResend}
            style={{
              color: "#262626",
              textDecoration: "underline",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: '"Google Sans"',
              fontSize: "14px",
            }}
          >
            שלח קוד
          </button>
          <span style={{ color: "#737373" }}>לא קיבלתם קוד אימות?</span>
        </div>
      </div>
    </div>
  );
}
