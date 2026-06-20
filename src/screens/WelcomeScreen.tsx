import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CreditCardHand from "@/assets/credit-card-hand.png";
import GoogleIcon from "@/assets/google-icon.svg?react";
import AppleIcon from "@/assets/apple-icon.svg?react";

export function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className={cn(
        "flex h-full min-h-svh w-full flex-col items-center bg-white px-6 py-10"
      )}
    >
      {/* Status bar simulation and top padding */}
      <div className="h-14 w-full" />

      {/* Hero illustration */}
      <div className="mb-8 flex items-center justify-center">
        <img
          src={CreditCardHand}
          alt="Credit card and hand illustration"
          className="h-48 w-48"
        />
      </div>

      {/* Main content */}
      <div className="w-full max-w-sm space-y-6">
        {/* Title with highlighted word */}
        <h1
          className="text-center font-bold leading-[37.8px] text-[#111827]"
          style={{
            fontFamily: '"Google Sans"',
            fontSize: "39.78px",
            letterSpacing: "-2.785px",
          }}
        >
          בואו נכין את העסק שלך לשליטה פיננסית{" "}
          <span className="text-lime-500">מלאה.</span>
        </h1>

        {/* Primary action buttons — side by side */}
        <div className="flex gap-3">
          <Button
            className="flex-1 h-10 bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={() => navigate("/auth/phone")}
          >
            כניסה
          </Button>
          <Button
            className="flex-1 h-10 bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={() => navigate("/auth/phone")}
          >
            הרשמה
          </Button>
        </div>

        {/* Social auth buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 border-input text-foreground"
            onClick={() => {
              /* TODO: Google OAuth */
            }}
          >
            <span className="flex size-4 items-center justify-center overflow-hidden">
              <GoogleIcon />
            </span>
            <span>Sign in with Google</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 border-input text-foreground"
            onClick={() => {
              /* TODO: Apple OAuth */
            }}
          >
            <span className="flex size-4 items-center justify-center overflow-hidden">
              <AppleIcon className="text-foreground" />
            </span>
            <span>Sign in with Apple</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
