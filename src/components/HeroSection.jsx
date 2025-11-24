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
        <article>
          <h3>ISO 17025</h3>
          <p>Laboratorio acreditado con cadena de custodia auditada trimestralmente.</p>
        </article>
        <article>
          <h3>Resultados en horas</h3>
          <p>Panel automatizado con alertas predictivas y comparativas históricas.</p>
        </article>
        <article>
          <h3>Confianza 97%</h3>
          <p>Modelos estadísticos supervisados por especialistas senior.</p>
        </article>
      </div>
    </section>
  )
}

export default HeroSection
