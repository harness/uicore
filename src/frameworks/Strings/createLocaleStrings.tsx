import React from 'react'
import { render } from 'mustache'
import { get } from 'lodash-es'

export interface StringsContextValue<T> {
  data: T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getString?(key: keyof T, vars?: Record<string, any>): string
}

export interface StringsContextProviderProps<T extends Record<string, string>>
  extends Pick<StringsContextValue<T>, 'getString'> {
  children: React.ReactNode
  data: T
}

export interface UseStringsReturn<T extends Record<string, string>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getString(key: keyof T, vars?: Record<string, any>): string
}

export interface LocaleStringProps<T extends Record<string, string>>
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  stringID: keyof T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vars?: Record<string, any>
  useRichText?: boolean
  tagName: keyof JSX.IntrinsicElements
}

export interface CreateLocaleStringsReturn<T extends Record<string, string>> {
  useStringsContext: () => StringsContextValue<T>
  StringsContextProvider: React.FC<StringsContextProviderProps<T>>
  useLocaleStrings: () => UseStringsReturn<T>
  LocaleString: (props: LocaleStringProps<T>) => React.ReactElement | null
}

export function createLocaleStrings<T extends Record<string, string>>(): CreateLocaleStringsReturn<T> {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getString(key: keyof T, vars: Record<string, any> = {}) {
        if (typeof getString === 'function') {
          return getString(key, vars)
        }

        const template = get(strings, key)

        if (typeof template !== 'string') {
          throw new Error(`No valid template with id "${key}" found`)
        }

        return render(template, { ...vars, $: strings })
      }
    }
  }

  function LocaleString(props: LocaleStringProps<T>): React.ReactElement | null {
    const { stringID, vars, useRichText, tagName: Tag, ...rest } = props
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

  LocaleString.defaultProps = {
    tagName: 'span'
  }

  return {
    useStringsContext,
    StringsContextProvider,
    useLocaleStrings,
    LocaleString
  }
}
