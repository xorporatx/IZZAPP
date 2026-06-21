import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppHeader } from "@/components/AppHeader";

import ChevratHashmalLogo from "@/assets/chevrat-hashmal.png";
import ArnonaLogo from "@/assets/arnona.png";
import BeecomLogo from "@/assets/beecom.png";

type ButtonVariant = "primary" | "outline" | "connected";

type Integration = {
  id: string;
  name: string;
  logo: string;
  buttonLabel: string;
  buttonVariant: ButtonVariant;
};

const INTEGRATIONS: Integration[] = [
  { id: "chevrat-hashmal", name: "חברת חשמל", logo: ChevratHashmalLogo, buttonLabel: "הוסף", buttonVariant: "primary" },
  { id: "arnona",          name: "ארנונה",     logo: ArnonaLogo,         buttonLabel: "מחובר", buttonVariant: "connected" },
  { id: "beecom",          name: "Beecom",    logo: BeecomLogo,         buttonLabel: "התחבר", buttonVariant: "outline" },
];

function IntegrationCard({ integration, onAction }: { integration: Integration; onAction: (id: string) => void }) {
  const { id, name, logo, buttonLabel, buttonVariant } = integration;

  const buttonStyle =
    buttonVariant === "primary"
      ? { background: "#059669", color: "white", border: "none" }
      : buttonVariant === "connected"
      ? { background: "white", color: "#262626", border: "1px solid #e5e5e5" }
      : { background: "white", color: "#262626", border: "1px solid #e5e5e5" };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 71,
        padding: "0 24px",
        borderRadius: 14,
        border: "1px solid #e5e5e5",
        background: "white",
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
        width: "100%",
      }}
    >
      {/* Name + Logo — left side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src={logo} alt={name} style={{ width: 37, height: 37, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
        <span
          style={{
            fontFamily: '"Google Sans"',
            fontSize: 14,
            color: "#737373",
            lineHeight: "20px",
          }}
        >
          {name}
        </span>
      </div>

      {/* Action button — right side */}
      <button
        onClick={() => onAction(id)}
        style={{
          ...buttonStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 32,
          padding: "0 12px",
          borderRadius: 8,
          cursor: "pointer",
          fontFamily: '"Google Sans"',
          fontSize: 12,
          fontWeight: buttonVariant === "primary" ? 600 : 500,
          whiteSpace: "nowrap",
          flexShrink: 0,
          boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.05)",
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export function IntegrationsScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => INTEGRATIONS.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const handleAction = (id: string) => {
    // TODO: handle connect/add per integration
    console.log("action:", id);
  };

  return (
    <div dir="rtl" className="flex min-h-svh flex-col bg-white">
      {/* Status bar */}
      <div className="h-[53px] bg-white" />

      <AppHeader
        onBack={() => navigate("/onboarding/business-info")}
        leftAction={{ label: "דלג", onClick: () => navigate("/dashboard") }}
        progress={289}
      />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 pb-32 pt-6">

        {/* Header */}
        <div className="flex flex-col gap-1 text-center">
          <h1 style={{ fontFamily: '"Google Sans"', fontSize: 24, fontWeight: 700, letterSpacing: "-1.68px", lineHeight: "27.8px", color: "#262626" }}>
            אינטגרציות
          </h1>
          <p style={{ fontFamily: '"Google Sans"', fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "#737373" }}>
            ספר לנו קצת על עליך ועל העסק..
          </p>
        </div>

        {/* Search */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" style={{ left: "auto", right: "auto" }} />
          <div className="relative w-full">
            <Search
              className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
              style={{ left: 12 }}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="חיפוש"
              className="h-9 pr-3 pl-9 text-right text-sm"
              dir="rtl"
            />
          </div>
        </div>

        {/* Integration cards */}
        <div className="flex flex-col gap-2">
          {filtered.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} onAction={handleAction} />
          ))}
        </div>
      </div>

      {/* Sticky bottom button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4">
        <Button
          onClick={() => navigate("/onboarding/completion")}
          className="h-10 w-full bg-emerald-600 text-white hover:bg-emerald-700"
          style={{ fontFamily: '"Google Sans"', fontWeight: 600, fontSize: 14 }}
        >
          המשך
        </Button>
      </div>
    </div>
  );
}
