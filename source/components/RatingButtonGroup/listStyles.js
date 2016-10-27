import { colors } from '../../traits'

export default {
  radialList: {
    display: 'inline-block',
    boxShadow: `inset 0 0 0 56px ${colors.lightBlue}`,
    margin: '12px 0',
    width: 300,
    height: 300,
    borderRadius: '50%',
    transition: 'all 500ms ease-in-out'
  },
  collapsed: {
    boxShadow: `inset 0 0 0 56px ${colors.white}`,
    width: 80,
    height: 80
  }
}
