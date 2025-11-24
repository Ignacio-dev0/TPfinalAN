const ContactSection = () => {
  return (
    <section className="contact" id="contacto">
      <div className="contact-card">
        <h2>Contacto y soporte</h2>
        <p>
          Elegí el canal que prefieras. Nuestro equipo humano responde en menos de 2 horas.
        </p>
        <ul>
          <li>
            <span>Mail</span>
            <a href="mailto:soporte@microbioanalytics.com">soporte@microbioanalytics.com</a>
          </li>
          <li>
            <span>Teléfono</span>
            <a href="tel:+5401123098765">+54 11 2309 8765</a>
          </li>
          <li>
            <span>WhatsApp</span>
            <a href="https://wa.me/5491123098765" target="_blank" rel="noreferrer">
              +54 9 11 2309 8765
            </a>
          </li>
        </ul>
      </div>
      <div className="contact-support">
        <h3>Soporte directo</h3>
        <p>
          Acompañamos la adopción tecnológica con especialistas en bioprocesos, validación regulatoria y
          data analytics.
        </p>
        <button type="button">Agendar sesión con un especialista</button>
      </div>
    </section>
  )
}

export default ContactSection
