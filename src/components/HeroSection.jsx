import visualSelectionSrc from '../../public/images/visual-selection.png';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-copy reveal" style={{"--sr-delay":"0ms"}}>
        <h1 className="reveal" style={{"--sr-delay":"60ms"}}>
          Precisión invisible,
          <br /> seguridad visible.
        </h1>
        <p className="reveal" style={{"--sr-delay":"140ms"}}>
          Somos tu socio estratégico en análisis microbiológico para la industria alimentaria y
          farmacéutica. Tomá decisiones informadas con resultados trazables en tiempo real.
        </p>
        <div className="hero-actions reveal" style={{"--sr-delay":"220ms"}}>
          <a className="primary" href="#planes">
            Explorar paquetes de análisis
          </a>
          <a className="secondary" href="#quienes-somos">
            Conocer la metodología
          </a>
        </div>
      </div>
      <div className="hero-stats reveal" style={{"--sr-delay":"280ms"}}>
        <div className="visual-frame reveal" style={{"--sr-delay":"320ms"}}>
          <img src={visualSelectionSrc} alt="visual-selection" id="visual" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
