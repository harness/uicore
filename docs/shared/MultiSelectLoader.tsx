import dynamic from 'next/dynamic'

export const AsyncSelect = dynamic(() => import('./MultiSelect').then(m => m.AsyncSelect), {
  ssr: false
})
export const SimpleSelect = dynamic(() => import('./MultiSelect').then(m => m.SimpleSelect), {
  ssr: false
})
