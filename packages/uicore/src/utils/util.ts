export const sanitizeHTML = (htmlContent: string): string => {
  const div = document.createElement('div')
  div.innerHTML = htmlContent

  // Remove unwanted attributes (e.g., `on*` event handlers)
  const elements = div.getElementsByTagName('*')
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]

    // Remove attributes that could lead to XSS attacks (like `on*` attributes)
    for (let j = 0; j < element.attributes.length; j++) {
      const attribute = element.attributes[j]
      if (attribute.name.startsWith('on')) {
        element.removeAttribute(attribute.name)
      }
    }
  }

  return div.innerHTML
}
