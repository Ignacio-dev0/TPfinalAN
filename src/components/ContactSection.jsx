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
            <div className="contact-methods">
              <div className="contact-method">
                <span>📧 Email</span>
                <a href="mailto:soporte@microbioanalytics.com">soporte@microbioanalytics.com</a>
              </div>
              <div className="contact-method">
                <span>📞 Teléfono</span>
                <a href="tel:+5401123098765">+54 11 2309 8765</a>
              </div>
              <div className="contact-method">
                <span>💬 WhatsApp</span>
                <a href="https://wa.me/5491123098765" target="_blank" rel="noreferrer">
                  +54 9 11 2309 8765
                </a>
              </div>
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
              <label htmlFor="email">Email de trabajo *</label>
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
                <option value="BR">Brasil</option>
                <option value="CL">Chile</option>
                <option value="CO">Colombia</option>
                <option value="MX">México</option>
                <option value="ES">España</option>
                <option value="US">Estados Unidos</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">¿Algo más?</label>
              <textarea 
                id="message" 
                placeholder="¿Cómo estás buscando usar Microbio Analytics?"
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