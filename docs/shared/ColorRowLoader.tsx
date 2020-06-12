import dynamic from 'next/dynamic'

export const ColorRow = dynamic(() => import('./ColorRow'), {
  ssr: false
})
