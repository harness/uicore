import dynamic from 'next/dynamic'

export const RadioSelectExample = dynamic(() => import('./RadioSelectExample').then(m => m.RadioSelectExample), {
  ssr: false
})
