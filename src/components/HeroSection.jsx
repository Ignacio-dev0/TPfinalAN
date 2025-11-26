const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-copy">
        <h1>
          Precisión invisible,
          <br /> seguridad visible.
        </h1>
        <p>
          Somos tu socio estratégico en análisis microbiológico para la industria alimentaria y
          farmacéutica. Tomá decisiones informadas con resultados trazables en tiempo real.
        </p>
        <div className="hero-actions">
          <a className="primary" href="#planes">
            Explorar paquetes de análisis
          </a>
          <a className="secondary" href="#quienes-somos">
            Conocer la metodología
          </a>
        </div>
      </div>
      <div className="hero-stats">
        <div className="visual-frame">
          <img src="/src/utils/images/visual-selection.png" alt="visual-selection" id="visual" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
