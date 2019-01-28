import * as React from 'react';
import * as Marvina from 'marvina-slider';

interface ElementProps {
    currentSliderType?: Marvina.SliderType;
    setElement?: (el:Marvina.SliderElement, index:number) => void;
    removeElement?: (index:number) => void;
    index?: number;
    sliderType?: Marvina.SliderType;
    before?: (el:Marvina.SliderElement, active:boolean) => Promise<void>;
    after?: (el:Marvina.SliderElement, active:boolean) => Promise<void>;
}

export declare class Element extends React.Component<ElementProps, {}> {
    private wrapperEl: HTMLDivElement;
}