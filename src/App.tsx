import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SplashScreen } from "@/screens/SplashScreen";
import { WelcomeScreen } from "@/screens/WelcomeScreen";
import { PhoneVerificationScreen } from "@/screens/PhoneVerificationScreen";
import { OtpScreen } from "@/screens/OtpScreen";
import { BusinessDetailsScreen } from "@/screens/BusinessDetailsScreen";
import { IntegrationsScreen } from "@/screens/IntegrationsScreen";
import { CompletionScreen } from "@/screens/CompletionScreen";
import { DashboardScreen } from "@/screens/DashboardScreen";
import { ManualDataEntryScreen } from "@/screens/ManualDataEntryScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/auth/phone" element={<PhoneVerificationScreen />} />
        <Route path="/auth/otp" element={<OtpScreen />} />
        <Route path="/onboarding/business-details" element={<BusinessDetailsScreen />} />
        <Route path="/onboarding/business-info" element={<BusinessDetailsScreen />} />
        <Route path="/onboarding/integrations" element={<IntegrationsScreen />} />
        <Route path="/onboarding/completion" element={<CompletionScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/daily-entry" element={<ManualDataEntryScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
