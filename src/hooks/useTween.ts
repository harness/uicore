import { useRef, useState } from 'react'

type TimingFunction = (time: number) => number

function makeEaseInOut(timing: TimingFunction): TimingFunction {
  return function(time: number) {
    if (time < 0.5) return timing(2 * time) / 2
    else return (2 - timing(2 * (1 - time))) / 2
  }
}

export const Easing = {
  linear: (time: number) => time,
  easeInOutQuad: makeEaseInOut(time => time ** 2),
  easeInOutCubic: makeEaseInOut(time => time ** 2),
  easeInOutQuart: makeEaseInOut(time => time ** 2)
}

export function useTween(
  initial: number,
  { easing: timing = Easing.easeInOutQuad, duration = 250, onEnd = () => {} } = {}
): [number, (to: number) => void] {
  const raf = useRef<number | null>(null)
  const [state, setState] = useState(initial)

  return [
    state,
    (to: number) => {
      if (raf.current) cancelAnimationFrame(raf.current)

      let start: number
      function animate(time: number) {
        start = start || time
        const delta = (time - start) / duration,
          progress = delta > 1 ? 1 : delta

        setState(state + (to - state) * timing(progress))

        if (progress < 1) raf.current = requestAnimationFrame(animate)
        else {
          raf.current = null
          onEnd()
        }
      }

      if (to !== state) raf.current = requestAnimationFrame(animate)
    }
  ]
}
