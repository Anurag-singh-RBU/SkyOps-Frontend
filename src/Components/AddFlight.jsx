import { useState } from "react";

const INITIAL_FORM_STATE = { code: "", carrier: "", source: "", destination: "", cost: "" };

export default function AddFlight({ onAdd }) {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); 

  const handleInputChange = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (status) setStatus(null);
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    
    if (!form.code.trim() || !form.carrier.trim() || !form.source.trim() || !form.destination.trim() || !form.cost.trim()) {
      setStatus({ type: "error", msg: "All fields are strictly required." });
      return;
    }

    setLoading(true);
    try {
     await onAdd({
      code: Number(form.code),
      carrier: form.carrier.trim(),
      source: form.source.trim(),
      destination: form.destination.trim(),
      cost: Number(form.cost),
    });
      setStatus({ type: "success", msg: "Flight successfully added to scheduling roster." });
      setForm(INITIAL_FORM_STATE);
    } catch {
      setStatus({ type: "error", msg: "Internal system error saving routing details." });
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete = Object.values(form).every((val) => val.trim() !== "");

  const FORM_FIELDS = [
    {
      key: "code",
      label: "Flight Code",
      placeholder: "e.g. AI-302",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7V4h16v3" /><path d="M9 20h6" /><path d="M12 4v16" />
        </svg>
      ),
    },
    {
      key: "carrier",
      label: "Air Carrier",
      placeholder: "e.g. Air India",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      key: "source",
      label: "Source Location",
      placeholder: "e.g. Delhi",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
        </svg>
      ),
    },
    {
      key: "destination",
      label: "Destination Location",
      placeholder: "e.g. Mumbai",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      key: "cost",
      label: "Fare Cost (INR)",
      placeholder: "e.g. 5200",
      type: "number",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="anim-fade-slide">
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <h2 className="page-title">Route Creation</h2>
          <p className="page-subtitle">Schedule a new flight track into operations</p>
        </div>
      </div>

      <div className="form-panel">
        <form onSubmit={handleFormSubmission}>
          <div className="form-layout-grid">
            {FORM_FIELDS.map((field) => (
              <div
                key={field.key}
                className={`form-input-group ${field.key === "carrier" ? "form-full-row" : ""}`}
              >
                <label className="form-field-label">{field.label}</label>
                <div className="form-input-icon-wrapper">
                  <span className="form-field-icon">{field.icon}</span>
                  <input
                    type={field.type || "text"}
                    value={form[field.key]}
                    placeholder={field.placeholder}
                    className="form-text-input"
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          {status && (
            <div className={`form-feedback-banner ${status.type} anim-fade-in`}>
              {status.type === "success" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
              <span>{status.msg}</span>
            </div>
          )}
          <button
            type="submit"
            className="form-submit-btn"
            disabled={loading || !isFormComplete}
            style={{ width: "100%" }}
          >
            {loading ? (
              <>
                <svg className="loading-spinner-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" strokeDasharray="50" strokeDashoffset="15" />
                </svg>
                <span>Creating Flight Routing</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Deploy Route</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
