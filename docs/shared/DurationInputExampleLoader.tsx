import dynamic from 'next/dynamic'

export const DurationInputExample = dynamic(() => import('./DurationInputExample'), {
  ssr: false
})
