const MIN_SAMPLES = 60

export function generateGrowthSeries({ initial, carryingCapacity, earlyRate, totalDays, switchTime }) {
  const safeInitial = Math.max(1, Number.isFinite(initial) ? initial : 1)
  const safeDays = Math.max(1, Number.isFinite(totalDays) ? totalDays : 1)
  const safeEarlyRate = Math.max(0.02, Number.isFinite(earlyRate) ? earlyRate : 0.1)
  const maxSwitch = safeDays - safeDays * 0.1
  const proposedSwitch = Number.isFinite(switchTime) ? switchTime : safeDays * 0.45
  const safeSwitch = Math.min(Math.max(0.4, proposedSwitch), maxSwitch)

  const rawCapacity = Number.isFinite(carryingCapacity) ? carryingCapacity : safeInitial * 4
  const minCapacity = safeInitial * 1.6
  const safeCapacity = Math.max(minCapacity, rawCapacity)

  const steps = Math.max(MIN_SAMPLES, Math.round(safeDays * 18))
  const deltaT = safeDays / steps

  const exponentialSwitchValue = safeInitial * Math.exp(safeEarlyRate * safeSwitch)
  const safeSwitchValue = Math.min(exponentialSwitchValue, safeCapacity * 0.92)
  const adjustedCapacity = safeCapacity <= safeSwitchValue ? safeSwitchValue * 1.12 : safeCapacity
  const finalSwitchValue = Math.min(safeSwitchValue, adjustedCapacity * 0.96)
  const lateRate = safeEarlyRate * adjustedCapacity / Math.max(adjustedCapacity - finalSwitchValue, 1)
  const logisticShape = adjustedCapacity / finalSwitchValue - 1

  const series = []
  for (let index = 0; index <= steps; index += 1) {
    const time = index * deltaT
    let value
    if (time <= safeSwitch) {
      value = safeInitial * Math.exp(safeEarlyRate * time)
    } else {
      const shift = time - safeSwitch
      value = adjustedCapacity / (1 + logisticShape * Math.exp(-lateRate * shift))
    }

    if (series.length > 0 && value < series[series.length - 1].value) {
      const previous = series[series.length - 1].value
      value = previous + (adjustedCapacity - previous) * 0.01
    }

    series.push({ time, value })
  }

  return {
    series,
    metadata: {
      initial: safeInitial,
      totalDays: safeDays,
      switchTime: safeSwitch,
      carryingCapacity: adjustedCapacity,
    },
  }
}

export function buildCurve(series) {
  if (!Array.isArray(series) || series.length === 0) {
    return ''
  }

  const maxValue = Math.max(...series.map((point) => point.value))
  const totalTime = series[series.length - 1]?.time ?? 1

  return series
    .map((point, index) => {
      const x = totalTime === 0 ? 0 : (point.time / totalTime) * 100
      const normalized = maxValue === 0 ? 0 : (point.value / maxValue) * 80
      const y = 90 - normalized
      const command = index === 0 ? 'M' : 'L'
      return `${command} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

export function computeMetrics(series, metadata) {
  if (!Array.isArray(series) || series.length === 0 || !metadata) {
    return {
      finalValue: 0,
      totalIncrease: 0,
      averageRate: 0,
      segmentRate: 0,
      summary: 'Introduce valores válidos para obtener una proyección continua.',
      confidence: 0,
    }
  }

  const initial = metadata.initial
  const totalDays = metadata.totalDays
  const finalPoint = series[series.length - 1]
  const finalValue = finalPoint.value
  const totalIncrease = Math.max(0, finalValue - initial)
  const averageRate = totalDays > 0 ? ((finalValue / initial) ** (1 / totalDays) - 1) * 100 : 0

  const fromTime = Math.min(metadata.switchTime, totalDays * 0.5)
  const toTime = totalDays
  const fromValue = getValueAtTime(series, fromTime)
  const toValue = getValueAtTime(series, toTime)
  const segmentDuration = Math.max(toTime - fromTime, 1)
  const segmentRate = (toValue - fromValue) / segmentDuration

  const summary = `La población alcanzaría ${finalValue.toFixed(
    0
  )} ufc en ${totalDays.toFixed(0)} día(s) con una transición suave entre fases.`
  const confidence = Math.min(98, 74 + Math.log10(finalValue + 1) * 6)

  return {
    finalValue,
    totalIncrease,
    averageRate,
    segmentRate,
    summary,
    confidence,
    initial,
    totalDays,
  }
}

function getValueAtTime(series, targetTime) {
  if (!Array.isArray(series) || series.length === 0) {
    return 0
  }

  if (targetTime <= series[0].time) {
    return series[0].value
  }

  for (let index = 1; index < series.length; index += 1) {
    const previous = series[index - 1]
    const current = series[index]
    if (targetTime <= current.time) {
      const span = current.time - previous.time
      const factor = span === 0 ? 0 : (targetTime - previous.time) / span
      return previous.value + factor * (current.value - previous.value)
    }
  }

  return series[series.length - 1].value
}
