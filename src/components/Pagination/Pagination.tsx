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

  const moreLeft = pageIndex + 1 > pageCountClamp
  const moreRight = pageCount - pageIndex > pageCountClamp

  const renderPage = (pageNumber: number) => {
    const isCurrent = pageIndex + 1 === pageNumber
    return (
      <Button
        key={`page-${pageNumber}`}
        minimal={!isCurrent}
        text={pageNumber}
        intent={isCurrent ? 'primary' : 'none'}
        disabled={isCurrent}
        onClick={() => gotoPage(pageNumber - 1)}
      />
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
          {pageCount <= pageCountClamp * 2 ? (
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
            <React.Fragment>
              {Array.from({ length: moreLeft ? 2 : pageCountClamp }, (_, i) => renderPage(i + 1))}
              {moreLeft && (
                <SelectV2
                  items={Array.from(Array(moreRight ? pageIndex - 3 : pageCount - pageCountClamp - 2).keys()).map(
                    pageNumber => {
                      return {
                        label: `${pageNumber + 3}`,
                        value: pageNumber + 2
                      }
                    }
                  )}
                  onChange={item => gotoPage(item.value as number)}
                  filterable={false}>
                  <Button icon="more" minimal width="100%" />
                </SelectV2>
              )}
              {moreLeft && moreRight && Array.from({ length: 3 }, (_, i) => renderPage(pageIndex + i))}
              {moreRight && (
                <SelectV2
                  items={Array.from(
                    Array(moreLeft ? pageCount - pageIndex - 4 : pageCount - pageCountClamp - 2).keys()
                  ).map(pageNumber => {
                    return {
                      label: `${pageNumber + (moreLeft ? pageIndex + 3 : pageCountClamp + 1)}`,
                      value: pageNumber + (moreLeft ? pageIndex + 2 : pageCountClamp)
                    }
                  })}
                  onChange={item => gotoPage(item.value as number)}
                  filterable={false}>
                  <Button icon="more" minimal width="100%" />
                </SelectV2>
              )}
              {moreRight
                ? [pageCount - 1, pageCount].map(i => renderPage(i))
                : Array.from({ length: pageCountClamp }, (_, i) => renderPage(i + 1 + pageCount - pageCountClamp))}
            </React.Fragment>
          )}
          {pageCount > pageCountClamp && nextPage ? (
            <Button
              minimal
              icon="chevron-right"
              onClick={() => nextPage(pageIndex + 1)}
              disabled={pageIndex + 1 === pageCount}
              style={{ marginRight: 'var(--spacing-medium)' }}
            />
          ) : null}
        </Layout.Horizontal>
      ) : null}
    </Layout.Horizontal>
  )
}

export default Pagination
