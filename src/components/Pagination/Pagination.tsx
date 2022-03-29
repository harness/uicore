/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import { Menu, MenuItem } from '@blueprintjs/core'
import { Select, ItemListRenderer } from '@blueprintjs/select'

import { Layout } from '../../layouts/Layout'
import { Text } from '../Text/Text'
import { Button, ButtonSize } from '../Button/Button'
import { SelectOption } from '../Select/Select'
import { FontVariation } from '@harness/design-system'
import { DropDown } from '../DropDown/DropDown'
import useWindowWidth from '../../hooks/useWindowWidth'

import css from './Pagination.css'

export interface PaginationProps {
  pageSize: number
  pageCount: number
  itemCount: number
  pageIndex?: number
  gotoPage?: (index: number) => void
  pageSizeOptions?: number[]
  hidePageNumbers?: boolean
  className?: string
  onPageSizeChange?: (newPageSize: number) => void
  breakAt?: number
}

interface PageNumbersProps {
  pageCount: number
  pageCountClamp: number
  pageIndex: number
  gotoPage: (index: number) => void
}

const CustomSelect = Select.ofType<SelectOption>()

const renderMenu: ItemListRenderer<SelectOption> = ({ items, itemsParentRef, renderItem }) => {
  const renderedItems = items.map(renderItem).filter(item => item !== null)
  return (
    <Menu ulRef={itemsParentRef} className={css.pageSizeDropdown}>
      {renderedItems}
    </Menu>
  )
}

const PageNumbers: React.FC<PageNumbersProps> = ({ pageCount, pageCountClamp, pageIndex, gotoPage }) => {
  const moreLeft = pageIndex + 1 > pageCountClamp
  const moreRight = pageCount - pageIndex > pageCountClamp

  const renderPageButton = (pageNumber: number) => {
    const isCurrent = pageIndex + 1 === pageNumber
    return (
      <Button
        key={`page-${pageNumber}`}
        text={pageNumber}
        disabled={isCurrent}
        onClick={() => gotoPage(pageNumber - 1)}
        className={cx(css.roundedButton, { [css.selected]: isCurrent })}
      />
    )
  }

  return (
    <>
      {pageCount <= pageCountClamp * 2 ? (
        Array.from(Array(pageCount).keys()).map(pageNumber => {
          const isCurrent = pageIndex === pageNumber
          return (
            <Button
              key={`page-${pageNumber}`}
              text={pageNumber + 1}
              disabled={isCurrent}
              className={cx(css.roundedButton, { [css.selected]: isCurrent })}
              onClick={() => gotoPage(pageNumber)}
            />
          )
        })
      ) : (
        <React.Fragment>
          {Array.from({ length: moreLeft ? 2 : pageCountClamp }, (_, i) => renderPageButton(i + 1))}
          {moreLeft && (
            <CustomSelect
              filterable={false}
              items={Array.from(Array(moreRight ? pageIndex - 3 : pageCount - pageCountClamp - 2).keys()).map(
                pageNumber => {
                  return {
                    label: `${pageNumber + 3}`,
                    value: pageNumber + 2
                  }
                }
              )}
              itemListRenderer={renderMenu}
              itemRenderer={(item, { handleClick }) => (
                <MenuItem key={item.label} text={item.label} onClick={handleClick} />
              )}
              onItemSelect={item => gotoPage(item.value as number)}>
              <Button icon="more" className={css.roundedButton} />
            </CustomSelect>
          )}
          {moreLeft && moreRight && Array.from({ length: 3 }, (_, i) => renderPageButton(pageIndex + i))}
          {moreRight && (
            <CustomSelect
              filterable={false}
              items={Array.from(
                Array(moreLeft ? pageCount - pageIndex - 4 : pageCount - pageCountClamp - 2).keys()
              ).map(pageNumber => {
                return {
                  label: `${pageNumber + (moreLeft ? pageIndex + 3 : pageCountClamp + 1)}`,
                  value: pageNumber + (moreLeft ? pageIndex + 2 : pageCountClamp)
                }
              })}
              itemListRenderer={renderMenu}
              itemRenderer={(item, { handleClick }) => (
                <MenuItem key={item.label} text={item.label} onClick={handleClick} />
              )}
              onItemSelect={item => gotoPage(item.value as number)}>
              <Button icon="more" className={css.roundedButton} />
            </CustomSelect>
          )}
          {moreRight
            ? [pageCount - 1, pageCount].map(i => renderPageButton(i))
            : Array.from({ length: pageCountClamp }, (_, i) => renderPageButton(i + 1 + pageCount - pageCountClamp))}
        </React.Fragment>
      )}
    </>
  )
}

const Pagination: React.FC<PaginationProps> = props => {
  const {
    pageSize,
    pageIndex = 0,
    gotoPage,
    pageCount,
    itemCount,
    pageSizeOptions,
    onPageSizeChange,
    hidePageNumbers,
    className,
    breakAt
  } = props
  const currentWindowWidth = useWindowWidth()

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

  const showNumbers = !hidePageNumbers && (!breakAt || breakAt <= currentWindowWidth)

  return (
    <Layout.Horizontal
      padding={{ top: 'medium', bottom: 'medium' }}
      flex={{ align: 'center-center', distribution: 'space-between' }}
      className={cx(className, css.container)}>
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
        {gotoPage && showNumbers ? (
          <PageNumbers gotoPage={gotoPage} pageIndex={pageIndex} pageCountClamp={5} pageCount={pageCount} />
        ) : null}
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
        <span>{`Showing ${pageSize} per page`}</span>
      )}
    </Layout.Horizontal>
  )
}

export default Pagination
