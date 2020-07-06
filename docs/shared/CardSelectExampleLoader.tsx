import dynamic from 'next/dynamic'

export const CardSelectExample = dynamic(() => import('./CardSelectExample').then(m => m.CardSelectExample), {
  ssr: false
})

export const CardMultiSelectExample = dynamic(() => import('./CardSelectExample').then(m => m.CardMultiSelectExample), {
  ssr: false
})
