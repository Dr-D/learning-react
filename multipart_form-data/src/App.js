import './App.css';
import React from  'react'

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedFile: "",
      message: "",
      result: null,
    }
  }

  callbackResponse = (response) => {
    response.text().then((text) =>
        this.setState({message: "Server Responsech: " + text})
    )
  }
  callbackSuccess = (result) => {
    // this.setState({message: "Server Response Success: " + result})
  }

  callbackFail = (error) => {
    this.setState({message: "Server Response Error: '" + error.toString() + "'"});
  }

  handleClick = (event) => {
    if (this.state.selectedFile === "") {
      this.setState({message: "File not selected"})
      return;
    }

    event.preventDefault();
    const formdata = new FormData();
    formdata.append("file", this.state.selectedFile, "image.jpeg");

    const json = JSON.stringify({name: "DrD",
      age: 10});
    const blob = new Blob( [json] , {type: 'application/json'});
    formdata.append("person",  blob);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    try {
      fetch("http://localhost:8080/person/uploadimage", requestOptions)
          .then(response => this.callbackResponse(response))
          .then((result) => {
            this.callbackSuccess(result)
          })
          .catch(error => this.callbackFail(error));
    } catch (err) {
      console.log("err.message", err.message);
      this.setState({message: "Catch err.message:" + err.message})
    }
  }

  setSelectedFiles(event) {
    event.preventDefault();
    const url = URL.createObjectURL(event.target.files[0]);
    console.log("url: " + url);
    console.log("files[0].name: " + event.target.files[0].name);
    this.setState({selectedFile: event.target.files[0],
    result: url});
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img alt="Selected File" src={this.state.result}/>
            <input
                type="file"
                onChange={(e) => this.setSelectedFiles(e)}
            />
            <button onClick={(e) => this.handleClick(e)} >Upload</button>
            <p>Message: {this.state.message}</p>
          </header>
        </div>
    );
  }
}

export default App;
