import logo from '../../public/logo.png'; // Importar la imagen

const TopBar = () => {
  return (
    <header className="top-bar reveal" id="inicio" style={{"--sr-delay": "0ms"}}>
      <div className="brand">
        {/* Logo agregado aquí */}
        <div className="logo-container">
          <img src={logo} alt="BioLab Digital Logo" className="logo-image" />
        </div>
        <div className="brand-text">
          <span className="logo-mark">BioLab Digital</span>
          <span className="tagline">Precisión invisible, seguridad visible</span>
        </div>
      </div>
      <nav className="navigation reveal" style={{"--sr-delay": "80ms"}}>
        <a href="#quienes-somos">Quiénes Somos</a>
        <a href="#simulador">Simulador</a>
        <a href="#planes">Planes</a>
        <a href="#faq">FAQ</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <a className="cta reveal" href="#descarga" style={{"--sr-delay": "120ms"}}>
        Acceso Clientes
      </a>
    </header>
  )
}

export default TopBar