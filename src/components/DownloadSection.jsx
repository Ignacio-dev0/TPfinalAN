import DescargaImagen from '../../public/images/DescargaImagen.png';

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
      <div className="download-container">
        <div className="download-content">
          <ul>
            <li>Resumen ejecutivo con los hallazgos claves</li>
            <li>Curva gráfica exportada en alta resolución</li>
            <li>Intervalos analizados y recomendaciones sugeridas</li>
          </ul>
          <button type="button">Descargar reporte PDF</button>
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