import React from 'react'
import { render } from '@testing-library/react'
import { Carousel } from './Carousel'

const DummyComponent = () => {
  return (
    <Carousel>
      <div style={{ backgroundColor: 'red', height: 400, color: 'white', textAlign: 'center' }}>Image 1</div>
      <div style={{ backgroundColor: 'blue', height: 400, color: 'white', textAlign: 'center' }}>Image 2</div>
      <div style={{ backgroundColor: 'green', height: 400, color: 'white', textAlign: 'center' }}>Image 3</div>
      <div style={{ backgroundColor: 'red', height: 400, color: 'white', textAlign: 'center' }}>Image 4</div>
      <div style={{ backgroundColor: 'blue', height: 400, color: 'white', textAlign: 'center' }}>Image 5</div>
      <div style={{ backgroundColor: 'green', height: 400, color: 'white', textAlign: 'center' }}>Image 6</div>
    </Carousel>
  )
}

describe('Render basic component', () => {
  test('should check snapshot', () => {
    const { container } = render(<DummyComponent />)
    expect(container).toMatchSnapshot()
  })
})
