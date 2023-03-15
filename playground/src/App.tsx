import Slider, { Element } from '@cevad-tokatli/slider-react'
import React from 'react'

export default () => (
  <Slider>
    <Element style={{ backgroundImage: 'url(\'assets/1.jpg\')' }} />
    <Element style={{ backgroundImage: 'url(\'assets/2.jpg\')' }} />
    <Element style={{ backgroundImage: 'url(\'assets/3.jpg\')' }} />
  </Slider>
)
