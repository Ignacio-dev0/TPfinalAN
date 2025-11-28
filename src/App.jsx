import { useMemo, useState, useEffect } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import BacteriaCanvas from './components/BacteriaCanvas'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SimulatorSection from './components/SimulatorSection'
import PlansSection from './components/PlansSection'
import FaqSection from './components/FaqSection'
import ContactSection from './components/ContactSection'
import DownloadSection from './components/DownloadSection'
import Footer from './components/Footer'
import { buildCurve, computeMetrics, generateGrowthSeries } from './utils/simulator'
import initScrollReveal from './utils/scrollReveal' // Asegúrate de que la ruta sea correcta

const faqItems = [
  {
    title: '¿Cómo se interpreta el gráfico?',
    body:
      'Describe el comportamiento esperado del cultivo. El ascenso indica la fase exponencial de crecimiento y el descenso marca el momento en el que la población necesita intervenirse.',
  },
  {
    title: '¿Qué significa "nivel de confianza"?',
    body:
      'Es la probabilidad de que el resultado se mantenga dentro de los márgenes esperados. A mayor nivel, mayor seguridad estadística al tomar decisiones.',
  },
  {
    title: '¿Cómo se usa el simulador?',
    body:
      'Completa la población inicial, la tasa estimada de crecimiento y la cantidad de intervalos a analizar. Calculamos el volumen proyectado, el nivel de confianza y graficamos la tendencia.',
  },
  {
    title: '¿Los datos de mis muestras son confidenciales?',
    body:
     'Absolutamente. BioLab Digital utiliza encriptación de extremo a extremo para asegurar que la información sensible de tus cultivos y resultados permanezca privada y accesible solo para usuarios autorizados.'
  }
]

const plans = [
  {
    name: 'Starter',
    price: 'Gratis',
    description: 'Ideal para estudiantes y validaciones rápidas.',
    features: [
      'Simulación de 1 cultivo a la vez',
      'Acceso a curvas de crecimiento estándar',
      'Panel de métricas en tiempo real',
      'Exportación de datos básica (.CSV)',
      'Soporte vía comunidad/foro'
    ],
    cta: 'Comenzar sin costo',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$28.000 / mes',
    description: 'Diseñado para laboratorios pequeños e investigadores independientes.',
    features: [
      'Todo lo del plan Starter, más:',
      'Simulaciones simultáneas (hasta 5 cultivos)',
      'Reportes comparativos y descarga en PDF profesional',
      'Calibración guiada del simulador',
      'Historial de experimentos (6 meses en nube)',
      'Soporte prioritario por email (24hs)'
    ],
    cta: 'Solicitar Demo',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: '$65.000 / mes',
    description: 'Para industria farmacéutica y centros de investigación de alto rendimiento.',
    features: [
      'Todo lo del plan Professional, más:',
      'Simulaciones ilimitadas y análisis predictivo con IA',
      'Integración con sistemas LIMS y CRM',
      'Análisis por intervalos personalizados',
      'Acceso multi-usuario para equipos',
      'Soporte 24/7 y consultoría técnica'
    ],
    cta: 'Consultar Precio',
    highlighted: false,
  }
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

  // Inicializar scroll reveal cuando el componente se monte
  useEffect(() => {
    // Pequeño delay para asegurar que el DOM esté completamente renderizado
    const timer = setTimeout(() => {
      initScrollReveal({
        selector: '.reveal',
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
        once: true,
        staggerMs: 80
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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
      <BacteriaCanvas count={220} />
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
        <DownloadSection />
        <PlansSection plans={plans} />
        <FaqSection items={faqItems} />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

export default App