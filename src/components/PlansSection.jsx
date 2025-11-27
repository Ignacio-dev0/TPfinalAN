const PlansSection = ({ plans }) => {
  return (
    <section className="plans" id="planes">
      <div className="section-heading">
        <h2>Planes y Pricing</h2>
        <p>Desde validaciones académicas hasta producción industrial. Herramientas de simulación que evolucionan contigo.</p>
      </div>
      <div className="plan-grid">
        {plans.map((plan) => (
          <article key={plan.name} className={`plan-card${plan.highlighted ? ' highlighted' : ''}`}>
            <header>
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}</p>
            </header>
            <p>{plan.description}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a className="plan-cta" href="#contacto">
              {plan.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PlansSection
