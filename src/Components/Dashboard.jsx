
import { useMemo } from "react";
import GlassFlightHero from "./GlassFlightHero";

export default function Dashboard({ flights, loading }) {

  const flightStatistics = useMemo(() => {
    if (!flights.length) {
      return { total: 0, distinctCarriers: 0, meanFare: "₹0", popularConnection: "—" };
    }

    const carrierSet = new Set(flights.map((f) => f.carrier));
    const meanVal = flights.reduce((acc, current) => acc + Number(current.cost || 0), 0) / flights.length;

    // Calculate the most frequent route link
    const routeLinkCount = {};
    flights.forEach((item) => {
      const pathway = `${item.source} ➔ ${item.destination}`;
      routeLinkCount[pathway] = (routeLinkCount[pathway] || 0) + 1;
    });

    const popularConnection = Object.entries(routeLinkCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

    return {
      total: flights.length,
      distinctCarriers: carrierSet.size,
      meanFare: `₹${Math.round(meanVal).toLocaleString("en-IN")}`,
      popularConnection,
    };
  }, [flights]);

  const statsMetadata = [
    {
      title: "Rostered Routes",
      value: loading ? "—" : flightStatistics.total,
      subtext: "Operational tracks online",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      ),
    },
    {
      title: "Active Carriers",
      value: loading ? "—" : flightStatistics.distinctCarriers,
      subtext: "Operational fleet owners",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      title: "Average Pricing",
      value: loading ? "—" : flightStatistics.meanFare,
      subtext: "System-wide fare mean",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: "Busiest Route",
      value: loading ? "—" : flightStatistics.popularConnection,
      subtext: "Highest frequency channel",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="anim-fade-slide">
      <GlassFlightHero
        title="Operational Brief"
        subtitle="Overall control desk and telemetry summary"
      />


      {/* Metrics Roster Panel */}
      <div className="metrics-grid">

        {statsMetadata.map((card, idx) => (
          <div className="metric-card" key={idx}>
          <div className="metric-header">
              <span className="metric-title">{card.title}</span>
              <div className="metric-icon-wrap">{card.icon}</div>
            </div>

            <div className="metric-value">{card.value}</div>
            <div className="metric-subtext">{card.subtext}</div>

            <div className="metric-spark">
              <div className="spark-bars">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    className="spark-bar"
                    style={{
                      height:
                        loading
                          ? "50%"
                          : `${28 + ((i * 7 + (flights?.length || 0)) % 44)}%`,
                      opacity: loading ? 0.6 : 1,
                    }}
                  />
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Recent Fleet Log Roster Panel */}
      <div className="activity-box">
        <h3 className="activity-box-title">Recent Fleet Activity Log</h3>
        
        {loading ? (
          <div className="activity-list-container">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="activity-row">
                <div className="activity-left-side">
                  <div className="skeleton" style={{ width: "28px", height: "28px", borderRadius: "50%" }} />
                  <div className="activity-meta-details">
                    <div className="skeleton" style={{ height: "12px", width: "120px" }} />
                    <div className="skeleton" style={{ height: "10px", width: "80px", marginTop: "6px" }} />
                  </div>
                </div>
                <div className="skeleton" style={{ height: "12px", width: "60px" }} />
              </div>
            ))}
          </div>
        ) : flights.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            Roster is empty. Add a flight route to populate the control desk telemetry.
          </p>
        ) : (
          <div className="activity-list-container">
            {flights
              .slice(-4)
              .reverse()
              .map((item, idx) => (
                <div className="activity-row" key={item.code || idx}>
                  <div className="activity-left-side">
                    <div className="activity-logo-placeholder">
                      {String(item.carrier || "?").substring(0, 2).toUpperCase()}
                    </div>
                    <div className="activity-meta-details">
                      <span className="activity-meta-title">
                        Flight <span className="activity-meta-title-code">{item.code}</span> registered under {item.carrier}
                      </span>
                      <span className="activity-meta-path">
                        Pathway Connection: {item.source} ➔ {item.destination}
                      </span>
                    </div>
                  </div>
                  <div className="activity-right-side">
                    ₹{Number(item.cost || 0).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
