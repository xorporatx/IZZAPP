import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppHeader } from "@/components/AppHeader";

const ROLES = [
  "בעל/ת עסק",
  "מנהל/ת כספים",
  "רואה חשבון",
  "מנהל/ת כללי",
  "עובד/ת",
  "אחר",
];

export function BusinessDetailsScreen() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [role, setRole] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [multiBranch, setMultiBranch] = useState(false);
  const [branchCount, setBranchCount] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string | null>(null);

  const isValid = !!role && !!businessName && !!companyName;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoPreview(URL.createObjectURL(file));
    setLogoName(file.name);
  };

  const handleContinue = () => {
    if (!isValid) return;
    navigate("/onboarding/integrations");
  };

  return (
    <div dir="rtl" className="flex h-full min-h-svh flex-col bg-white">
      {/* Status bar */}
      <div className="h-14 bg-white" />

      <AppHeader
        onBack={() => navigate("/auth/phone")}
        leftAction={{ label: "דלג", onClick: () => navigate("/onboarding/next") }}
        progress={25}
      />

      {/* Scrollable content */}
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pb-28 pt-6">
        {/* Title */}
        <div className="text-center">
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
            כיף שהצטרפת!
          </h1>
          <p
            style={{
              fontFamily: '"Google Sans"',
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px",
              color: "#737373",
              marginTop: "6px",
            }}
          >
            ספרו לנו קצת על עליך ועל העסק..
          </p>
        </div>

        {/* Role dropdown */}
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="h-10 w-full text-right" dir="rtl">
            <SelectValue placeholder="תפקיד בחברה" />
          </SelectTrigger>
          <SelectContent dir="rtl">
            {ROLES.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Business name */}
        <Input
          placeholder="שם העסק"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="h-10 text-right"
          dir="rtl"
        />

        {/* Registered company name */}
        <Input
          placeholder="שם חברה (לפי רישום)"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="h-10 text-right"
          dir="rtl"
        />

        {/* Multi-branch card */}
        <div
          style={{
            borderRadius: "16px",
            background: "#ECFCCB",
            padding: "24px",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex flex-1 flex-col gap-0.5 text-right">
              <span style={{ fontFamily: '"Google Sans"', fontSize: "14px", fontWeight: "600", color: "#262626", lineHeight: 1 }}>
                מספר סניפים
              </span>
              <span style={{ fontFamily: '"Google Sans"', fontSize: "14px", color: "#737373", lineHeight: "20px" }}>
                יש לי יותר מסניף אחד
              </span>
            </div>
            <Switch checked={multiBranch} onCheckedChange={setMultiBranch} className="shrink-0" />
          </div>

          {multiBranch && (
            <div className="mt-3">
              <Input
                placeholder="מספר סניפים"
                value={branchCount}
                onChange={(e) => setBranchCount(e.target.value)}
                type="number"
                inputMode="numeric"
                className="h-10 bg-white text-right"
                dir="rtl"
              />
            </div>
          )}
        </div>

        {/* Logo upload */}
        <div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: "flex",
              height: "76px",
              padding: "24px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "13px",
              alignSelf: "stretch",
              width: "100%",
              borderRadius: "16px",
              border: "1px dashed #E5E5E5",
              background: "#FAFAFA",
              cursor: "pointer",
            }}
          >
            {logoPreview ? (
              <div className="flex items-center gap-3 w-full" onClick={(e) => e.stopPropagation()}>
                <div className="relative shrink-0">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                    <img src={logoPreview} alt="logo" className="h-full w-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLogoPreview(null);
                      setLogoName(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-input bg-white shadow-sm"
                    aria-label="Remove logo"
                  >
                    <X className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>
                <p className="flex-1 truncate text-right" style={{ fontFamily: '"Google Sans"', fontSize: "14px", color: "#737373", lineHeight: "20px" }}>
                  {logoName && logoName.length > 22 ? `${logoName.slice(0, 22)}...` : logoName}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-3 w-full">
                <ImagePlus className="h-8 w-8 shrink-0 text-muted-foreground" />
                <span style={{ fontFamily: '"Google Sans"', fontSize: "14px", color: "#737373", lineHeight: "20px" }}>
                  לחץ להעלאת לוגו עסקי
                </span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Sticky bottom button */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-input bg-white px-4 py-4">
        <Button
          disabled={!isValid}
          onClick={handleContinue}
          className="h-10 w-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          המשך
        </Button>
      </div>
    </div>
  );
}
