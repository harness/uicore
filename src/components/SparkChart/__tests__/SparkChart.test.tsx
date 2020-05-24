import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SparkChart } from '../SparkChart'
import { Color } from 'core/Color';


describe('SparkChrt unit tests', () => {
  test('render spark chart with data', () => {
    const { container } = render(
      <SparkChart data={[2, 3, 4, 1, 5, 2, 5]} />
    );

    expect(container.querySelectorAll('.progress-bar').length).toBe(7)
  })

  test('render spark chart with custom props', () => {
    const mockOnClick = jest.fn(() => { })
    const { container, getByRole } = render(
      <SparkChart data={[2, 3, 4, 1, 5, 2, 5]} onClick={mockOnClick} color={Color.BLACK} className={'custom'} />
    );

    expect(container.querySelectorAll('.progress-bar').length).toBe(7)
    fireEvent.click(getByRole('spark-chart'));
    expect(mockOnClick).toBeCalled();
  })

});