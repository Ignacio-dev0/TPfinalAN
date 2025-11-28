import { useState } from 'react';

const FaqSection = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="faq" id="faq">
      <div className="section-heading">
        <h2>Preguntas frecuentes y ayuda</h2>
        <p>Resolvemos tus dudas para que puedas enfocarte en operar con seguridad.</p>
      </div>
      
      <div className="faq-container">
        {/* Left side - FAQ content */}
        <div className="faq-content">
          <div className="faq-search">
            <input
              type="text"
              placeholder="¿Cómo funciona el simulador de bioprocesos?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="faq-items">
            {filteredItems.slice(0, 4).map((item) => ( // Cambié de 3 a 4
              <details key={item.title} className="faq-card">
                <summary>{item.title}</summary>
                <div className="faq-card-body">
                  <p>{item.body}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Right side - Image */}
        <div className="faq-visual">
          <img 
            src="../../public/images/faqPortada.png" 
            alt="FAQ - Preguntas frecuentes"
            className="faq-image"
          />
        </div>
      </div>
    </section>
  )
}

export default FaqSection