import { colors } from '../../traits'
import { StyleSheet } from 'aphrodite'

export default StyleSheet.create({
  section: {
    maxWidth: 440,
    margin: '0 auto',
    ' > *': {
      margin: '8px 0'
    }
  },
  question: {
    color: colors.grey,
    fontWeight: 900,
    fontSize: 20,
    marginBottom: 8
  }
})
