import * as React from 'react';
import * as Marvina from 'marvina-slider';

interface Props {
    timing?:  string;
    duration?: number;
    sliderType?: Marvina.SliderType;
    touchMove?: boolean;
    list?: boolean;
    asList?: string|HTMLUListElement|HTMLOListElement;
    arrows?: boolean;
    asPrevArrow?: string|HTMLElement;
    asNextArrow?: string|HTMLElement;
    autoPlay?: boolean;
    autoPlaySpeed?: number;
    before?: (current:Marvina.SliderElement, next:Marvina.SliderElement) => Promise<void>;
    after?: (current:Marvina.SliderElement, prev:Marvina.SliderElement) => Promise<void>;
}

export default class Slider extends React.Component<Props, {}> {
    public static defaultProps = {
        timing: Marvina.defaultOptions.timing,
        duration: Marvina.defaultOptions.duration,
        sliderType: Marvina.defaultOptions.sliderType,
        touchMove: Marvina.defaultOptions.touchMove,
        list: Marvina.defaultOptions.list,
        arrows: Marvina.defaultOptions.arrows,
        autoPlay: Marvina.defaultOptions.autoPlay,
        autoPlaySpeed: Marvina.defaultOptions.autoPlaySpeed
    };
    public el: HTMLDivElement;
    private slider: Marvina.Slider;
    private elements:Marvina.SliderElement[] = [];

    constructor(props) {
        super(props);
        this.setElement = this.setElement.bind(this);
        this.removeElement = this.removeElement.bind(this);
    }

    componentDidMount() {
        let p = this.props;

        this.slider = new Marvina.Slider({
            el: this.el,
            timing: p.timing,
            duration: p.duration,
            sliderType: p.sliderType,
            touchMove: p.touchMove,
            list: p.list,
            asList: p.asList,
            arrows: p.arrows,
            asPrevArrow: p.asPrevArrow,
            asNextArrow: p.asNextArrow,
            autoPlay: p.autoPlay,
            autoPlaySpeed: p.autoPlaySpeed,
            init: false
        });

        if(p.before)
            this.slider.beforeCallback = p.before;
        if(p.after)
            this.slider.afterCallback = p.after;

        this.slider.setElements(this.elements);
        this.elements = null;
        this.slider.init();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.timing != this.props.timing) {
            this.setTiming(nextProps.timing);
        } if(nextProps.duration != this.props.duration) {
            this.setDuration(nextProps.duration);
        } if(nextProps.autoPlay != this.props.autoPlay) {
            if(nextProps.autoPlay) {
                this.play();
            } else {
                this.stop();
            }
        } if(nextProps.autoPlaySpeed != this.props.autoPlaySpeed) {
            this.setAutoPlaySpeed(nextProps.autoPlaySpeed);
        } if(nextProps.before != this.props.before)  {
            this.slider.beforeCallback = nextProps.before;
        } if(nextProps.after != this.props.after) {
            this.slider.afterCallback = nextProps.after;
        }
    }

    componentWillUnmount() {
        this.destroy();
    }

    private setElement(el:Marvina.SliderElement, index:number): void {
        if(!this.slider) {
            this.elements.push(el);
        } else {
            this.slider.add(el.el, index, el);
        }
    }

    private removeElement(index:number): void {
        this.slider.remove(index);
    }
    

    // slider methods
    prev(): Promise<boolean> {
        return this.slider.prev();
    }

    next(): Promise<boolean> {
        return this.slider.next();
    }

    play(): void {
        this.slider.play();
    }

    stop(): void {
        this.slider.stop();
    }

    toggle(): void {
        this.slider.toggle();
    }

    destroy(): void {
        this.slider.destroy();
    }

    getIndex(): number {
        return this.slider.getIndex();
    }

    setIndex(index:number): Promise<boolean> {
        return this.slider.setIndex(index);
    }

    getTotal(): number {
        return this.slider.getTotal();
    }

    getCurrent(): Marvina.SliderElement {
        return this.slider.getCurrent();
    }

    getTiming(): string {
        return this.slider.getTiming();
    }

    setTiming(timing: string): void {
        this.slider.setTiming(timing);
    }

    getDuration(): number {
        return this.slider.getDuration();
    }

    setDuration(duration: number): void {
        this.slider.setDuration(duration);
    }

    getAutoPlaySpeed(): number {
        return this.slider.getAutoPlaySpeed();
    }

    setAutoPlaySpeed(speed: number): void {
        this.slider.setAutoPlaySpeed(speed);
    }

    render() {
        return (
            <div className="ms" ref={node => this.el = node}>
                <div className="ms-slider">
                    <div className="ms-slider-element-container">
                        {React.Children.map(this.props.children, (child, index) => (
                            React.cloneElement(child, {
                                currentSliderType: this.props.sliderType, 
                                setElement: this.setElement,
                                removeElement: this.removeElement,
                                index
                            })
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}