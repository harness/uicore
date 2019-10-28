/*
 * This file contains mapping from MDX tags to UIKit Component.
 */

import React from 'react'
import { Link, Button, Text, Heading, List, ListItem } from '../static'
import CodeBlock from './CodeBlock'

const BASE_URL = 'https://github.com/wings-software/uikit/edit/master/'

const Title = (props: React.ComponentProps<typeof Heading>) => {
  const children = props.children as string
  let _children: React.ReactNode[] | undefined
  const [title, link] = children.split(/\s?---\s?/)

  if (link) {
    _children = [
      <span key="title">{title}</span>,
      <Button icon="edit" border={false} target="_blank" key="edit" href={`${BASE_URL}${link}`} font="small">
        Edit this page
      </Button>
    ]
  }

  return (
    <Heading
      flex={{ align: 'center-center', distribution: 'space-between' }}
      font={{ weight: "semi-bold" }}
      level="1"
      {...props}
      children={_children || children}
    />
  )
}

export default {
  code: CodeBlock,

  a: (props: React.ComponentProps<typeof Link>) => <Link {...props} />,
  h1: Title,
  h2: (props: React.ComponentProps<typeof Heading>) => <Heading font={{ weight: "semi-bold" }} level="2" {...props} />,
  h3: (props: React.ComponentProps<typeof Heading>) => <Heading font={{ weight: "semi-bold" }} level="3" {...props} />,
  h4: (props: React.ComponentProps<typeof Heading>) => <Heading font={{ weight: "semi-bold" }} level="4" {...props} />,
  h5: (props: React.ComponentProps<typeof Heading>) => <Heading font={{ weight: "semi-bold" }} level="4" {...props} />,
  h6: (props: React.ComponentProps<typeof Heading>) => <Heading font={{ weight: "semi-bold" }} level="4" {...props} />,
  p: (props: React.ComponentProps<typeof Text>) => <Text {...props} inline={false} />,
  span: (props: React.ComponentProps<typeof Text>) => <Text {...props} />,
  ul: (props: React.ComponentProps<typeof Text>) => <List {...props} />,
  ol: (props: React.ComponentProps<typeof Text>) => <List ordered {...props} />,
  li: (props: React.ComponentProps<typeof Text>) => <ListItem {...props} />
}
