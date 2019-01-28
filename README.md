# Marvina Slider React
React integration for [Marvina Slider.](https://github.com/cevadtokatli/marvina-slider)

## NPM
```
npm install -–save-dev marvina-slider-react
```

## Yarn
```
yarn add marvina-slider-react --dev
```

## Installation
```
import React from 'react';
import * as Marvina from 'marvina-slider-react';

export default class App extends React.Component {
    render() {
        return(
            <div>
                <Marvina.Slider>                
                    <Marvina.Element>
                        <img src="img1.jpg" />
                    </Marvina.Element>
                    <Marvina.Element>
                        <img src="img2.jpg" />
                    </Marvina.Element>
                    <Marvina.Element>
                        <img src="img3.jpg" />
                    </Marvina.Element>
                </Marvina.Slider>
            </div>
        );
    }
}

```

Add the css file.
```
<link rel="stylesheet" href="/node_modules/marvina-slider-react/dist/css/marvina-slider.min.css" />
```

### Options

Option | Type | Default | Description
------ | ---- | ------- | -----------
timing | string | "ease" | Specifies the speed curve of an animation. Takes all the values CSS3 can take. *(like ease, linear, cubic-bezier, step)*
duration | number | 800 | Defines how long an animation should take to complete one cycle. *(as milliseconds)*
sliderType | [SliderType](#slider-type) | Carousel | Specifies the animation type. It can be customized for each image element by passing as prop to the element component.
touchMove | boolean | true | Enables slide transitive with touch.
list | boolean | true | Displays a list at the bottom of the slider.
[asList](#as-list) | string \| HTMLUListElement \| HTMLOListElement* | null | Declares the given list as the slider list.
arrows | boolean | true | Displays right and left arrows to change the index.
asPrevArrow | string \| HTMLElement* | null | Declares the given element as the prev arrow.
asNextArrow | string \| HTMLElement* | null | Declares the given element as the next arrow.
autoPlay | boolean | false | Enables auto play of slides.
autoPlaySpeed | number | 5000 | Sets auto play interval. *(as milliseconds)*

<span style="font-size:.9rem;">*: You can give an HTML element or a CSS selector (like `#carousel`, `.container > div:first-child`)</span>

```
    render() {
        return(
            <div>
                <Marvina.Slider
                    timing="linear"
                    sliderType={Marvina.SliderType.Fade}
                >                
                    <Marvina.Element
                        sliderType={Marvina.SliderType.Flow}
                    >
                        <img src="img1.jpg" />
                    </Marvina.Element>
                    <Marvina.Element>
                        <img src="img2.jpg" />
                    </Marvina.Element>
                    <Marvina.Element
                        sliderType={Marvina.SliderType.Carousel}
                    >
                        <img src="img3.jpg" />
                    </Marvina.Element>
                    <Marvina.Element>
                        <img src="img4.jpg" />
                    </Marvina.Element>
                </Marvina.Slider>
            </div>
        );
    }

```

#### Slider Element
It is a object which specifies one single slider element. It has the following attributes.
* el: HTMLElement;
* wrapperEl: HTMLDivElement;
* sliderType: SliderType;
* before: (el:SliderElement, active:boolean) => Promise<void>;
* after: (el:SliderElement, active:boolean) => Promise<void>;

#### Slider Type
Specfies the slider animation type.
* Carousel
* Flow
* Fade

#### As List
You can declare your list as a slider list. 
* It can be a ul or ol element. 
* It can be anywhere in the body.
* List is updated when index is changed.
* Assigns ms-active class to list element that holds the current index.

#### Callbacks

**before(current: SliderElement, next: SliderElement): Promise<void>** \
It is invoked before animation runs. It returns a promise so that animation waits for the mehtod to complete.  

**after(current: SliderElement, prev: SliderElement): Promise<void>** \
It is invoked after animation runs. It returns a promise so before the method completes running, another animation cannot run. 

You can pass callbacks as props Slider component or to specify for one element to Element component.
```
    before(current, next) {
        return new Promise(resolve => {
            // ...
            resolve();
        });
    }

    render() {
        return(
            <div>
                <Marvina.Slider
                    before={this.before}
                >                
                    <Marvina.Element>
                        <img src="img1.jpg" />
                    </Marvina.Element>
                    <Marvina.Element>
                        <img src="img2.jpg" />
                    </Marvina.Element>
                    <Marvina.Element>
                        <img src="img3.jpg" />
                    </Marvina.Element>
                </Marvina.Slider>
            </div>
        );
    }
```

#### Callbacks For Specified Elements

**before(el:SliderElement, active:boolean): Promise** \
It is invoked before animation runs. It returns a promise so that animation waits for the mehtod to complete. It is only invoked when it is the current or next element. If it is the next element, active is true.

**after(el:SliderElement, active:boolean): Promise** \
It is invoked after animation runs. It returns a promise so before the method completes runing, another animation cannot run.  It is only invoked when it is the current or previous element. If it is the current element, active is true.


```
    after(current, active) {
        return new Promise(resolve => {
            // ...
            resolve();
        });
    }

    render() {
        return(
            <div>
                <Marvina.Slider>                
                    <Marvina.Element
                        after={this.after}
                    >
                        <img src="img1.jpg" />
                    </Marvina.Element>
                    <Marvina.Element>
                        <img src="img2.jpg" />
                    </Marvina.Element>
                    <Marvina.Element>
                        <img src="img3.jpg" />
                    </Marvina.Element>
                </Marvina.Slider>
            </div>
        );
    }
```

### Events
Event | Description
----- | -----------
touchStart | Fires when touching starts.
touchEnd | Fires when touching ends.
change | Fires when index changes.
play | Fires when autoplay starts.
stop | Fires when autoplay stops.
destroy | Fires when the slider is destroyed.

```
    componentDidMount() {
        this.slider.el.addEventListener('touchStart', () => {
            console.log('touching starts');
        });

        this.slider.el.addEventListener('touchEnd', () => {
            console.log('touching ends');
        });
    }

    render() {
        return(
            <div>
                <Marvina.Slider ref={node => this.slider = node}>                
                    // ...
                </Marvina.Slider>
            </div>
        );
    }

```

### Methods
Method | Params | Return | Description
------ | ------ | ------ | -----------
prev | | Promise\<boolean> | Triggers the previous image. Returns `false` if the slider is in animation.
next | | Promise\<boolean> | Triggers the next image. Returns `false` if the slider is in animation.
play | | void | Starts autoplay.
stop | | void | Stops autoplay.
toggle | | void | Toggles autoplay.
destroy | | void | Destroys the slider.
getIndex | | number | Returns index.
setIndex | index: number | Promise\<boolean> | Sets index and animates the slider. Returns `false` if the slider is in animation.
getTotal | | number | Returns total number of images.
getCurrent | | [SliderElement](#slider-element) | Returns the current element.
getTiming | | string | Returns timing value.
setTiming | timing: string | void | Sets timing value.
getDuration | | number | Returns duration.
setDuration | duration: number | void | Sets duration.
getAutoPlaySpeed | | number | Returns auto play speed.
setAutoPlaySpeed | speed: number | void | Sets auto play speed.

<span style="font-size:.9rem;">*: You can give an HTML element or a CSS selector (like `#carousel`, `.container > div:first-child`)</span>

## IE Support
IE 10 is not supported and patches to fix problems will not be accepted.

## License
Marvina Slider React is provided under the MIT License.
