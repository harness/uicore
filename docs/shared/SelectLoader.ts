import dynamic from 'next/dynamic'

export const AsyncSelect = dynamic(() => import('./Select').then(m => m.AsyncSelect), {
  ssr: false
})
