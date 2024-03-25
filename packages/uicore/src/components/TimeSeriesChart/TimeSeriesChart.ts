/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const timeSeriesChartDefaultConfig = {
  chart: {
    zoomType: 'x',
    width: 400,
    height: 300
  },
  title: {
    text: ''
  },
  xAxis: {
    type: '',
    labels: {
      enabled: false
    }
  },
  yAxis: {
    title: {
      text: ''
    },
    labels: {
      enabled: false
    }
  },
  legend: {
    enabled: false
  },
  series: [
    {
      type: 'area',
      name: '',
      data: []
    }
  ],
  credits: {
    enabled: false
  }
}
