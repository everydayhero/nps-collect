import { colors } from '../../traits'

export default {
  header: {
    position: 'relative',
    width: 100,
    height: 100,
    margin: '0 auto 20px'
  },
  preamble: {
    color: colors.grey,
    height: 90,
    fontSize: 19,
    lineHeight: 1.2,
    ' p': {
      marginBottom: 12
    },
    ' p + p': {
      fontSize: 16,
      color: '#888'
    }
  }
}
