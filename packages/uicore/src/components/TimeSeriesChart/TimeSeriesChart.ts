/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
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
