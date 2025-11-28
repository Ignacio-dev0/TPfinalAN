const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-brand">
          <strong>BioLab Digital</strong>
          <span>Precisión y trazabilidad para tus ensayos.</span>
        </div>

        <div className="footer-copy">
          © 2025 BioLab Digital. Todos los derechos reservados.
        </div>
      </footer>

      {/* <style>{`
        

        .footer-brand span {
          display: block;
          margin-top: 4px;
          font-size: 0.9rem;
          opacity: 0.75;
        }

        .footer-copy {
          font-size: 0.8rem;
          opacity: 0.6;
          margin-top: 12px;
        }
      `}</style> */}
    </>
  );
};

export default Footer;
