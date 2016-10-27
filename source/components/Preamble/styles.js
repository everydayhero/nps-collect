import { colors } from '../../traits'
import { StyleSheet } from 'aphrodite'

export default StyleSheet.create({
  header: {
    position: 'relative',
    width: 100,
    height: 100,
    margin: '0 auto 20px'
  },
  headerImg: {
    width: '100%',
    height: '100%',
    left: 0,
    position: 'absolute'
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
})
