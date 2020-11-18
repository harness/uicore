import React from 'react'
import { render } from '@testing-library/react'
import { AvatarGroup } from './AvatarGroup'
describe('Render basic component', () => {
  test('should check snapshot with Avatar props with add button', () => {
    const { container } = render(
      <AvatarGroup
        onAdd={() => {}}
        avatars={[
          { name: 'Aahn Boe SS', backgroundColor: 'red' },
          { email: 'CohnDoe.com.HD@harnes.io', backgroundColor: 'red' },
          { name: 'Eahn Foe', backgroundColor: 'red' },
          { name: 'Gahn Hoe', backgroundColor: 'red' },
          {
            src:
              'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg',
            backgroundColor: 'red'
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
          { name: 'Aahn Boe SS', backgroundColor: 'red' },
          { email: 'CohnDoe.com.HD@harnes.io', backgroundColor: 'red' },
          { name: 'EahnFoe', backgroundColor: 'red' },
          { name: 'Gahn Hoe', backgroundColor: 'red' },
          { name: '' },
          {
            src:
              'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg',
            backgroundColor: 'red'
          }
        ]}
      />
    )
    expect(container).toMatchSnapshot()
  })
  test('should check snapshot with Avatar props without overlap', () => {
    const { container } = render(
      <AvatarGroup
        overlap={false}
        avatars={[
          { name: 'Aahn Boe SS', backgroundColor: 'red' },
          { email: 'CohnDoe.com.HD@harnes.io', backgroundColor: 'red' },
          { name: 'EahnFoe', backgroundColor: 'red' },
          { name: 'Gahn Hoe', backgroundColor: 'red' },
          { name: '' },
          {
            src:
              'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg',
            backgroundColor: 'red'
          }
        ]}
      />
    )
    expect(container).toMatchSnapshot()
  })
})
