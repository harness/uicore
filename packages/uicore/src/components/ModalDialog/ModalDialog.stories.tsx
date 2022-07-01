/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { ReactNode, useState } from 'react'
import { ArgsTable, Description, Primary, PRIMARY_STORY, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks'
import { Story } from '@storybook/react'
import { Color } from '@harness/design-system'
import { Button, ButtonVariation } from '../Button/Button'
import { TextInput } from '../TextInput/TextInput'
import { Icon } from '@harness/icons'
import { Layout } from '../../layouts/Layout'
import { ModalDialog, ModalDialogProps } from './ModalDialog'

export default {
  title: 'Components / ModalDialog',
  component: ModalDialog,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },
      page: function PageDescription(): ReactNode {
        return (
          <>
            <Title>ModalDialog</Title>
            <Subtitle>
              <pre>{`import { ModalDialog } from '@harness/uicore'`}</pre>
            </Subtitle>
            <Description>`ModalDialog` displays a dialog with heading, toolbar, body and footer.</Description>

            <Primary />
            <ArgsTable story={PRIMARY_STORY} />

            <Stories />
          </>
        )
      }
    }
  }
}

export const Basic: Story<ModalDialogProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button variation={ButtonVariation.PRIMARY} text="Open Dialog" onClick={() => setIsOpen(true)} />

      <ModalDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="ModalDialog title"
        footer={
          <Layout.Horizontal spacing="small">
            <Button variation={ButtonVariation.PRIMARY} text="Option 1" />
            <Button variation={ButtonVariation.SECONDARY} text="Option 2" />
          </Layout.Horizontal>
        }>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto consectetur dolorem dolores eaque
          illum iusto laboriosam, odit provident sapiente tenetur, veritatis. Aperiam blanditiis cum dignissimos eveniet
          praesentium repellendus similique?
        </p>
      </ModalDialog>
    </>
  )
}
Basic.storyName = 'Basic usage'

export const WithLongContent: Story<ModalDialogProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button variation={ButtonVariation.PRIMARY} text="Open Dialog" onClick={() => setIsOpen(true)} />

      <ModalDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="ModalDialog title"
        footer={
          <Layout.Horizontal spacing="small">
            <Button variation={ButtonVariation.PRIMARY} text="Option 1" />
            <Button variation={ButtonVariation.SECONDARY} text="Option 2" />
          </Layout.Horizontal>
        }>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid aperiam beatae consequuntur delectus
          dolorem doloribus ea eius itaque, iure modi numquam odio, odit optio placeat provident quisquam ratione sed!
        </p>
        <p>
          Autem consequatur deserunt dignissimos earum eos fugit hic incidunt iste iusto magni neque nihil non nostrum,
          obcaecati officia officiis praesentium quae quas quia quibusdam quo suscipit tempore totam vero voluptatum.
        </p>
        <p>
          Corporis deserunt earum est, facere ipsa itaque nemo nulla obcaecati optio perferendis possimus quae quas
          quasi quod ratione tempore voluptates? Beatae commodi enim inventore numquam officia pariatur quos rem
          voluptates.
        </p>
        <p>
          Corporis eaque inventore laboriosam quod reprehenderit similique, ut? A asperiores atque, delectus deleniti
          ea, esse explicabo iure maxime nesciunt nostrum officiis omnis quae quis reiciendis repellat repudiandae
          suscipit velit voluptatibus.
        </p>
        <p>
          Accusantium aliquam architecto, dolorem eius esse iste odio repellat tempore. Accusantium, architecto
          asperiores dicta eligendi error, est eum facere fuga inventore ipsa ipsum, magnam modi nulla quidem reiciendis
          voluptate voluptates.
        </p>
        <p>
          Corporis doloremque enim excepturi exercitationem laborum nesciunt nulla odio praesentium quae, quis,
          recusandae reiciendis repellat, ullam. At dolore eveniet maiores nobis nulla, numquam obcaecati tempora vero!
          Dicta illo minus voluptatum.
        </p>
        <p>
          Cum cupiditate doloribus exercitationem expedita iusto laboriosam libero, nam quam voluptas! Amet aut dolorum
          illum tempora. Architecto asperiores, debitis eaque exercitationem facere fugit ipsa mollitia nam nobis quasi,
          sequi ullam?
        </p>
        <p>
          Aperiam delectus harum impedit ipsa itaque, laboriosam maiores minima nam necessitatibus nisi nobis odio qui
          saepe similique sit tempore, ullam? Adipisci dolorem doloribus eius eveniet fugiat illum ipsum repellat sint.
        </p>
        <p>
          Ab cum distinctio eveniet iste minima non quisquam, recusandae repellendus suscipit totam voluptas voluptate!
          Ad autem corporis cumque dolore dolorem illum in iure iusto, odit optio repudiandae soluta vero voluptatum.
        </p>
        <p>
          Animi earum fuga, iusto labore nisi non provident quam qui quo quos recusandae temporibus tenetur? Debitis,
          fugit harum maxime necessitatibus nobis quos repudiandae sequi. Eum minus quaerat quas quia ut!
        </p>
      </ModalDialog>
    </>
  )
}
WithLongContent.storyName = 'With long content'

export const WithLongTitle: Story<ModalDialogProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button variation={ButtonVariation.PRIMARY} text="Open Dialog" onClick={() => setIsOpen(true)} />

      <ModalDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="This is the Modal Dialog title, but with extra words to make it bigger"
        footer={
          <Layout.Horizontal spacing="small">
            <Button variation={ButtonVariation.PRIMARY} text="Option 1" />
            <Button variation={ButtonVariation.SECONDARY} text="Option 2" />
          </Layout.Horizontal>
        }>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto consectetur dolorem dolores eaque
          illum iusto laboriosam, odit provident sapiente tenetur, veritatis. Aperiam blanditiis cum dignissimos eveniet
          praesentium repellendus similique?
        </p>
      </ModalDialog>
    </>
  )
}
WithLongContent.storyName = 'With long content'

export const WithCustomDimensions: Story<ModalDialogProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button variation={ButtonVariation.PRIMARY} text="Open Dialog" onClick={() => setIsOpen(true)} />

      <ModalDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Dialog title"
        width={700}
        height={500}
        footer={
          <Layout.Horizontal spacing="small">
            <Button variation={ButtonVariation.PRIMARY} text="Option 1" />
            <Button variation={ButtonVariation.SECONDARY} text="Option 2" />
          </Layout.Horizontal>
        }>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto consectetur dolorem dolores eaque
          illum iusto laboriosam, odit provident sapiente tenetur, veritatis. Aperiam blanditiis cum dignissimos eveniet
          praesentium repellendus similique?
        </p>
      </ModalDialog>
    </>
  )
}
WithCustomDimensions.storyName = 'With custom dimensions'

export const WithToolbar: Story<ModalDialogProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button variation={ButtonVariation.PRIMARY} text="Open Dialog" onClick={() => setIsOpen(true)} />

      <ModalDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Dialog title"
        toolbar={
          <div style={{ display: 'flex', gap: 'var(--spacing-small)' }}>
            <TextInput leftIcon="search" placeholder="Search..." />
            <Button
              variation={ButtonVariation.SECONDARY}
              text="Trigger action"
              icon="gear"
              iconProps={{ size: 14, color: Color.GREY_700 }}
            />
          </div>
        }>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto consectetur dolorem dolores eaque
          illum iusto laboriosam, odit provident sapiente tenetur, veritatis. Aperiam blanditiis cum dignissimos eveniet
          praesentium repellendus similique?
        </p>
      </ModalDialog>
    </>
  )
}
WithToolbar.storyName = 'With toolbar'

export const WithNoTitleOrFooter: Story<ModalDialogProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button variation={ButtonVariation.PRIMARY} text="Open Dialog" onClick={() => setIsOpen(true)} />

      <ModalDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto consectetur dolorem dolores eaque
          illum iusto laboriosam, odit provident sapiente tenetur, veritatis. Aperiam blanditiis cum dignissimos eveniet
          praesentium repellendus similique?
        </p>
      </ModalDialog>
    </>
  )
}
WithNoTitleOrFooter.storyName = 'With no title or footer'

export const AsAConfirmationDialog: Story<ModalDialogProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button variation={ButtonVariation.PRIMARY} text="Open Dialog" onClick={() => setIsOpen(true)} />

      <ModalDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          <>
            <Icon name="warning-sign" size={32} intent="danger" /> <span>Delete important thing?</span>
          </>
        }
        footer={
          <Layout.Horizontal spacing="small">
            <Button intent="danger" variation={ButtonVariation.PRIMARY} text="Delete" />
            <Button variation={ButtonVariation.TERTIARY} text="Cancel" onClick={() => setIsOpen(false)} />
          </Layout.Horizontal>
        }>
        <p>Are you sure you want to delete this important thing? This operation cannot be undone.</p>
      </ModalDialog>
    </>
  )
}
AsAConfirmationDialog.storyName = 'As a confirmation dialog'

export const WithCloseButtonHidden: Story<ModalDialogProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button variation={ButtonVariation.PRIMARY} text="Open Dialog" onClick={() => setIsOpen(true)} />

      <ModalDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isCloseButtonShown={false}
        title="ModalDialog title"
        footer={<Button variation={ButtonVariation.TERTIARY} text="Close modal" onClick={() => setIsOpen(false)} />}>
        <p>To close this modal you have to click the button below</p>
      </ModalDialog>
    </>
  )
}
AsAConfirmationDialog.storyName = 'As a confirmation dialog'

export const WithChangingContent: Story<ModalDialogProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showExtra, setShowExtra] = useState<boolean>(true)

  return (
    <>
      <Button variation={ButtonVariation.PRIMARY} text="Open Dialog" onClick={() => setIsOpen(true)} />

      <ModalDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Dialog title"
        width={700}
        height={500}
        footer={
          <Layout.Horizontal spacing="small">
            <Button variation={ButtonVariation.PRIMARY} text="Show" onClick={() => setShowExtra(true)} />
            <Button variation={ButtonVariation.SECONDARY} text="Hide" onClick={() => setShowExtra(false)} />
          </Layout.Horizontal>
        }>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto consectetur dolorem dolores eaque
          illum iusto laboriosam, odit provident sapiente tenetur, veritatis. Aperiam blanditiis cum dignissimos eveniet
          praesentium repellendus similique?
        </p>
        {showExtra && (
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eos ipsum natus nihil nobis numquam
              officia sapiente voluptas. A atque blanditiis delectus dolorem eius exercitationem expedita magnam
              obcaecati perspiciatis velit!
            </p>
            <p>
              Beatae debitis deleniti deserunt distinctio est eum eveniet exercitationem, facilis, id incidunt laborum
              laudantium libero maxime optio sit sunt voluptate? Ad atque debitis deleniti eius eveniet fuga molestiae
              sint voluptatem.
            </p>
            <p>
              Accusantium aut consequuntur debitis distinctio doloribus eligendi, eveniet explicabo fugit ipsa
              laudantium maiores nobis obcaecati perferendis provident quas quos tenetur, ullam? Accusantium consectetur
              cumque doloribus eligendi fuga maiores quasi vitae.
            </p>
            <p>
              Dolorum eius exercitationem fugit maiores nisi obcaecati sit temporibus vel. Ad amet aspernatur cum
              ducimus explicabo ipsam laboriosam laborum laudantium, magni maiores, molestias odio odit omnis quas
              quidem sed unde.
            </p>
            <p>
              Adipisci architecto cumque debitis, facere fugit harum hic ipsam iusto laboriosam laudantium libero minus,
              nesciunt nobis non obcaecati qui quidem quis reiciendis rem sed sint soluta tempore veritatis voluptate
              voluptatibus?
            </p>
            <p>
              At cupiditate dignissimos dolores et excepturi, fugit illum ipsum libero maiores quia, quos voluptatem
              voluptatibus? Accusantium amet earum error fuga laboriosam minima molestiae nesciunt nihil, nobis nulla
              repellat, suscipit tenetur?
            </p>
            <p>
              Aliquam animi commodi esse est incidunt ipsam itaque officia, quidem quo, reiciendis, reprehenderit soluta
              tempora ut voluptatem voluptatum. Aliquam distinctio dolore inventore laudantium magnam molestias natus
              necessitatibus recusandae unde, voluptatibus!
            </p>
            <p>
              Ab alias amet dicta error facilis incidunt, ipsam ipsum iusto libero minus nemo reprehenderit repudiandae
              sapiente sed sequi unde voluptatem. Aut cupiditate eum explicabo facere, harum minus odio perspiciatis
              velit.
            </p>
          </>
        )}
      </ModalDialog>
    </>
  )
}
WithChangingContent.storyName = 'With changing content'
