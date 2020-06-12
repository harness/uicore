import dynamic from 'next/dynamic'

const SimpleSelect = dynamic(() => import('./SelectV2').then(m => m.SimpleSelect), {
  ssr: false
})

const AsyncSelect = dynamic(() => import('./SelectV2').then(m => m.AsyncSelect), {
  ssr: false
})

export default {
  SimpleSelect,
  AsyncSelect
}
