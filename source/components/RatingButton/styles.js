import { colors, fade, transition } from '../../traits'

const DIAMETER = 38

const fauxBorder = (color, alpha) => ({ boxShadow: `0 0 0 3px ${fade(color, alpha)}` })

export default {
  radio: {
    position: 'absolute',
    clip: 'rect(0,0,0,0)'
  },
  label: {
    backgroundColor: colors.white,
    display: 'inline-block',
    width: DIAMETER,
    lineHeight: `${DIAMETER}px`,
    textAlign: 'center',
    borderRadius: '50%',
    fontWeight: 900,
    fontSize: 18,
    cursor: 'pointer',
    transition: transition.fast,
    color: colors.blue,
    ...fauxBorder('white', 0.3),
    ':hover': fauxBorder('blue', 0.9)
  },
  selected: {
    backgroundColor: colors.blue,
    transform: 'scale(1.5)',
    color: colors.white,
    ...fauxBorder('blue', 0.3),
    ':hover': fauxBorder('blue', 0.9)
  }
}
