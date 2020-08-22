import dynamic from 'next/dynamic'

export const ExampleWidgetSubviewForSelect = dynamic(() => import('./ExampleWidgetSubviewForSelect'), {
  ssr: false
})

export const ExampleFormSubviewForSelect = dynamic(
  () => import('./ExampleFormSubviewForSelect').then(mod => mod.ExampleFormSubviewForSelect),
  {
    ssr: false
  }
)

export const ExampleFormSubviewForMultiSelect = dynamic(
  () => import('./ExampleFormSubviewForSelect').then(mod => mod.ExampleFormSubviewForMultiSelect),
  {
    ssr: false
  }
)

export default {
  ExampleWidgetSubviewForSelect,
  ExampleFormSubviewForSelect,
  ExampleFormSubviewForMultiSelect
}
