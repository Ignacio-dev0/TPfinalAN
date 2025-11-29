import DescargaImagen from '../../public/images/DescargaImagen.png';
const DownloadSection = () => {
  return (
    <section className="download" id="descarga">
      <div className="section-heading">
        <h2>Descarga de reporte</h2>
        <p>
          Próximamente: descarga de reportes avanzados de simulación.
        </p>
      </div>
      <div className="download-container">
        <div className="download-content">
          <ul>
            <li>Resumen ejecutivo de resultados</li>
            <li>Visualizaciones y métricas clave</li>
            <li>Recomendaciones operativas</li>
          </ul>
          {/* Botón de descarga deshabilitado temporalmente */}
          <button type="button" disabled>
            Descargar reporte PDF
          </button>
        </div>
        <div className="download-visual">
          <img 
            src={DescargaImagen} 
            alt="Icono de documento PDF" 
            className="download-image"
          />
        </div>
      </div>
    </section>
  )
}

export default DownloadSection