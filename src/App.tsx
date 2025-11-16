import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppearance } from "@/hooks/use-appearance";
import Index from "./pages/Index";
import SuperAdmin from "./pages/SuperAdmin";
import ManageUsers from "./pages/ManageUsers";
import Departments from "./pages/Departments";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import ActivityLog from "./pages/ActivityLog";
import Dean from "./pages/Dean";
import DeanStudents from "./pages/DeanStudents";
import DeanExcuseLetters from "./pages/DeanExcuseLetters";
import DeanEvents from "./pages/DeanEvents";
import DeanFinesManagement from "./pages/DeanFinesManagement";
import Student from "./pages/Student";
import StudentQrCode from "./pages/StudentQrCode";
import StudentAttendance from "./pages/StudentAttendance";
import StudentExcuseLetters from "./pages/StudentExcuseLetters";
import StudentFines from "./pages/StudentFines";
import SSG from "./pages/SSG";
import SSGEvents from "./pages/SSGEvents";
import SSGReports from "./pages/SSGReports";
import SSGMembers from "./pages/SSGMembers";
import SSGAnnouncements from "./pages/SSGAnnouncements";
import SSGAchievements from "./pages/SSGAchievements";
import SSGNotifications from "./pages/SSGNotifications";
import SSGSettings from "./pages/SSGSettings";
import LSG from "./pages/LSG";
import LSGScanner from "./pages/LSGScanner";
import LSGEvents from "./pages/LSGEvents";
import LSGAnalytics from "./pages/LSGAnalytics";
import LSGPerformance from "./pages/LSGPerformance";
import LSGSettings from "./pages/LSGSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Initialize appearance settings globally
const AppContent = () => {
  // Initialize appearance hook to load settings from localStorage on app load
  useAppearance();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/super-admin/users" element={<ManageUsers />} />
        <Route path="/super-admin/departments" element={<Departments />} />
        <Route path="/super-admin/settings" element={<Settings />} />
        <Route path="/super-admin/reports" element={<Reports />} />
        <Route path="/super-admin/activity" element={<ActivityLog />} />
        <Route path="/dean" element={<Dean />} />
        <Route path="/dean/students" element={<DeanStudents />} />
        <Route path="/dean/excuse-letters" element={<DeanExcuseLetters />} />
        <Route path="/dean/events" element={<DeanEvents />} />
        <Route path="/dean/fines" element={<DeanFinesManagement />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student/qr-code" element={<StudentQrCode />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/excuse-letters" element={<StudentExcuseLetters />} />
        <Route path="/student/fines" element={<StudentFines />} />
        <Route path="/ssg" element={<SSG />} />
        <Route path="/ssg/events" element={<SSGEvents />} />
        <Route path="/ssg/reports" element={<SSGReports />} />
        <Route path="/ssg/members" element={<SSGMembers />} />
        <Route path="/ssg/announcements" element={<SSGAnnouncements />} />
        <Route path="/ssg/achievements" element={<SSGAchievements />} />
        <Route path="/ssg/notifications" element={<SSGNotifications />} />
        <Route path="/ssg/settings" element={<SSGSettings />} />
        <Route path="/lsg" element={<LSG />} />
        <Route path="/lsg/scanner" element={<LSGScanner />} />
        <Route path="/lsg/events" element={<LSGEvents />} />
        <Route path="/lsg/analytics" element={<LSGAnalytics />} />
        <Route path="/lsg/performance" element={<LSGPerformance />} />
        <Route path="/lsg/settings" element={<LSGSettings />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
