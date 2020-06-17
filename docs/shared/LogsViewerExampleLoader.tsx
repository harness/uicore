import dynamic from 'next/dynamic'

export const LogsViewerExampleLoader = dynamic(() => import('./LogsViewerExample'), {
  ssr: false
})
