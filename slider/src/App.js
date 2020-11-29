import React from 'react'
import './App.css';
import img_fiesta from './assets/fiesta.jpeg'
import img_focus from './assets/focus.jpeg'
import img_smax from './assets/smax.jpeg'


class Slider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedImage: 0,
            width: this.props.width ? this.props.width : 300,
            height: this.props.height ? this.props.height : 200,
        }
    }

    left = 0
    right = 1

    handleArrow = (type) => {
        let index;
        if (type === this.left) {
            if (this.state.selectedImage < 1) {
                index = this.props.images.length - 1;
            } else {
                index = this.state.selectedImage - 1;
            }
        } else {
            if (this.state.selectedImage > this.props.images.length - 2) {
                index = 0;
            } else {
                index = this.state.selectedImage + 1;
            }
        }

        this.setState({
            selectedImage: index,
        })
    }

    render() {
        return (
            <div className="slide">
                <span className="arrow" onClick={() => this.handleArrow(this.left)}>&lt;</span>
                <span style={{height: this.state.height + "px", width: this.state.width + "px"}}>
                    <img className="slide-image"
                         alt=""
                         src={this.props.images[this.state.selectedImage]}
                         onClick={() => this.props.handleSelected(this.state.selectedImage)}
                    />
                </span>
                <span className="arrow" onClick={() => this.handleArrow(this.right)}>&gt;</span>
            </div>
        )
    }
}

class App extends React.Component {

    handleImageSelected = (i) => {
        console.log("imageSelected: '%s'", i);
    }

    render() {
        const images = [img_fiesta, img_focus, img_smax];
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        <Slider images={images}
                                width={300}
                                height={200}
                                handleSelected={this.handleImageSelected}
                        />
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
