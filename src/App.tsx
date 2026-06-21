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
import { FixedExpensesScreen } from "@/screens/FixedExpensesScreen";
import { LaborCostScreen } from "@/screens/LaborCostScreen";
import { FoodCostOverviewScreen } from "@/screens/FoodCostOverviewScreen";
import { FoodCostSupplierDetailsScreen } from "@/screens/FoodCostSupplierDetailsScreen";
import { SettingsScreen } from "@/screens/SettingsScreen";
import { NotificationsScreen } from "@/screens/NotificationsScreen";
import { ExportReportsScreen } from "@/screens/ExportReportsScreen";
import { SettingsBusinessDetailsScreen } from "@/screens/SettingsBusinessDetailsScreen";
import { BusinessProfileScreen } from "@/screens/BusinessProfileScreen";
import { ReceiptsScreen } from "@/screens/ReceiptsScreen";
import { UploadCenterScreen } from "@/screens/UploadCenterScreen";

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
        <Route path="/expenses" element={<FixedExpensesScreen />} />
        <Route path="/labor-cost" element={<LaborCostScreen />} />
        <Route path="/food-cost" element={<FoodCostOverviewScreen />} />
        <Route path="/food-cost/:supplierId" element={<FoodCostSupplierDetailsScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/settings/notifications" element={<NotificationsScreen />} />
        <Route path="/settings/export" element={<ExportReportsScreen />} />
        <Route path="/settings/business-details" element={<SettingsBusinessDetailsScreen />} />
        <Route path="/settings/business-profile" element={<BusinessProfileScreen />} />
        <Route path="/receipts" element={<ReceiptsScreen />} />
        <Route path="/uploads" element={<UploadCenterScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
