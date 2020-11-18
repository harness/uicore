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
