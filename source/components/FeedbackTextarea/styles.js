import { colors } from '../../traits'
import { StyleSheet } from 'aphrodite'

export default StyleSheet.create({
  textarea: {
    width: '100%',
    height: 60,
    minHeight: 60,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    padding: 8,
    textAlign: 'left',
    border: `1px solid ${colors.grey}`,
    transition: 'all 360ms ease-in-out',
    borderRadius: 5,
    ':focus': {
      minHeight: 90,
      border: `1px solid ${colors.blue}`,
      outline: 0
    }
  }
})
