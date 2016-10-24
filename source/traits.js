const mapObject = (object, fn) => {
  const newObject = {}
  Object.keys(object).forEach(key => {
    newObject[key] = fn(object[key])
  })
  return newObject
}

const colorDefinitions = {
  white: '255,255,255',
  grey: '52,52,52',
  lightBlue: '192,233,248',
  blue: '56,183,232',
  orange: '255,150,50',
  green: '13,167,78'
}
export const colors = mapObject(colorDefinitions, color => `rgb(${color})`)
export const fade = (colorKey, alpha) => `rgba(${colorDefinitions[colorKey]},${alpha})`

export const url = url => `url(${url})`

export const fonts = {
  base: 'Proxima Nova, Helvetica, sans-serif'
}

export const transition = {
  slow: 'all 500ms ease-in-out',
  moderate: 'all 350ms ease-in-out',
  fast: 'all 160ms ease-in-out'
}
