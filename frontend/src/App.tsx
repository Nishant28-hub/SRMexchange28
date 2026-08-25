import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import ListingDetail from "./pages/ListingDetail";
import CreateListing from "./pages/CreateListing";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MacCursorFollower from "./components/MacCursorFollower";
import MacDock from "./components/MacDock";
import PageTransition from "./components/PageTransition";

export default function App() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col selection:bg-emerald-500/30 selection:text-white pb-20">
      {/* macOS Ambient Spotlight Cursor Glow */}
      <MacCursorFollower />

      {/* Top Glass Navigation */}
      <Navbar />

      {/* Main Page with macOS Smooth Window Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
            <Route path="/marketplace" element={<PageTransition><Marketplace /></PageTransition>} />
            <Route path="/listings/:id" element={<PageTransition><ListingDetail /></PageTransition>} />
            <Route
              path="/create-listing"
              element={
                <ProtectedRoute>
                  <PageTransition><CreateListing /></PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PageTransition><Dashboard /></PageTransition>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* macOS Floating Glass Dock */}
      <MacDock />

      {/* Footer */}
      <Footer />
    </div>
  );
}
