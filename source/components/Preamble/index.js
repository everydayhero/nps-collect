import React from 'react'

import images from '../../images'

const Preamble = ({
  scoreSelected = false
}) => {
  return (
    <section id='nps-preamble'>
      {scoreSelected
        ? <img {...images.chat} />
        : <img {...images.clap} />
      }

      <p>
        {scoreSelected
          ? <strong>{'Thanks for your feedback!'}</strong>
          : 'Thank you for donating with Everydayhero. You\'re awesome!'
        }
      </p>

      {!scoreSelected &&
        <p>
          {'If you have a second, we\'d value your feedback.'}
        </p>
      }
    </section>
  )
}

Preamble.propTypes = {
  scoreSelected: React.PropTypes.bool
}

export default Preamble
