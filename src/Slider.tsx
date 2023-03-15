import React from 'react'
import SliderC from '@cevad-tokatli/slider'
import { defaultOptions, SliderType } from '@cevad-tokatli/slider/constants'
import { SliderElement } from '@cevad-tokatli/slider/types'

interface Props {
  after?: (current: SliderElement, prev: SliderElement) => Promise<void>
  arrows?: boolean
  asNextArrow?: string | HTMLElement
  asPrevArrow?: string | HTMLElement
  asList?: string | HTMLUListElement | HTMLOListElement
  autoPlay?: boolean
  autoPlaySpeed?: number
  before?: (current: SliderElement, next: SliderElement) => Promise<void>
  children: JSX.Element | JSX.Element[]
  duration?: number
  list?: boolean
  sliderType?: SliderType
  timing?: string
  touchMove?: boolean
}

export default class Slider extends React.Component<Props, {}> {
  public static defaultProps = {
    arrows: defaultOptions.arrows,
    autoPlay: defaultOptions.autoPlay,
    autoPlaySpeed: defaultOptions.autoPlaySpeed,
    duration: defaultOptions.duration,
    list: defaultOptions.list,
    sliderType: defaultOptions.sliderType,
    timing: defaultOptions.timing,
    touchMove: defaultOptions.touchMove,
  }

  public el: HTMLDivElement
  private slider: SliderC
  private elements: SliderElement[] = []

  componentDidMount() {
    const p = this.props

    this.slider = new SliderC({
      asList: p.asList,
      arrows: p.arrows,
      asNextArrow: p.asNextArrow,
      asPrevArrow: p.asPrevArrow,
      autoPlay: p.autoPlay,
      autoPlaySpeed: p.autoPlaySpeed,
      duration: p.duration,
      el: this.el,
      init: false,
      list: p.list,
      sliderType: p.sliderType,
      timing: p.timing,
      touchMove: p.touchMove,
    })

    if (p.before) {
      this.slider.beforeCallback = p.before
    }
  
    if(p.after) {
      this.slider.afterCallback = p.after
    }
  
    this.slider.setElements(this.elements)
    this.elements = null
    this.slider.init()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.timing !== this.props.timing) {
      this.setTiming(nextProps.timing)
    } 
    
    if(nextProps.duration !== this.props.duration) {
      this.setDuration(nextProps.duration)
    } 
    
    if(nextProps.autoPlay !== this.props.autoPlay) {
      if(nextProps.autoPlay) {
          this.play()
      } else {
          this.stop()
      }
    }
    
    if(nextProps.autoPlaySpeed !== this.props.autoPlaySpeed) {
      this.setAutoPlaySpeed(nextProps.autoPlaySpeed)
    }
    
    if(nextProps.before !== this.props.before)  {
      this.slider.beforeCallback = nextProps.before
    }
    
    if(nextProps.after !== this.props.after) {
      this.slider.afterCallback = nextProps.after
    }
  }

  componentWillUnmount() {
    this.destroy()
  }

  private setElement = (el: SliderElement, index: number) => {
    if(!this.slider) {
      this.elements.push(el)
    } else {
      this.slider.add(el.el, index, el)
    }
  }

  private removeElement = (index: number) => {
    this.slider.remove(index)
  }
  
  // slider methods
  prev(): Promise<boolean> {
    return this.slider.prev()
  }

  next(): Promise<boolean> {
    return this.slider.next()
  }

  play() {
    this.slider.play()
  }

  stop() {
    this.slider.stop()
  }

  toggle() {
    this.slider.toggle()
  }

  destroy() {
    this.slider.destroy()
  }

  getIndex(): number {
    return this.slider.getIndex()
  }

  setIndex(index:number): Promise<boolean> {
    return this.slider.setIndex(index)
  }

  getTotal(): number {
    return this.slider.getTotal()
  }

  getCurrent(): SliderElement {
    return this.slider.getCurrent()
  }

  getTiming(): string {
    return this.slider.getTiming()
  }

  setTiming(timing: string) {
    this.slider.setTiming(timing)
  }

  getDuration(): number {
    return this.slider.getDuration()
  }

  setDuration(duration: number) {
    this.slider.setDuration(duration)
  }

  getAutoPlaySpeed(): number {
    return this.slider.getAutoPlaySpeed()
  }

  setAutoPlaySpeed(speed: number) {
    this.slider.setAutoPlaySpeed(speed)
  }

  render() {
    return (
      <div className="ct-s" ref={node => this.el = node}>
        <div className="ct-s-slider">
          <div className="ct-s-slider-element-container">
            { React.Children.map(this.props.children, (child, index) => (
              React.cloneElement(child, {
                currentSliderType: this.props.sliderType, 
                setElement: this.setElement,
                removeElement: this.removeElement,
                index
              })
            )) }
          </div>
        </div>
      </div>
    )
  }
}
