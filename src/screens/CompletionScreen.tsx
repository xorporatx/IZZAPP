import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StoreIllustration from "@/assets/store-illustration.png";

export function CompletionScreen() {
  const navigate = useNavigate();

  const handleEnter = () => {
    // Replace entire history so user cannot navigate back into onboarding
    navigate("/dashboard", { replace: true });
  };

  return (
    <div dir="rtl" className="flex min-h-svh flex-col items-center justify-center bg-white px-6">
      {/* Celebration anchor — future confetti/animation can be injected here */}
      <div id="celebration-anchor" className="flex flex-col items-center gap-6 w-full max-w-sm">

        {/* Illustration */}
        <img
          src={StoreIllustration}
          alt="הכל מוכן"
          style={{ width: 185, height: 194, objectFit: "contain" }}
        />

        {/* Text content */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1
            style={{
              fontFamily: '"Google Sans"',
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-1.68px",
              lineHeight: "27.8px",
              color: "#262626",
            }}
          >
            הכל{" "}
            <span style={{ color: "#84cc16" }}>מוכן!</span>
          </h1>
          <p
            style={{
              fontFamily: '"Google Sans"',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "20px",
              color: "#737373",
              maxWidth: 310,
            }}
          >
            הגדרת את העסק שלך. עכשיו אפשר להתחיל להוסיף תנועות ולעקוב אחר הביצועים.
          </p>
        </div>

        {/* CTA */}
        <Button
          onClick={handleEnter}
          className="h-10 w-full bg-emerald-600 text-white hover:bg-emerald-700"
          style={{ fontFamily: '"Google Sans"', fontWeight: 600, fontSize: 14 }}
        >
          כניסה
        </Button>
      </div>
    </div>
  );
}
