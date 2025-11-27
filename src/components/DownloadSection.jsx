const DownloadSection = () => {
  return (
    <section className="download" id="descarga">
      <div className="section-heading">
        <h2>Descarga de reporte</h2>
        <p>
          Generá un resumen automático con el crecimiento simulado, el nivel de confianza y los intervalos
          analizados.
        </p>
      </div>
      <div className="download-card">
        <ul>
          <li>Resumen ejecutivo con los hallazgos claves</li>
          <li>Curva gráfica exportada en alta resolución</li>
          <li>Intervalos analizados y recomendaciones sugeridas</li>
        </ul>
        <button type="button">Descargar reporte PDF</button>
      </div>
    </section>
  )
}

export default DownloadSection
