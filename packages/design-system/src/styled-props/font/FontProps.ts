/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

export type FontSize = 'xsmall' | 'small' | 'normal' | 'medium' | 'large'

export type FontWeight = 'light' | 'bold' | 'semi-bold'

export type TextAlignment = 'left' | 'center' | 'right'

export enum FontVariation {
  DISPLAY1 = 'display1',
  DISPLAY2 = 'display2',
  H1 = 'h1',
  H1_SEMI = 'h1-semi',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  LEAD = 'lead',
  BODY = 'body',
  BODY1 = 'body1',
  BODY2 = 'body2',
  BODY2_SEMI = 'body2-semi',
  BLOCKQUOTE = 'blockquote',
  UPPERCASED = 'uppercased',
  SMALL = 'small',
  SMALL_BOLD = 'small-bold',
  SMALL_SEMI = 'small-semi',
  TABLE_HEADERS = 'table-headers',
  TINY = 'tiny',
  TINY_SEMI = 'tiny-semi',
  YAML = 'yaml',
  CARD_TITLE = 'card-title',
  FORM_TITLE = 'form-title',
  FORM_SUB_SECTION = 'form-sub-section',
  FORM_INPUT_TEXT = 'form-input-text',
  FORM_LABEL = 'form-label',
  FORM_HELP = 'form-help',
  FORM_MESSAGE_DANGER = 'form-message-danger',
  FORM_MESSAGE_WARNING = 'form-message-warning',
  FORM_MESSAGE_SUCCESS = 'form-message-success'
}

export interface FontProps {
  size?: FontSize
  mono?: boolean
  italic?: boolean
  weight?: FontWeight
  align?: TextAlignment
  variation?: FontVariation
}
