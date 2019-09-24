/*
 * This file contains mapping from MDX tags to UIKit Component.
 */

import React from 'react'
import { Link, Text, Heading, List, ListItem } from '../static'
import CodeBlock from './CodeBlock'

export default {
  code: CodeBlock,

  a: (props: React.ComponentProps<typeof Link>) => <Link {...props} />,
  h1: (props: React.ComponentProps<typeof Heading>) => <Heading bold level="1" {...props} />,
  h2: (props: React.ComponentProps<typeof Heading>) => <Heading bold level="2" {...props} />,
  h3: (props: React.ComponentProps<typeof Heading>) => <Heading bold level="3" {...props} />,
  h4: (props: React.ComponentProps<typeof Heading>) => <Heading bold level="4" {...props} />,
  h5: (props: React.ComponentProps<typeof Heading>) => <Heading bold level="5" {...props} />,
  h6: (props: React.ComponentProps<typeof Heading>) => <Heading bold level="6" {...props} />,
  p: (props: React.ComponentProps<typeof Text>) => <Text {...props} inline={false} />,
  span: (props: React.ComponentProps<typeof Text>) => <Text {...props} />,
  ul: (props: React.ComponentProps<typeof Text>) => <List {...props} />,
  ol: (props: React.ComponentProps<typeof Text>) => <List ordered {...props} />,
  li: (props: React.ComponentProps<typeof Text>) => <ListItem {...props} />
}
