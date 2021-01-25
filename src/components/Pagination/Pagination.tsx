import React from 'react'
import { Layout } from '../../layouts/Layout'
import { Text } from '../Text/Text'
import { Button } from '../Button/Button'
import { SelectV2 } from '../Select/SelectV2'

import css from './Pagination.css'

export interface PaginationProps {
  pageSize: number
  pageIndex?: number
  pageCount: number
  itemCount: number
  gotoPage: (index: number) => void
  nextPage?: (index: number) => void
  pageCountClamp?: number
}

const Pagination: React.FC<PaginationProps> = props => {
  const { pageSize, pageIndex = 0, nextPage, pageCount, itemCount, gotoPage, pageCountClamp = 5 } = props
  if (pageIndex >= pageCount) {
    // eslint-disable-next-line no-console
    console.warn(`Pagination: pageIndex (${pageIndex}) can't be more than/equal to pageCount (${pageCount})`)
    return null
  }
  if (pageSize * pageCount < itemCount) {
    // eslint-disable-next-line no-console
    console.warn(
      `Pagination: pageSize (${pageSize}) * pageCount (${pageCount}) can't be less than itemCount (${itemCount})`
    )
  }

  return (
    <Layout.Horizontal
      padding={{ top: 'medium', bottom: 'medium' }}
      flex={{ align: 'center-center', distribution: 'space-between' }}
      className={css.container}>
      {itemCount <= pageSize ? (
        // eg. Showing 3 of 3
        <Text inline className={css.text}>
          Showing <strong>{itemCount}</strong> of <strong>{itemCount}</strong>
        </Text>
      ) : (
        // eg. Showing 1 - 10 of 50
        <Text inline className={css.text}>
          Showing <strong>{pageSize * pageIndex + 1}</strong> -{' '}
          <strong>{Math.min(pageSize * (pageIndex + 1), itemCount)}</strong> of <strong>{itemCount}</strong>
        </Text>
      )}
      {itemCount > pageSize ? (
        <Layout.Horizontal spacing="small">
          {pageCount < pageCountClamp + 3 ? (
            Array.from(Array(pageCount).keys()).map(pageNumber => {
              const isCurrent = pageIndex === pageNumber
              return (
                <Button
                  key={`page-${pageNumber}`}
                  minimal={!isCurrent}
                  text={pageNumber + 1}
                  intent={isCurrent ? 'primary' : 'none'}
                  disabled={isCurrent}
                  onClick={() => gotoPage(pageNumber)}
                />
              )
            })
          ) : (
            <>
              {Array.from(Array(pageCountClamp).keys()).map(pageNumber => {
                const isCurrent = pageIndex === pageNumber
                return (
                  <Button
                    key={`page-${pageNumber}`}
                    minimal={!isCurrent}
                    text={pageNumber + 1}
                    intent={isCurrent ? 'primary' : 'none'}
                    disabled={isCurrent}
                    onClick={() => gotoPage(pageNumber)}
                  />
                )
              })}
              <SelectV2
                items={Array.from(Array(pageCount - pageCountClamp - 1).keys()).map(pageNumber => {
                  return {
                    label: `${pageNumber + pageCountClamp + 1}`,
                    value: pageNumber + pageCountClamp
                  }
                })}
                onChange={item => gotoPage(item.value as number)}
                filterable={false}>
                <Button icon="more" minimal />
              </SelectV2>
              {/* Special treatment for last button */}
              <Button
                minimal={pageIndex != pageCount - 1}
                text={pageCount}
                intent={pageIndex === pageCount - 1 ? 'primary' : 'none'}
                disabled={pageIndex === pageCount - 1}
                onClick={() => gotoPage(pageCount - 1)}
              />
            </>
          )}
          {pageCount > pageCountClamp && nextPage ? (
            <Button
              minimal
              icon="chevron-right"
              onClick={() => nextPage(pageIndex + 1)}
              disabled={pageIndex === pageCount}
              style={{ marginRight: 'var(--spacing-medium)' }}
            />
          ) : null}
        </Layout.Horizontal>
      ) : null}
    </Layout.Horizontal>
  )
}

export default Pagination
