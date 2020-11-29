import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedFile: "",
            imageURL: null,
        }

        this.fileInput = null;

        this.setInputRef = element => {
            this.fileInput = element;
        }

    }

    setSelectedFiles = event => {
        console.log("setSelectedFiles")
        event.preventDefault();
        if (event.target.files[0]) {
            const url = URL.createObjectURL(event.target.files[0]);
            console.log("url: " + url);
            console.log("files[0].name: " + event.target.files[0].name);
            this.setState({
                selectedFile: event.target.files[0],
                imageURL: url
            });
        }
    }

    handleDragEnter = e => {
        console.log("Drag Enter")
        e.preventDefault();
        e.stopPropagation();
    };
    handleDragLeave = e => {
        console.log("Drag Leave")
        e.preventDefault();
        e.stopPropagation();
    };
    handleDragOver = e => {
        console.log("Drag Over")
        e.preventDefault();
        e.stopPropagation();
    };
    handleDrop = e => {
        console.log("Drag Drop")
        e.preventDefault();
        e.stopPropagation();
        let files = [...e.dataTransfer.files];
        if (files && files.length > 0) {
            const url = URL.createObjectURL(e.dataTransfer.files[0]);
            console.log("url: " + url);
            console.log("Setting selectedFile: ", files[0].name);
            this.setState({
                selectedFile: files[0],
                imageURL: url
            })
        }
    };

    handleChooseFile = (e) => {
        if (this.fileInput) {
            this.fileInput.click();
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="image-container"
                         onDrop={e => this.handleDrop(e)}
                         onDragOver={e => this.handleDragOver(e)}
                         onDragEnter={e => this.handleDragEnter(e)}
                         onDragLeave={e => this.handleDragLeave(e)}
                    >
                        <img className="image" alt="Selected File" src={this.state.imageURL}/>
                    </div>
                    <input
                        ref={this.setInputRef}
                        style={{display: "none"}}
                        type="file"
                        onChange={(e) => this.setSelectedFiles(e)
                        }
                    />
                    <span>
                        <button onClick={this.handleChooseFile}>Choose file</button>
                        {this.state.selectedFile.name}
                    </span>
                </header>
            </div>
        );
    }
}

export default App;
