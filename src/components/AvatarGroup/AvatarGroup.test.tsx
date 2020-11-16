import React from 'react'
import { render } from '@testing-library/react'
import { AvatarGroup } from './AvatarGroup'
describe('Render basic component', () => {
  test('should check snapshot with Avatar props with add button', () => {
    const { container } = render(
      <AvatarGroup
        onAdd={() => {}}
        avatars={[
          { name: 'Aahn Boe SS' },
          { email: 'CohnDoe.com.HD@harnes.io' },
          { name: 'Eahn Foe' },
          { name: 'Gahn Hoe' },
          {
            src: 'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg'
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
          { name: 'Aahn Boe SS' },
          { email: 'CohnDoe.com.HD@harnes.io' },
          { name: 'EahnFoe' },
          { name: 'Gahn Hoe' },
          {
            src: 'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg'
          }
        ]}
      />
    )
    expect(container).toMatchSnapshot()
  })
})
