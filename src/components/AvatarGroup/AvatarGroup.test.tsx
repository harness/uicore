import React from 'react'
import { render } from '@testing-library/react'
import { AvatarGroup } from './AvatarGroup'
import { Color } from '../../core/Color'

describe('Render basic component', () => {
  test('should check snapshot with Avatar props with add button', () => {
    const { container } = render(
      <AvatarGroup
        // eslint-disable-next-line
        onAdd={() => {}}
        avatars={[
          { name: 'Aahn Boe SS', backgroundColor: Color.RED_100 },
          { email: 'CohnDoe.com.HD@harnes.io', backgroundColor: Color.RED_100 },
          { name: 'Eahn Foe', backgroundColor: Color.RED_100 },
          { name: 'Gahn Hoe', backgroundColor: Color.RED_100 },
          {
            src:
              'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg',
            backgroundColor: Color.RED_100
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
          { name: 'Aahn Boe SS', backgroundColor: Color.RED_100 },
          { email: 'CohnDoe.com.HD@harnes.io', backgroundColor: Color.RED_100 },
          { name: 'EahnFoe', backgroundColor: Color.RED_100 },
          { name: 'Gahn Hoe', backgroundColor: Color.RED_100 },
          { name: '' },
          {
            src:
              'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg',
            backgroundColor: Color.RED_100
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
          { name: 'Aahn Boe SS', backgroundColor: Color.RED_100 },
          { email: 'CohnDoe.com.HD@harnes.io', backgroundColor: Color.RED_100 },
          { name: 'EahnFoe', backgroundColor: Color.RED_100 },
          { name: 'Gahn Hoe', backgroundColor: Color.RED_100 },
          { name: '' },
          {
            src:
              'https://image.shutterstock.com/image-photo/buddha-statue-hyderabadhyderabadindia-260nw-1366155431.jpg',
            backgroundColor: Color.RED_100
          }
        ]}
      />
    )
    expect(container).toMatchSnapshot()
  })
})
