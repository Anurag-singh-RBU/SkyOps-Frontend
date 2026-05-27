/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import FlightsTable from "./Components/FlightsTable";
import AddFlight from "./Components/AddFlight";
import FlightService from "./Services/FlightService";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastNotification, setToastNotification] = useState(null); // { type: "success" | "error", msg }
  
  // Theme State management (Persisted with localStorage, default to dark theme)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // Apply theme to document element whenever theme state changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark modes
  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // ── Toast Banner Trigger ──
  const triggerToast = (type, msg) => {
    setToastNotification({ type, msg });
    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  // ── Fetch Roster Telemetry ──
  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const res = await FlightService.getFlights();
        const parsedData = await res.json();
        if (mounted) setFlights(parsedData || []);
      } catch (e) {
        console.error("Telemetry fetch fail:", e);
        triggerToast("error", "Error connecting to telemetry backend server.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, []);


  // ── Delete Operations ──
  const handleDeleteOperation = async (code) => {
    try {
      const res = await FlightService.deleteFlight(code);
      if (res.ok) {
        setFlights((prev) => prev.filter((item) => item.code !== code));
        triggerToast("success", `Flight code ${code} deleted from control system.`);
      } else {
        triggerToast("error", `Failed to remove flight ${code} from system.`);
      }
    } catch (err) {
      triggerToast("error", "Could not submit deletion query to backend.");
    }
  };

  // ── Route Insertion Operations ──
  const handleInsertOperation = async (flightObject) => {
    try {
      const res = await FlightService.saveFlight(flightObject);
      if (res.ok) {
        // Refetch flights after successful save
        const flightsRes = await FlightService.getFlights();
        const updatedFlights = await flightsRes.json();
        setFlights(updatedFlights || []);
        
        triggerToast("success", `Flight routing ${flightObject.code} successfully deployed.`);
        setActivePage("all-flights");
      } else {
        triggerToast("error", "Failed to save flight to system.");
      }
    } catch (err) {
      triggerToast("error", "Could not submit flight routing to backend.");
    }
  };

  // ── Render Page Routing Panel ──
  const getRenderPanel = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard flights={flights} loading={loading} />;
      case "all-flights":
        return (
          <FlightsTable
            flights={flights}
            loading={loading}
            onDelete={handleDeleteOperation}
          />
        );
      case "add-flight":
        return <AddFlight onAdd={handleInsertOperation} />;
      
      // Secondary Navigation screens (coming soon placeholder panels)
      case "analytics":
        return (
          <div className="coming-soon-panel anim-fade-slide">
            <div className="coming-soon-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <h3 className="coming-soon-title">Roster Analytics</h3>
            <p className="coming-soon-desc">Telemetry data analysis modules are being integrated for direct control center displays.</p>
          </div>
        );
      case "reports":
        return (
          <div className="coming-soon-panel anim-fade-slide">
            <div className="coming-soon-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <h3 className="coming-soon-title">Telemetry Reports</h3>
            <p className="coming-soon-desc">PDF generation modules and automatic logging features scheduled for next major roster release.</p>
          </div>
        );
      case "settings":
        return (
          <div className="coming-soon-panel anim-fade-slide">
            <div className="coming-soon-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <h3 className="coming-soon-title">System Settings</h3>
            <p className="coming-soon-desc">Control parameters, connection routes, and endpoint APIs configure panel coming soon.</p>
          </div>
        );
      default:
        return <Dashboard flights={flights} loading={loading} />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Panel Navigation */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Display screen */}
      <main className="main-content">
        {/* Dynamic Display area of the page */}
        <div className="page-body">{getRenderPanel()}</div>
      </main>

      {/* Roster Actions Alert Notifications Popups stack */}
      {toastNotification && (
        <div className="toast-stack">
          <div className={`toast-alert ${toastNotification.type}`}>
            <span className="toast-alert-icon">
              {toastNotification.type === "success" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
            </span>
            <div className="toast-alert-text">{toastNotification.msg}</div>
            <button className="toast-alert-close-btn" onClick={() => setToastNotification(null)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}