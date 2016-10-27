import { colors } from '../../traits'
import { select } from 'glamor'

export default {
  section: {
    maxWidth: 440,
    margin: '0 auto',
    ...select(' > *', {
      margin: '8px 0'
    })
  },
  question: {
    color: colors.grey,
    fontWeight: 900,
    fontSize: 20,
    marginBottom: 8
  }
}
