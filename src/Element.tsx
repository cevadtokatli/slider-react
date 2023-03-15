import React from 'react'
import { SliderType } from '@cevad-tokatli/slider/constants'
import { SliderElement } from '@cevad-tokatli/slider/types'

interface Props {
  children?: JSX.Element
  currentSliderType?: SliderType
  setElement?: (el: SliderElement, index: number) => void
  removeElement?: (index: number) => void
  index?: number
  sliderType?: SliderType
  style?: object
  before?: (el: SliderElement, active: boolean) => Promise<void>
  after?: (el: SliderElement, active: boolean) => Promise<void>
}

export default class Element extends React.Component<Props, {}> {
  private wrapperEl: HTMLDivElement

  componentDidMount() {
    this.props.setElement({
      after: this.props.after,
      before: this.props.before,
      id: String(this.props.index ?? new Date().getTime()),
      el: this.wrapperEl.querySelector('.ct-s-slider-element'),
      sliderType: this.props.sliderType || this.props.currentSliderType,
      wrapperEl: this.wrapperEl,
    }, this.props.index)
  }

  componentWillUnmount() {
    this.props.removeElement(this.props.index)
  }

  render() {
    return(
      <div className="ct-s-slider-element-wrapper" ref={node => this.wrapperEl = node}>
        <div className="ct-s-slider-element" style={this.props.style ?? {}}>
          { this.props.children }
        </div>
      </div>
    )
  }
}
