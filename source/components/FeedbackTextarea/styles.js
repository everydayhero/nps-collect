import { colors } from '../../traits'

export default {
  textarea: {
    width: '100%',
    height: 60,
    minHeight: 60,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    padding: 8,
    textAlign: 'left',
    border: `2px solid ${colors.grey}`,
    transition: 'all 360ms ease-in-out',
    borderRadius: 5,
    lineHeight: 1.25,
    ':focus': {
      minHeight: 90,
      borderColor: colors.blue,
      outline: 0
    }
  }
}
