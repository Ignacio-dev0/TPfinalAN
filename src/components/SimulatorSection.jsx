import React, { useState } from 'react'
import experimentalData from '../data/experimentalData.json'

// 1) Definición de modelos por cluster
const CLUSTERS = {
  '25_limitado': {
    temp: 25,
    medium: 'limitado',
    tCut: 4.2,
    exp: (t) => 0.064 * Math.exp(0.607 * t),
    lin: (t) => 0.0125 * t + 0.684,
  },
  '25_rico': {
    temp: 25,
    medium: 'rico',
    tCut: 3.8,
    exp: (t) => 0.163 * Math.exp(0.527 * t),
    lin: (t) => 0.0099 * t + 0.915,
  },
  '30_limitado': {
    temp: 30,
    medium: 'limitado',
    tCut: 3.6,
    exp: (t) => 0.051 * Math.exp(0.795 * t),
    lin: (t) => 0.0089 * t + 0.788,
  },
  '30_rico': {
    temp: 30,
    medium: 'rico',
    tCut: 2.9,
    exp: (t) => 0.168 * Math.exp(0.652 * t),
    lin: (t) => 0.008 * t + 0.869,
  },
  '37_limitado': {
    temp: 37,
    medium: 'limitado',
    tCut: 2.7,
    exp: (t) => 0.029 * Math.exp(1.241 * t),
    lin: (t) => 0.0057 * t + 0.707,
  },
  '37_rico': {
    temp: 37,
    medium: 'rico',
    tCut: 2.2,
    exp: (t) => 0.25 * Math.exp(0.7722 * t),
    lin: (t) => 0.0044 * t + 0.889,
  },
}

// 2) Helpers para clave de cluster y lectura de datos
function makeKey(temp, medium) {
  return `${temp}_${medium}`
}

function getExperimentalValue(key, t) {
  const points = experimentalData[key]
  if (!points) return null
  const eps = 1e-6
  const match = points.find((p) => Math.abs(p.t - t) < eps)
  return match ? match.y : null
}

// 3) Función general de cálculo de crecimiento
function getGrowthValue(temp, medium, t) {
  const key = makeKey(temp, medium)
  const cluster = CLUSTERS[key]

  if (!cluster || t < 0 || Number.isNaN(t)) return null

  const phase = t <= cluster.tCut ? 'crecimiento' : 'desaceleración'

  // 1) Intentar primero con el dato experimental
  const fromData = getExperimentalValue(key, t)
  if (fromData != null) {
    return {
      value: fromData,
      source: 'experimental',
      phase,
      tCut: cluster.tCut,
    }
  }

  // 2) Si no hay dato, usar el modelo
  const modelValue = t <= cluster.tCut ? cluster.exp(t) : cluster.lin(t)
  return {
    value: modelValue,
    source: 'modelo',
    phase,
    tCut: cluster.tCut,
  }
}

// 4) Componente principal del simulador
const SimulatorSection = () => {
  // Simulación simple
  const [singleInput, setSingleInput] = useState({
    temp: 25,
    medium: 'limitado',
    time: 0,
  })
  const [singleResult, setSingleResult] = useState(null)

  // Comparación entre dos condiciones
  const [compareInput, setCompareInput] = useState({
    temp1: 25,
    medium1: 'limitado',
    temp2: 37,
    medium2: 'rico',
    time: 2,
  })
  const [compareResult, setCompareResult] = useState(null)

  const handleSingleChange = (e) => {
    const { name, value } = e.target
    setSingleInput((prev) => ({
      ...prev,
      [name]:
        name === 'time'
          ? Number(value)
          : name === 'temp'
          ? Number(value)
          : value,
    }))
  }

  const handleCompareChange = (e) => {
    const { name, value } = e.target
    setCompareInput((prev) => ({
      ...prev,
      [name]:
        name === 'time' || name.startsWith('temp')
          ? Number(value)
          : value,
    }))
  }

  const handleSingleSimulate = () => {
    const { temp, medium, time } = singleInput
    const result = getGrowthValue(temp, medium, time)
    setSingleResult(result)
  }

  const handleCompareSimulate = () => {
    const { temp1, medium1, temp2, medium2, time } = compareInput
    const r1 = getGrowthValue(temp1, medium1, time)
    const r2 = getGrowthValue(temp2, medium2, time)
    setCompareResult({ r1, r2 })
  }

  const resetAll = () => {
    setSingleInput({ temp: 25, medium: 'limitado', time: 0 })
    setCompareInput({
      temp1: 25,
      medium1: 'limitado',
      temp2: 37,
      medium2: 'rico',
      time: 2,
    })
    setSingleResult(null)
    setCompareResult(null)
  }

  return (
    <section className="simulator" id="simulador">
      <div className="section-heading">
        <h2>Simulador</h2>
        <p>
          Explorá el crecimiento normalizado de <em>E. coli</em> según la temperatura, el medio y el tiempo.
          El simulador combina datos experimentales y modelos ajustados por mínimos cuadrados.
        </p>
      </div>

      <div className="simulator-content">
        {/* IZQUIERDA: comparación entre condiciones */}
        <div className="simulator-panel simulator-panel--compare">
          <h2>Comparación entre condiciones</h2>

          <div className="panel-block">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="experiment-form comparison"
            >
              <div className="comparison-row">
                <div>
                  <h4>Condición A</h4>
                  <label>
                    Temperatura (°C)
                    <select
                      name="temp1"
                      value={compareInput.temp1}
                      onChange={handleCompareChange}
                    >
                      <option value={25}>25 °C</option>
                      <option value={30}>30 °C</option>
                      <option value={37}>37 °C</option>
                    </select>
                  </label>
                  <label>
                    Medio
                    <select
                      name="medium1"
                      value={compareInput.medium1}
                      onChange={handleCompareChange}
                    >
                      <option value="limitado">Limitado</option>
                      <option value="rico">Rico</option>
                    </select>
                  </label>
                </div>

                <div>
                  <h4>Condición B</h4>
                  <label>
                    Temperatura (°C)
                    <select
                      name="temp2"
                      value={compareInput.temp2}
                      onChange={handleCompareChange}
                    >
                      <option value={25}>25 °C</option>
                      <option value={30}>30 °C</option>
                      <option value={37}>37 °C</option>
                    </select>
                  </label>
                  <label>
                    Medio
                    <select
                      name="medium2"
                      value={compareInput.medium2}
                      onChange={handleCompareChange}
                    >
                      <option value="limitado">Limitado</option>
                      <option value="rico">Rico</option>
                    </select>
                  </label>
                </div>
              </div>

              <label>
                Tiempo común (h)
                <input
                  type="number"
                  name="time"
                  min="0"
                  step="0.1"
                  value={compareInput.time}
                  onChange={handleCompareChange}
                />
              </label>

              <button
                type="button"
                className="solid primary-button"
                onClick={handleCompareSimulate}
              >
                Comparar crecimiento
              </button>
            </form>

            {compareResult && compareResult.r1 && compareResult.r2 && (
              <div className="panel-results">
                <div>
                  <span>Condición A</span>
                  <strong>{compareResult.r1.value.toFixed(3)}</strong>
                </div>
                <div>
                  <span>Condición B</span>
                  <strong>{compareResult.r2.value.toFixed(3)}</strong>
                </div>
                <div>
                  <span>Comparación</span>
                  <strong>
                    {compareResult.r1.value > compareResult.r2.value
                      ? 'A presenta mayor crecimiento en ese tiempo'
                      : compareResult.r1.value < compareResult.r2.value
                      ? 'B presenta mayor crecimiento en ese tiempo'
                      : 'Ambas condiciones presentan el mismo valor'}
                  </strong>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DERECHA: simulación de una sola condición */}
        <div className="simulator-panel simulator-panel--single">
          <h2>Calculadora de crecimiento</h2>

          <div className="panel-block">
            <h3>Simulación por condición</h3>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="experiment-form"
            >
              <label>
                Temperatura (°C)
                <select
                  name="temp"
                  value={singleInput.temp}
                  onChange={handleSingleChange}
                >
                  <option value={25}>25 °C</option>
                  <option value={30}>30 °C</option>
                  <option value={37}>37 °C</option>
                </select>
              </label>

              <label>
                Medio de cultivo
                <select
                  name="medium"
                  value={singleInput.medium}
                  onChange={handleSingleChange}
                >
                  <option value="limitado">Limitado</option>
                  <option value="rico">Rico</option>
                </select>
              </label>

              <label>
                Tiempo (h)
                <input
                  type="number"
                  name="time"
                  min="0"
                  step="0.1"
                  value={singleInput.time}
                  onChange={handleSingleChange}
                />
              </label>

              <button
                type="button"
                className="solid primary-button"
                onClick={handleSingleSimulate}
              >
                Calcular crecimiento
              </button>
            </form>

            {singleResult && (
              <div className="panel-results">
                <div>
                  <span>Valor de crecimiento normalizado</span>
                  <strong>{singleResult.value.toFixed(3)}</strong>
                </div>
                <div>
                  <span>Fuente</span>
                  <strong>
                    {singleResult.source === 'experimental'
                      ? 'Dato experimental'
                      : 'Modelo ajustado'}
                  </strong>
                </div>
                <div>
                  <span>Fase</span>
                  <strong>
                    {singleResult.phase === 'crecimiento'
                      ? 'Crecimiento (fase exponencial)'
                      : 'Desaceleración (fase lineal)'}
                  </strong>
                </div>
                <div>
                  <span>Tiempo de corte de la condición</span>
                  <strong>{singleResult.tCut} h</strong>
                </div>
              </div>
            )}
          </div>

          <div className="panel-footer">
            <p className="panel-caption">
              El simulador utiliza los datos experimentales cuando están disponibles y recurre a los modelos ajustados
              para interpolar valores intermedios.
            </p>
            <div className="panel-actions">
              <button
                type="button"
                className="ghost secondary-button"
                onClick={resetAll}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SimulatorSection
