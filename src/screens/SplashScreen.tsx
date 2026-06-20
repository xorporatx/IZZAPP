import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import IzzBizzLogo from "@/assets/izzbizz-logo.svg?react";

interface SplashScreenProps {
  className?: string;
}

export function SplashScreen({ className }: SplashScreenProps) {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Wait for fade animation to complete before navigating
      setTimeout(() => navigate("/welcome"), 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      dir="rtl"
      className={cn(
        "flex h-full min-h-svh w-full items-center justify-center bg-primary transition-opacity duration-300",
        fadeOut ? "opacity-0" : "opacity-100",
        className
      )}
    >
      {/* Logo container — reserved slot for loading animation */}
      <div className="flex items-center justify-center" aria-label="IzzBizz">
        <IzzBizzLogo
          className="h-12 w-auto"
          style={{ "--fill-0": "hsl(var(--primary-foreground))" } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
