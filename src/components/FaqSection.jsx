const FaqSection = ({ items }) => {
  return (
    <section className="faq" id="faq">
      <div className="section-heading">
        <h2>Preguntas frecuentes y ayuda</h2>
        <p>Resolvemos tus dudas para que puedas enfocarte en operar con seguridad.</p>
      </div>
      <div className="faq-items">
        {items.map((item) => (
          <details key={item.title} className="faq-card">
            <summary>{item.title}</summary>
            <div className="faq-card-body">
              <p>{item.body}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

export default FaqSection
