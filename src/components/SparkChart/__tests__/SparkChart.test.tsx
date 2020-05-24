import React from 'react'
import { render } from '@testing-library/react'
import { SparkChart } from '../SparkChart'


describe('SparkChrt unit tests', () => {
  test('render spark chart with data', () => {
    const { container } = render(
      <SparkChart data={[2, 3, 4, 1, 5, 2, 5]} />
    );

    expect(container.querySelectorAll('.progress-bar').length).toBe(7)
  })

});