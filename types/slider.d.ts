import * as React from 'react';
import * as Marvina from 'marvina-slider';

interface SliderProps {
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

export declare class Slider extends React.Component<SliderProps, {}> {
    public el: HTMLDivElement;
    private slider: Marvina.Slider;
    private elements:Marvina.SliderElement[];

    private setElement(el:Marvina.SliderElement, index:number): void;
    private removeElement(index:number): void;
    prev(): Promise<boolean>;
    next(): Promise<boolean>;
    play(): void;
    stop(): void
    toggle(): void
    destroy(): void
    getIndex(): number
    setIndex(index:number): Promise<boolean>
    getTotal(): number
    getCurrent(): Marvina.SliderElement
    getTiming(): string
    setTiming(timing: string): void
    getDuration(): number
    setDuration(duration: number): void
    getAutoPlaySpeed(): number
    setAutoPlaySpeed(speed: number): void
} 