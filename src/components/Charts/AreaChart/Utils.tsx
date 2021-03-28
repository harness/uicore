import moment from 'moment'

export const formatDurationForHighCharts = (durationSecs: number) => {
  if (durationSecs < 60 && durationSecs > 0) {
    return durationSecs + 's '
  } else if (durationSecs === 0) {
    return '0'
  }

  const val = moment().startOf('day').seconds(durationSecs)
  let str = val.hours() + 'h ' + val.minutes() + 'm '
  str = (' ' + str).replace(' 0h 0m', '').replace(' 0h', '').replace(' 0m', '')
  return str
}

export const tranformCommonKeyToString = ({
  key = '',
  keyMaps = [],
  includeDefaultKeyMaps = true,
  notFoundOutput = undefined
}) => {
  const defaultKeyMaps: any[] = []
  const combinedKeyMaps = []
  let output = undefined

  if (key === undefined || key === null) {
    return ''
  }

  // load passed keyMaps first, so they override default keyMaps
  if (keyMaps && Array.isArray(keyMaps)) {
    combinedKeyMaps.push(...keyMaps)
  }

  if (includeDefaultKeyMaps) {
    combinedKeyMaps.push(...defaultKeyMaps)
  }

  for (let i = 0; i < combinedKeyMaps.length; i++) {
    const keyMap = combinedKeyMaps[i]

    const value = keyMap[key]

    if (value !== undefined && value !== null) {
      output = value
      break
    }
  }

  // return value if found,
  // If not, return 'notFoundOutput', if provided,
  // Otherwise, return key
  const finalOutput = output !== undefined ? output : notFoundOutput ? notFoundOutput : key
  return finalOutput
}
