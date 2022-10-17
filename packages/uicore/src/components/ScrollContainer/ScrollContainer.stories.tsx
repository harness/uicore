/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { ReactNode, useState } from 'react'
import { ArgsTable, Description, Primary, PRIMARY_STORY, Stories, Subtitle, Title } from '@storybook/addon-docs'
import { Story } from '@storybook/react'
import { Button, ButtonVariation } from '../Button/Button'
import { ScrollContainer, ScrollContainerProps } from './ScrollContainer'

export default {
  title: 'Components / ScrollContainer',
  component: ScrollContainer,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },
      page: function PageDescription(): ReactNode {
        return (
          <>
            <Title>ScrollContainer</Title>
            <Subtitle>
              <pre>{`import { ScrollContainer } from '@harness/uicore'`}</pre>
            </Subtitle>
            <Description>
              `ScrollContainer` takes children and shows shadows at the top, bottom to indicate that there is content to
              scroll in that direction.
            </Description>
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />
            <Stories />
          </>
        )
      }
    }
  }
}

export const WithOverflow: Story<ScrollContainerProps> = args => {
  return (
    <div style={{ height: '400px', width: '400px' }}>
      <ScrollContainer {...args}>
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <p key={index}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto consectetur dolorem dolores
              eaque illum iusto laboriosam, odit provident sapiente tenetur, veritatis. Aperiam blanditiis cum
              dignissimos eveniet praesentium repellendus similique?
            </p>
          ))}
      </ScrollContainer>
    </div>
  )
}
WithOverflow.storyName = 'With overflow'

export const WithoutOverflow: Story<ScrollContainerProps> = args => {
  return (
    <div style={{ height: '400px', width: '400px' }}>
      <ScrollContainer {...args}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto consectetur dolorem dolores eaque
          illum iusto laboriosam, odit provident sapiente tenetur, veritatis. Aperiam blanditiis cum dignissimos eveniet
          praesentium repellendus similique?
        </p>
      </ScrollContainer>
    </div>
  )
}
WithoutOverflow.storyName = 'Without overflow'

export const WithDynamicContent: Story<ScrollContainerProps> = args => {
  const [show, setShow] = useState(true)
  return (
    <>
      <Button
        margin={{ bottom: 'large' }}
        variation={ButtonVariation.PRIMARY}
        text="Toggle Content"
        onClick={() => setShow(prev => !prev)}
      />
      <div style={{ height: '400px', width: '400px' }}>
        <ScrollContainer {...args}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto consectetur dolorem dolores eaque
            illum iusto laboriosam, odit provident sapiente tenetur, veritatis. Aperiam blanditiis cum dignissimos
            eveniet praesentium repellendus similique?
          </p>
          {show && (
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui perferendis dignissimos voluptas eaque
              distinctio molestias itaque et animi blanditiis nam, esse voluptatum iure dolores odit impedit consectetur
              quia vero delectus eveniet sunt voluptate nesciunt, asperiores nulla. Nam maxime recusandae eum. Nesciunt
              debitis nulla dolore in consequuntur, aspernatur obcaecati eius excepturi soluta, veniam nisi iure ad
              architecto consequatur, ipsam dolor numquam reiciendis. Illum ipsa, doloremque placeat a sunt distinctio
              officia dolore possimus culpa ex quam animi expedita, perferendis saepe nulla, eius architecto est
              temporibus rem dolores! Minima laboriosam illo iusto corrupti, animi, inventore debitis magni modi
              voluptate minus repellendus labore odio perferendis quod explicabo ea saepe aliquid dolores quo! Cum
              maiores natus esse optio ipsum autem amet doloremque. Aut tempore aliquid veniam enim quidem facere
              dolorum dolorem vero quae, rem eligendi necessitatibus alias, blanditiis nam asperiores. Recusandae
              voluptatem laboriosam ducimus itaque corrupti ab corporis earum incidunt aliquid animi esse, et eligendi
              minima deleniti veritatis obcaecati provident voluptas eum cupiditate! Ipsa eligendi hic, exercitationem
              reprehenderit dolor alias eos incidunt temporibus expedita. Qui veritatis repellendus omnis, ea voluptatem
              natus autem exercitationem aliquid molestias fuga. Voluptate, totam aliquid laudantium repudiandae
              officiis, voluptatum ullam earum, soluta minima consequuntur officia nobis quas fugiat quae quasi vero.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. In recusandae consequatur rerum? Odit,
              voluptatem officia. Earum ad, nulla et aliquam iste iure sit officiis exercitationem voluptas ducimus,
              deleniti, ipsa nihil! Aliquam neque consequatur perspiciatis, magni animi possimus facilis distinctio
              corrupti labore exercitationem reiciendis minus, iusto ipsam vitae! Nihil, modi. Corrupti, et iure!
              Provident quibusdam, repellendus deleniti corporis architecto, reprehenderit cum eveniet necessitatibus
              commodi, vitae aut maiores sed ratione accusamus. Odit adipisci aperiam voluptates beatae ducimus mollitia
              amet rem dolore laborum corrupti? Ullam obcaecati magnam eius dolores beatae, iste optio incidunt ipsum
              consectetur quod neque officiis tempore perspiciatis ex nulla quis?
            </p>
          )}
        </ScrollContainer>
      </div>
    </>
  )
}
WithDynamicContent.storyName = 'With dynamic content'

export const WithResizableWrapper: Story<ScrollContainerProps> = args => {
  return (
    <div style={{ height: '400px', width: '400px', resize: 'both', overflow: 'scroll' }}>
      <ScrollContainer {...args}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui perferendis dignissimos voluptas eaque distinctio
          molestias itaque et animi blanditiis nam, esse voluptatum iure dolores odit impedit consectetur quia vero
          delectus eveniet sunt voluptate nesciunt, asperiores nulla. Nam maxime recusandae eum. Nesciunt debitis nulla
          dolore in consequuntur, aspernatur obcaecati eius excepturi soluta, veniam nisi iure ad architecto
          consequatur, ipsam dolor numquam reiciendis. Illum ipsa, doloremque placeat a sunt distinctio officia dolore
          possimus culpa ex quam animi expedita, perferendis saepe nulla, eius architecto est temporibus rem dolores!
          Minima laboriosam illo iusto corrupti, animi, inventore debitis magni modi voluptate minus repellendus labore
          odio perferendis quod explicabo ea saepe aliquid dolores quo! Cum maiores natus esse optio ipsum autem amet
          doloremque.
        </p>
      </ScrollContainer>
    </div>
  )
}
WithResizableWrapper.storyName = 'With resizable wrapper'
