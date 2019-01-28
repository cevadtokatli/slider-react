import * as React from 'react';
import * as Marvina from 'marvina-slider';

interface Props {
    currentSliderType?: Marvina.SliderType;
    setElement?: (el:Marvina.SliderElement, index:number) => void;
    removeElement?: (index:number) => void;
    index?: number;
    sliderType?: Marvina.SliderType;
    before?: (el:Marvina.SliderElement, active:boolean) => Promise<void>;
    after?: (el:Marvina.SliderElement, active:boolean) => Promise<void>;
}

export default class Element extends React.Component<Props, {}> {
    private wrapperEl: HTMLDivElement;

    componentDidMount() {
        this.props.setElement({
            sliderType: this.props.sliderType || this.props.currentSliderType,
            before: this.props.before,
            after: this.props.after,
            wrapperEl: this.wrapperEl,
            el: this.wrapperEl.querySelector('.ms-slider-element')
        }, this.props.index);
    }

    componentWillUnmount() {
        this.props.removeElement(this.props.index);
    }

    render() {
        return(
            <div className="ms-slider-element-wrapper" ref={node => this.wrapperEl = node}>
                <div className="ms-slider-element">
                    {this.props.children}
                </div>
            </div>
        );
    }
}