import dynamic from 'next/dynamic'

export const ExampleWidgetSubviewForSelect = dynamic(() => import('./ExampleWidgetSubviewForSelect'), {
  ssr: false
})

export const ExampleFormSubviewForSelect = dynamic(() => import('./ExampleFormSubviewForSelect'), {
  ssr: false
})

export default {
  ExampleWidgetSubviewForSelect,
  ExampleFormSubviewForSelect
}
