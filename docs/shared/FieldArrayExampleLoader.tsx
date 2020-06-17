import dynamic from 'next/dynamic'

export const FieldArrayExample = dynamic(() => import('./FieldArrayExample'), {
  ssr: false
})
