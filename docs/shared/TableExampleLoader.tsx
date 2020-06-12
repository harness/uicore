import dynamic from 'next/dynamic'

export const TableExample1 = dynamic(() => import('./TableExample').then(m => m.TableExample), {
  ssr: false
})

export const TableExample2 = dynamic(() => import('./TableExample').then(m => m.TableExample2), {
  ssr: false
})

export default {
  TableExample1,
  TableExample2
}
