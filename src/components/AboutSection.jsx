const AboutSection = () => {
  return (
    <section className="about" id="quienes-somos">
      <h2 className="section-title reveal" >¿Quiénes somos?</h2>
      
      <div className="about-container">
        {/* left visual column */}
        <div className="about-visual reveal" aria-hidden="true" style={{"--sr-delay":"0ms"}}></div>

        {/* right content column with stacked cards */}
        <div className="about-content">
          <div className="about-card reveal" style={{"--sr-delay":"80ms"}}>
            <h2>Identidad BioLab</h2>
            <p>
              Nacimos dentro de un hub biotecnológico para resolver el cuello de botella en análisis de
              cultivos y microfermentaciones. Combinamos instrumentación de laboratorio con analítica avanzada
              para entregar certeza en cada iteración.
            </p>
          </div>

          <div className="about-card reveal" style={{"--sr-delay":"160ms"}}>
            <h2>Cómo surgimos</h2>
            <p>
              El equipo detectó que las empresas tardaban días en validar lotes críticos. Automatizamos la toma
              de muestras, digitalizamos la trazabilidad y abrimos la puerta a decisiones en cuestión de horas.
            </p>
          </div>

          <div className="about-card reveal" style={{"--sr-delay":"240ms"}}>
            <h2>Objetivos y problema</h2>
            <p>
              Eliminamos la incertidumbre en procesos biológicos al ofrecer una herramienta confiable para
              proyectar riesgos, priorizar intervenciones y garantizar consistencia regulatoria.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection