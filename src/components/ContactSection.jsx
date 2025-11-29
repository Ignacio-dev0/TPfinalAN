const ContactSection = () => {
  return (
    <section className="contact" id="contacto">
      <div className="section-heading">
        <h2>Contacto</h2>
        <p>¿Dudas con el simulador? Nuestro equipo técnico está listo para ayudarte.</p>
      </div>
      
      <div className="contact-grid">
        <div className="contact-support">
          <h2>Contacta a nuestro equipo</h2>
          <p className="support-description">
            Respuesta en menos de 2 horas. Soporte especializado en bioprocesos y análisis de datos.
          </p>

          <div className="contact-features">
            <div className="feature-item">
              <span className="checkmark">✓</span>
              <span>Herramienta flexible para compartir conocimiento y colaborar</span>
            </div>
            <div className="feature-item">
              <span className="checkmark">✓</span>
              <span>Gestión segura de acceso y seguridad empresarial</span>
            </div>
            <div className="feature-item">
              <span className="checkmark">✓</span>
              <span>Soporte dedicado para tu configuración y plan ideal</span>
            </div>
          </div>

          <div className="support-actions">
            <button type="button" className="specialist-btn">
              Agendar sesión con especialista
            </button>
            <a href="#help" className="help-link">Ayuda y documentación →</a>
          </div>

          <div className="direct-contact">
            <h4>Contacto directo</h4>
            <div className="contact-buttons">
              <a href="" className="contact-button email">
                <span className="contact-icon">✉️</span>
                <span className="contact-label">Email</span>
              </a>
              <a href="" className="contact-button phone">
                <span className="contact-icon">📞</span>
                <span className="contact-label">Teléfono</span>
              </a>
              <a href="" target="_blank" rel="noreferrer" className="contact-button whatsapp">
                <span className="contact-icon">💬</span>
                <span className="contact-label">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Nombre *</label>
                <input 
                  type="text" 
                  id="firstName" 
                  placeholder="Juan"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Apellido *</label>
                <input 
                  type="text" 
                  id="lastName" 
                  placeholder="Perez"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                placeholder="usuario@gmail.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">País o región *</label>
              <select id="country" required>
                <option value="">Por favor selecciona...</option>
                <option value="AR">Argentina</option>
                <option value="CL">Chile</option>
                <option value="MX">México</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">¿Algo más?</label>
              <textarea 
                id="message" 
                placeholder="¿Cómo estás buscando usar BioLab Digital?"
                rows="3"
              ></textarea>
            </div>

            <div className="form-footer">
              <p className="privacy-notice">
                Al enviar este formulario, acepto la Política de Privacidad.<br />
                Campos con * son obligatorios.
              </p>
              <button type="submit" className="submit-btn">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection