import DescargaImagen from '../../public/images/DescargaImagen.png';
import { generarFolletoBioDigital } from '../utils/generarFolleto';
const DownloadSection = () => {
  return (
    <section className="download" id="descarga">
      <div className="section-heading">
        <h2>Descarga de Folleto</h2>
        <p>
          Conocé todos los beneficios de BioDigital Lab para laboratorios e investigadores independientes.
        </p>
      </div>
      <div className="download-container">
        <div className="download-content">
          <ul>
            <li>Diseñado para laboratorios pequeños e investigadores independientes</li>
        
          </ul>
          {/* Botón de descarga deshabilitado temporalmente */}
          <button type="button"  onClick={generarFolletoBioDigital}>
            Descargar folleto PDF
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