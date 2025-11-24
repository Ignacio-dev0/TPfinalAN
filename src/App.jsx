import { useMemo, useState } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SimulatorSection from './components/SimulatorSection'
import PlansSection from './components/PlansSection'
import FaqSection from './components/FaqSection'
import ContactSection from './components/ContactSection'
import DownloadSection from './components/DownloadSection'
import Footer from './components/Footer'
import { buildCurve, computeMetrics, generateGrowthSeries } from './utils/simulator'

const faqItems = [
  {
    title: '¿Cómo se interpreta el gráfico?',
    body:
      'Dado un cultivo y sus datos, podemos determinar el nivel de crecimiento de la fase exponencial donde la bacteria se multiplica de manera extrema, la fase de aclimatacion, donde su crecimiento empieza a frenar y la fase estacionaria donde los recursos no son los suficientes para mantener el nivel de crecimiento exponencial y se estabilizan en una cantidad proporcional a la cantidad de alimento.',
  },
  {
    title: 'Guía AN Expo Final 1',
    body:
      'Este simulador integra los controles de calidad microbiológica y los tiempos de muestreo establecidos en la guía de trabajo final de Análisis Numérico. Cada parámetro configurable replica las condiciones experimentales sugeridas, permitiendo visualizar cómo diferentes factores ambientales (temperatura, medio de cultivo, duración) afectan el crecimiento microbiano. Las métricas calculadas incluyen proyecciones de población, niveles de confianza estadística y tendencias temporales que facilitan la toma de decisiones en laboratorio.',
  },
  {
    title: '¿Qué significa “nivel de confianza”?',
    body:
      'El nivel de confianza representa la probabilidad estadística de que los valores reales del cultivo se mantengan dentro de los intervalos proyectados por el simulador. Un nivel de confianza del 95% indica que, si repitiéramos el experimento bajo las mismas condiciones, esperaríamos que el 95% de las veces los resultados caigan dentro del rango estimado. Niveles más altos ofrecen mayor seguridad al tomar decisiones críticas en el control de calidad microbiológica, aunque pueden requerir intervalos de predicción más amplios.',
  },
  {
    title: '¿Cómo se usa el simulador?',
    body:
      'Para utilizar el simulador, primero selecciona la temperatura de incubación (que afecta la tasa de crecimiento), el tipo de medio de cultivo (básico, enriquecido o selectivo) y la duración del experimento. El sistema calcula automáticamente la población inicial óptima, la capacidad de carga del medio y la tasa de crecimiento ajustada. A partir de estos parámetros, genera una proyección visual que muestra las tres fases del crecimiento bacteriano, junto con métricas como el volumen proyectado al final del período, el nivel de confianza estadística y los puntos críticos de cambio de fase.',
  },
]

const plans = [
  {
    name: 'Starter',
    price: 'Gratis',
    description: 'Ideal para validar tu proceso con datos confiables desde el día uno.',
    features: [
      'Panel en tiempo real con métricas clave',
      'Calibración guiada del simulador',
      'Alertas básicas por correo',
    ],
    cta: 'Comenzar sin costo',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$28.000 / mes',
    description: 'Diseñado para laboratorios que necesitan precisión, trazabilidad y reportes automáticos.',
    features: [
      'Reportes comparativos y descarga en PDF',
      'Análisis por intervalos personalizados',
      'Integración con sistemas LIMS y CRM',
      'Soporte directo y humano 24/7',
    ],
    cta: 'Solicitar Demo',
    highlighted: true,
  },
]

const mediumOptions = [
  {
    value: 'basico',
    label: 'Medio básico',
    description: 'Control monitoreado con nutrientes esenciales y mínima intervención.',
    initial: 680,
    rateBias: -0.05,
    capacity: 3200,
    switchOffset: -0.2,
  },
  {
    value: 'enriquecido',
    label: 'Medio enriquecido',
    description: 'Mayor disponibilidad de nutrientes y buffers de estabilización acelerada.',
    initial: 1200,
    rateBias: 0.08,
    capacity: 7200,
    switchOffset: 0.4,
  },
  {
    value: 'selectivo',
    label: 'Medio selectivo',
    description: 'Orientado a aislar microorganismos resilientes con monitoreo riguroso.',
    initial: 940,
    rateBias: 0.02,
    capacity: 5200,
    switchOffset: 0.1,
  },
]

const durationOptions = [
  { value: '1', label: '1 día', days: 1 },
  { value: '3', label: '3 días', days: 3 },
  { value: '7', label: '7 días', days: 7 },
  { value: '14', label: '14 días', days: 14 },
  { value: '30', label: '30 días', days: 30 },
]

const defaultSimulatorInputs = {
  temperature: '27',
  medium: 'enriquecido',
  duration: '7',
}

function App() {
  const [inputs, setInputs] = useState(() => ({ ...defaultSimulatorInputs }))

  const modelInputs = useMemo(() => {
    const temperature = Number.parseFloat(inputs.temperature)
    const mediumProfile = mediumOptions.find((item) => item.value === inputs.medium) ?? mediumOptions[0]
    const durationProfile = durationOptions.find((item) => item.value === inputs.duration) ?? durationOptions[2]

    const normalizedTemp = Number.isFinite(temperature) ? temperature : 27
    const totalDays = durationProfile?.days ?? 7
    const baseRate = 0.24 + (normalizedTemp - 27) * 0.012 + mediumProfile.rateBias
    const earlyRate = Math.max(0.08, baseRate)
    const capacityBoost = 1 + (normalizedTemp - 27) * 0.015
    const carryingCapacity = Math.max(mediumProfile.capacity * capacityBoost, mediumProfile.initial * 1.6)
    const switchTime = Math.min(
      Math.max(1.2, 2.2 + mediumProfile.switchOffset + (normalizedTemp - 27) * 0.08),
      totalDays * 0.65
    )

    return {
      initial: mediumProfile.initial,
      carryingCapacity,
      earlyRate,
      totalDays,
      switchTime,
    }
  }, [inputs])

  const simulation = useMemo(
    () => generateGrowthSeries(modelInputs),
    [modelInputs]
  )

  const projection = useMemo(
    () => computeMetrics(simulation.series, simulation.metadata),
    [simulation]
  )

  const curvePath = useMemo(
    () => buildCurve(simulation.series),
    [simulation]
  )

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setInputs((current) => ({ ...current, [name]: value }))
  }

  const handleReset = () => {
    setInputs(() => ({ ...defaultSimulatorInputs }))
  }

  return (
    <div className="site">
      <TopBar />

      <main>
        <HeroSection />
        <AboutSection />
        <SimulatorSection
          inputs={inputs}
          projection={projection}
          curvePath={curvePath}
          onInputChange={handleInputChange}
          onReset={handleReset}
          options={{ mediums: mediumOptions, durations: durationOptions }}
          summary={simulation.metadata}
        />
        <PlansSection plans={plans} />
        <FaqSection items={faqItems} />
        <ContactSection />
        <DownloadSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
