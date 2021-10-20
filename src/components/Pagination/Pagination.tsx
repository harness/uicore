import React from 'react'
import { Select } from '@blueprintjs/select'
import { Layout } from '../../layouts/Layout'
import { Text } from '../Text/Text'
import { Button, ButtonSize } from '../Button/Button'
import cx from 'classnames'
import { SelectOption } from '../Select/Select'
import { FontVariation } from '../../styled-props/font/FontProps'
import { DropDown } from '../../components/DropDown/DropDown'

import css from './Pagination.css'
import { MenuItem } from '@blueprintjs/core'

export interface PaginationProps {
  pageSize: number
  pageCount: number
  itemCount: number
  pageIndex?: number
  gotoPage?: (index: number) => void
  pageSizeOptions?: number[]
  onPageSizeChange?: (newPageSize: number) => void
}

interface PageNumbersProps {
  pageCount: number
  pageCountClamp: number
  pageIndex: number
  gotoPage: (index: number) => void
}

const CustomSelect = Select.ofType<SelectOption>()

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
              itemRenderer={(item, { handleClick }) => <MenuItem text={item.label} onClick={handleClick} />}
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
              itemRenderer={(item, { handleClick }) => <MenuItem text={item.label} onClick={handleClick} />}
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
        {gotoPage ? (
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
        <span>{`Show ${pageSize} per page`}</span>
      )}
    </Layout.Horizontal>
  )
}

export default Pagination
