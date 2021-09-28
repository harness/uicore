import React from 'react'
import { Layout } from '../../layouts/Layout'
import { Text } from '../Text/Text'
import { Button, ButtonSize } from '../Button/Button'
import cx from 'classnames'
import { DropDown } from '../DropDown/DropDown'
import { SelectOption } from '../Select/Select'
import { FontVariation } from '../../styled-props/font/FontProps'

import css from './Pagination.css'

export interface PaginationProps {
  pageSize: number
  pageCount: number
  itemCount: number
  pageIndex?: number
  gotoPage?: (index: number) => void
  pageSizeOptions?: number[]
  onPageSizeChange?: (newPageSize: number) => void
}

const Pagination: React.FC<PaginationProps> = props => {
  const { pageSize, pageIndex = 0, gotoPage, pageCount, itemCount, pageSizeOptions, onPageSizeChange } = props

  const selectOptions: SelectOption[] =
    pageSizeOptions?.map(option => {
      return { label: option.toString(), value: option.toString() }
    }) || []

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
        // eg. 3 of 3
        <Text inline font={{ variation: FontVariation.SMALL_SEMI }}>
          {itemCount} of {itemCount}
        </Text>
      ) : (
        // eg. (1-10) of 50
        <Text inline font={{ variation: FontVariation.SMALL_SEMI }}>
          {`(${pageSize * pageIndex + 1} - ${Math.min(pageSize * (pageIndex + 1), itemCount)}) of ${itemCount}`}
        </Text>
      )}
      <Layout.Horizontal>
        <Button
          text="Prev"
          icon="arrow-left"
          size={ButtonSize.SMALL}
          className={cx(css.roundedButton, css.buttonLeft)}
          iconProps={{ size: 12 }}
          onClick={() => gotoPage?.(pageIndex - 1)}
          disabled={pageIndex === 0}
        />
        <Button
          text="Next"
          rightIcon="arrow-right"
          size={ButtonSize.SMALL}
          className={cx(css.roundedButton, css.buttonRight)}
          iconProps={{ size: 12 }}
          onClick={() => gotoPage?.(pageIndex + 1)}
          disabled={pageIndex === pageCount - 1}
        />
      </Layout.Horizontal>

      {pageSizeOptions && onPageSizeChange ? (
        <Layout.Horizontal flex={{ alignItems: 'baseline' }} spacing="small">
          <Text>Show</Text>
          <DropDown
            items={selectOptions}
            onChange={item => onPageSizeChange(item.value as number)}
            value={pageSize.toString()}
            filterable={false}
            width={60}
            className={css.pageSizeDropdown}
          />
          <Text>per page</Text>
        </Layout.Horizontal>
      ) : (
        <span>{`Show ${pageSize} per page`}</span>
      )}
    </Layout.Horizontal>
  )
}

export default Pagination
