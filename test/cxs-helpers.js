import cxsync from 'cxsync'
import { shallow } from 'enzyme'
import escapeStringRegexp from 'escape-string-regexp'

export const hasStyle = (classNameKeys, key, value) => {
  debug(classNameKeys)
  return cxsync.rules
    .filter(rule => {
      log('CXS Rule', rule)
      return classNameKeys.includes(rule.id) && rule.css.includes(key)
    })
    .reduce((prev, current) => {
      const keyValPat = `${escapeStringRegexp(key)}\\s*:\\s*${escapeStringRegexp(value)}`
      return prev || !!current.css.match(new RegExp(keyValPat))
    }, false)
}

export const cxsClassNames = classNames => {
  return classNames.split(' ').filter(cn => cn.includes('cxs-'))
}

export const renderAndExtract = (prop) => (element, selector = 'li') =>
  cxsClassNames(shallow(element).find(selector).prop('className'))

export const renderAndExtractClassnames = renderAndExtract('className')
export const renderAndExtractAlt = renderAndExtract('alt')
export const renderAndExtractSrc = renderAndExtract('src')

