/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const columnChartDefaultConfig = {
  chart: {
    type: 'column',
    width: 400,
    height: 300
  },
  title: {
    text: ''
  },
  yAxis: {
    title: {
      text: ''
    }
  },
  series: [
    {
      name: '',
      data: [],
      showInLegend: false
    }
  ],
  credits: {
    enabled: false
  }
}
