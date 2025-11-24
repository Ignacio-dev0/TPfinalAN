const TopBar = () => {
  return (
    <header className="top-bar" id="inicio">
      <div className="brand">
        <span className="logo-mark">BioLab Digital</span>
        <span className="tagline">Precisión invisible, seguridad visible</span>
      </div>
      <nav className="navigation">
        <a href="#quienes-somos">Quiénes Somos</a>
        <a href="#simulador">Simulador</a>
        <a href="#planes">Planes</a>
        <a href="#faq">FAQ</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <a className="cta" href="#descarga">
        Acceso Clientes
      </a>
    </header>
  )
}

export default TopBar
