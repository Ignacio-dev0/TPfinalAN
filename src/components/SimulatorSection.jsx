const SimulatorSection = ({ inputs, projection, curvePath, onInputChange, onReset, options, summary }) => {
  const areaPath = curvePath ? `${curvePath} L 100 90 L 0 90 Z` : ''
  const selectedMedium = options.mediums.find((item) => item.value === inputs.medium) ?? options.mediums[0]
  const selectedDuration = options.durations.find((item) => item.value === inputs.duration) ?? options.durations[0]
  const totalDaysLabel = `${projection.totalDays?.toFixed?.(0) ?? selectedDuration.label.replace(/\D/g, '')} día(s)`
  const averageRateDisplay = Number.isFinite(projection.averageRate)
    ? `${projection.averageRate.toFixed(2)} %/día`
    : '—'
  const segmentRateDisplay = Number.isFinite(projection.segmentRate)
    ? `${projection.segmentRate.toFixed(0)} ufc/día`
    : '—'
  const increaseDisplay = Number.isFinite(projection.totalIncrease)
    ? `${projection.totalIncrease.toLocaleString('es-AR')} ufc`
    : '—'
  const finalValueDisplay = Number.isFinite(projection.finalValue)
    ? `${projection.finalValue.toLocaleString('es-AR')} ufc`
    : '—'

  return (
    <section className="simulator" id="simulador">
      {/* Section Heading arriba en el medio */}
      <div className="section-heading">
        <h2>Simulador</h2>
        <p>Anticipa el comportamiento de tus cultivos y reduce la incertidumbre. Ingresa tus variables para obtener proyecciones gráficas con precisión estadística.</p>
      </div>

      {/* Contenedor principal para calculadora y gráfico alineados horizontalmente */}
      <div className="simulator-content">
        <div className="simulator-panel">
          <h2>Laboratorio virtual de crecimiento de bacterias</h2>
          <div className="panel-block">
            <h3>Diseño del experimento</h3>
            <form onSubmit={(event) => event.preventDefault()} className="experiment-form">
              <label>
                Temperatura (°C)
                <input
                  type="number"
                  min="15"
                  max="45"
                  step="0.5"
                  name="temperature"
                  value={inputs.temperature}
                  onChange={onInputChange}
                />
              </label>
              <label>
                Medio de cultivo
                <select name="medium" value={inputs.medium} onChange={onInputChange}>
                  {options.mediums.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <p className="option-hint">{selectedMedium.description}</p>
              <label>
                Duración del experimento
                <select name="duration" value={inputs.duration} onChange={onInputChange}>
                  {options.durations.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </form>
          </div>

          <div className="panel-results">
            <div>
              <span>Incremento total</span>
              <strong>{increaseDisplay}</strong>
            </div>
            <div>
              <span>Tasa diaria promedio</span>
              <strong>{averageRateDisplay}</strong>
            </div>
            <div>
              <span>Valor final proyectado</span>
              <strong>{finalValueDisplay}</strong>
            </div>
            <div>
              <span>Tasa entre fases</span>
              <strong>{segmentRateDisplay}</strong>
            </div>
            <div>
              <span>Ventana analizada</span>
              <strong>{totalDaysLabel}</strong>
            </div>
            <p>{projection.summary}</p>
          </div>

          <div className="panel-footer">
            <p className="panel-caption">
              Seleccioná un cluster (por ejemplo 30 °C con medio rico) y el modelo alterna automáticamente
              entre fase exponencial y fase estabilizada.
            </p>
            <div className="panel-actions">
              <button type="button" className="ghost" onClick={onReset}>
                Reset
              </button>
              <button type="button" className="solid">Registrar lectura</button>
            </div>
          </div>
        </div>

        <div className="simulator-visual">
          <div className="visual-card">
            <div className="visual-header">
              <span>Crecimiento continuo proyectado</span>
              <span className="badge">Confianza {projection.confidence.toFixed(1)}%</span>
            </div>
            <svg viewBox="0 0 100 100" role="img" aria-label="Curva de crecimiento proyectada">
              <defs>
                <linearGradient id="curveGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5b9f7d" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#5b9f7d" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path d="M 0 90 L 100 90" stroke="#cfded3" strokeWidth="0.5" />
              <path d="M 0 70 L 100 70" stroke="#cfded3" strokeWidth="0.5" />
              <path d="M 0 50 L 100 50" stroke="#cfded3" strokeWidth="0.5" />
              <path d="M 0 30 L 100 30" stroke="#cfded3" strokeWidth="0.5" />
              <path d="M 0 10 L 100 10" stroke="#cfded3" strokeWidth="0.5" />
              {curvePath && <path d={curvePath} fill="none" stroke="#30785d" strokeWidth="2.8" strokeLinecap="round" />}
              {areaPath && <path d={areaPath} fill="url(#curveGradient)" opacity="0.45" />}
            </svg>
            <p className="graph-note">
              Identificá la fase exponencial para programar transferencias y optimizar recursos.
            </p>
          </div>

          <div className="visual-stats">
            <div>
              <span>Temperatura objetivo</span>
              <strong>{inputs.temperature} °C</strong>
            </div>
            <div>
              <span>Medio seleccionado</span>
              <strong>{selectedMedium.label}</strong>
            </div>
            <div>
              <span>Horizonte</span>
              <strong>{selectedDuration.label}</strong>
            </div>
            <div>
              <span>Inicio (t0)</span>
              <strong>{summary.initial?.toLocaleString?.('es-AR') ?? '—'} ufc</strong>
            </div>
            <div>
              <span>Capacidad esperada</span>
              <strong>{summary.carryingCapacity?.toFixed?.(0) ?? '—'} ufc</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SimulatorSection