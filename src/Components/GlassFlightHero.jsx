import hero from "../assets/hero.png";

export default function GlassFlightHero({ title, subtitle }) {
  return (
    <section className="flight-hero">
      <div className="flight-hero-inner">
        <div className="flight-hero-copy">
          <div className="flight-hero-kicker">
            <span className="flight-hero-kicker-pill">FLIGHT OPS</span>
            <span className="flight-hero-kicker-sep">•</span>
            <span className="flight-hero-kicker-sub">Real-time control cockpit</span>
          </div>
          <h1 className="flight-hero-title">{title}</h1>
          <p className="flight-hero-subtitle">{subtitle}</p>

          <div className="flight-hero-ctaRow">
            <button className="flight-hero-cta primary" type="button">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
              Launch flight dashboard
            </button>
            <button className="flight-hero-cta" type="button">

              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M16.24 7.76L20 4" />
                <path d="M7.76 16.24L4 20" />
                <path d="M7.76 7.76L4 4" />
                <path d="M16.24 16.24L20 20" />
              </svg>
              Flight themed UI
            </button>
          </div>
        </div>

        <div className="flight-hero-visual" aria-hidden>
          <div className="flight-hero-visual-glass" />
          <img className="flight-hero-image" src={hero} alt="" />
          <div className="flight-hero-orbits">
            <div className="flight-orbit flight-orbit-1" />
            <div className="flight-orbit flight-orbit-2" />
            <div className="flight-orbit-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}

