import { pick } from 'lodash'
import { Color } from '../../core/Color'
export const getInitialsFromNameOrEmail = (name = '', email = '') => {
  let initialsFromName = name
    .split(/-| /)
    .map((n: string) => n[0])
    .join('')

  initialsFromName =
    initialsFromName.length > 2
      ? `${initialsFromName[0]}${initialsFromName[initialsFromName.length - 1]}`
      : initialsFromName
  let initialsFromEmail = email.split('@')[0]
  const splitedInitialsFromEmail = initialsFromEmail.split('.')
  initialsFromEmail =
    splitedInitialsFromEmail.length > 1
      ? `${splitedInitialsFromEmail[0][0]}${splitedInitialsFromEmail[splitedInitialsFromEmail.length - 1][0]}`
      : initialsFromEmail[0]
  return initialsFromName || initialsFromEmail
}

export const getSumOfAllCharacters = (str: string) => {
  return str
    ? str
        .toLowerCase()
        .split('')
        .reduce((initialValue, charc: string) => {
          return initialValue + (charc.charCodeAt(0) - 'a'.charCodeAt(0)) + 1
        }, 0)
    : 0
}
export const defaultAvatarColor = Object.values(
  pick(Color, [
    'GREY_600',
    'GREY_700',
    'GREY_850',
    'GREY_900',
    'BLUE_700',
    'BLUE_800',
    'RED_700',
    'RED_600',
    'YELLOW_800',
    'YELLOW_700',
    'YELLOW_600',
    'PURPLE_900',
    'ORANGE_500',
    'GREEN_500',
    'GREEN_600',
    'GREEN_700'
  ])
)
