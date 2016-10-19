const mapObject = (object, fn) => {
  const newObject = {}
  Object.keys(object).forEach(key => {
    newObject[key] = fn(object[key])
  })
  return newObject
}

const colorDefinitions = {
  white: '255,255,255',
  fadedBlue: '192,233,248',
  blue: '56,183,232'
}
export const colors = mapObject(colorDefinitions, color => `rgb(${color})`)
export const fade = (colorKey, alpha) => `rgba(${colorDefinitions[colorKey]},${alpha})`

export const url = url => `url(${url})`

export const fonts = {
  base: 'Proxima Nova, Helvetica, sans-serif'
}
