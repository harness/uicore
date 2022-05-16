/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import mustache from 'mustache'
import { get } from 'lodash-es'

export interface StringsContextValue<T> {
  data: T
  getString?<K extends keyof T>(key: K, vars?: T[K]): string
}

export interface StringsContextProviderProps<T> extends Pick<StringsContextValue<T>, 'getString'> {
  children: React.ReactNode
  data: T
}

export interface UseStringsReturn<T> {
  getString<K extends keyof T>(key: K, vars?: T[K]): string
}

export interface LocaleStringProps<T, K extends keyof T>
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  stringID: K
  vars?: T[K]
  useRichText?: boolean
  tagName?: keyof JSX.IntrinsicElements
}

export interface CreateLocaleStringsReturn<T> {
  useStringsContext: () => StringsContextValue<T>
  StringsContextProvider: React.FC<StringsContextProviderProps<T>>
  useLocaleStrings: () => UseStringsReturn<T>
  LocaleString<K extends keyof T>(props: LocaleStringProps<T, K>): React.ReactElement | null
}

export function createLocaleStrings<T>(): CreateLocaleStringsReturn<T> {
  const StringsContext = React.createContext<StringsContextValue<T>>({} as StringsContextValue<T>)

  function StringsContextProvider(props: StringsContextProviderProps<T>): React.ReactElement {
    return (
      <StringsContext.Provider
        value={{
          data: props.data,
          getString: props.getString
        }}>
        {props.children}
      </StringsContext.Provider>
    )
  }

  function useStringsContext(): StringsContextValue<T> {
    return React.useContext(StringsContext)
  }

  function useLocaleStrings(): UseStringsReturn<T> {
    const { data: strings, getString } = useStringsContext()

    return {
      getString<K extends keyof T>(key: K, vars?: T[K]): string {
        if (typeof getString === 'function') {
          return getString(key, vars)
        }

        const template = get(strings, key)

        if (typeof template !== 'string') {
          throw new Error(`No valid template with id "${key}" found`)
        }

        return mustache.render(template, { ...vars, $: strings })
      }
    }
  }

  function LocaleString<K extends keyof T>(props: LocaleStringProps<T, K>): React.ReactElement | null {
    const { stringID, vars, useRichText, tagName: Tag = 'span', ...rest } = props
    const { getString } = useLocaleStrings()

    try {
      const text = getString(stringID, vars)

      return useRichText ? (
        <Tag {...(rest as unknown)} dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <Tag {...(rest as unknown)}>{text}</Tag>
      )
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        return <Tag style={{ color: 'var(--red-500)' }}>{e.message}</Tag>
      }

      return null
    }
  }

  return {
    useStringsContext,
    StringsContextProvider,
    useLocaleStrings,
    LocaleString
  }
}
