import React from 'react'
import { render } from '@testing-library/react'
import { AvatarGroup } from './AvatarGroup'
describe('Render basic component', () => {
  test('should check snapshot with Avatar props with add button', () => {
    const { container } = render(
      <AvatarGroup
        onAdd={() => {}}
        avatars={[
          { name: 'Aahn Boe SS', color: 'red' },
          { email: 'CohnDoe.com.HD@harnes.io', color: 'red' },
          { name: 'Eahn Foe', color: 'red' },
          { name: 'Gahn Hoe', color: 'red' },
          {
            src:
              'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg',
            color: 'red'
          }
        ]}
      />
    )
    expect(container).toMatchSnapshot()
  })
  test('should check snapshot with Avatar props without add button', () => {
    const { container } = render(
      <AvatarGroup
        avatars={[
          { name: 'Aahn Boe SS', color: 'red' },
          { email: 'CohnDoe.com.HD@harnes.io', color: 'red' },
          { name: 'EahnFoe', color: 'red' },
          { name: 'Gahn Hoe', color: 'red' },
          {
            src:
              'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg',
            color: 'red'
          }
        ]}
      />
    )
    expect(container).toMatchSnapshot()
  })
})
