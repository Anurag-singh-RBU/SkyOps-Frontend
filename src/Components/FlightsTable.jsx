import { useState, useMemo } from "react";

const FILTER_FIELDS = [
  { value: "code", label: "Flight Code" },
  { value: "carrier", label: "Carrier" },
  { value: "source", label: "Source" },
  { value: "destination", label: "Destination" },
  { value: "cost", label: "Cost" },
];

export default function FlightsTable({ flights, loading, onDelete }) {
  const [filterField, setFilterField] = useState("code");
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingCode, setDeletingCode] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Filter logic based on dropdown selection
  const filteredFlights = useMemo(() => {
    if (!searchQuery.trim()) return flights;
    const normQuery = searchQuery.toLowerCase().trim();
    
    return flights.filter((flight) => {
      const valueToSearch = String(flight[filterField] ?? "").toLowerCase();
      return valueToSearch.includes(normQuery);
    });
  }, [flights, filterField, searchQuery]);

  const triggerDelete = async (code) => {
    setDeletingCode(code);
    await onDelete(code);
    setDeletingCode(null);
    setConfirmDelete(null);
  };

  return (
    <div className="anim-fade-slide">
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <h2 className="page-title">Fleet Routings</h2>
          <p className="page-subtitle">
            {loading
              ? "Fetching flight data from systems..."
              : `${filteredFlights.length} operational route${filteredFlights.length !== 1 ? "s" : ""} active in network`}
          </p>
        </div>
        
        {/* Real-time live status indicator badge */}
        <div className="live-indicator">
          <span className="live-dot live-dot-pulse" />
          <span>Control Link Online</span>
        </div>
      </div>

      {/* Main Premium Card Wrapping Table */}
      <div className="premium-card">
        {/* Table Toolbar controls */}
        <div className="toolbar-container">
          <div className="toolbar-left">
            {/* Filter Dropdown Select */}
            <div className="custom-select-container">
              <select
                className="custom-select"
                value={filterField}
                onChange={(e) => {
                  setFilterField(e.target.value);
                  setSearchQuery(""); // Clear search to avoid mismatch
                }}
              >
                {FILTER_FIELDS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="select-arrow">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Instant Search input field */}
            <div className="search-input-container">
              <span className="search-input-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                className="search-text-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search flights by ${FILTER_FIELDS.find((f) => f.value === filterField)?.label}...`}
              />
              {searchQuery && (
                <button className="search-clear-btn" onClick={() => setSearchQuery("")}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Data Table view */}
        <div className="table-wrapper">
          <table className="elegant-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Carrier</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Cost</th>
                <th style={{ width: "160px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Shimmer Skeleton Loader rows while loading
                [...Array(4)].map((_, rIndex) => (
                  <tr key={rIndex}>
                    {[...Array(6)].map((_, cIndex) => (
                      <td key={cIndex}>
                        <div className="skeleton" style={{ height: "18px", width: cIndex === 5 ? "80px" : `${50 + Math.random() * 40}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredFlights.length === 0 ? (
                // Empty Table view
                <tr>
                  <td colSpan="6">
                    <div className="empty-table-state">
                      <div className="empty-state-svg-wrapper">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                        </svg>
                      </div>
                      <h4 className="empty-state-title">No routes match current filter query</h4>
                      <p className="empty-state-desc">Try resetting your search input parameters</p>
                      {searchQuery && (
                        <button className="empty-state-btn" onClick={() => setSearchQuery("")}>
                          Reset Active Filter
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                // Populate operational flights
                filteredFlights.map((flight, index) => (
                  <tr key={flight.code || index}>
                    <td>
                      <span className="flight-code-badge">{flight.code}</span>
                    </td>
                    <td>
                      <div className="carrier-cell">
                        <div className="carrier-logo-dummy">
                          {String(flight.carrier || "N/A").substring(0, 2).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: "600", fontSize: "13.5px" }}>{flight.carrier}</span>
                      </div>
                    </td>
                    <td>
                      <span className="route-badge source">
                        <span className="location-dot dot-source" />
                        {flight.source}
                      </span>
                    </td>
                    <td>
                      <span className="route-badge destination">
                        <span className="location-dot dot-destination" />
                        {flight.destination}
                      </span>
                    </td>
                    <td>
                      <span className="cost-amount">₹{Number(flight.cost || 0).toLocaleString("en-IN")}</span>
                    </td>
                    <td>
                      {confirmDelete === flight.code ? (
                        <div className="confirm-box anim-fade-in">
                          <button
                            className="confirm-delete-btn"
                            disabled={deletingCode === flight.code}
                            onClick={() => triggerDelete(flight.code)}
                          >
                            {deletingCode === flight.code ? (
                              <svg className="loading-spinner-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="10" strokeDasharray="50" strokeDashoffset="15" />
                              </svg>
                            ) : (
                              "Yes, Delete"
                            )}
                          </button>
                          <button className="cancel-delete-btn" onClick={() => setConfirmDelete(null)}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button className="action-delete-btn" onClick={() => setConfirmDelete(flight.code)}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
