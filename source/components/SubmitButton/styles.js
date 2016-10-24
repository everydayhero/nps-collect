import { colors, fade } from '../../traits'

export default {
  button: {
    appearance: 'none',
    padding: '0 44px',
    lineHeight: '44px',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'inherit',
    fontWeight: 900,
    border: 'none',
    backgroundColor: colors.green,
    borderRadius: 30,
    color: colors.white,
    transition: 'all 240ms ease-in-out',
    boxShadow: `inset 0 14px 28px ${fade('white', 0.2)}, 0 5px 5px ${fade('grey', 0.1)}`,
    ':hover': {
      boxShadow: `inset 0 12px 32px ${fade('white', 0.3)}, 0 1px 3px ${fade('grey', 0.3)}`
    }
  }
}
