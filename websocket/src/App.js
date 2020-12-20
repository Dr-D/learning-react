import React from 'react'
import './App.css';
import SockJsClient from 'react-stomp'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: "",
            name: ""
        }
    }

    setName = (name) => {
        console.log(name.target.value);
        this.setState({name: name.target.value});
    };

    sendMessage = () => {
        console.log("Sending message: '%s', '%s", this.state.name, this.state.typedMessage)
        this.clientRef.sendMessage('/app/hello', JSON.stringify({
            name: this.state.name,
            message: this.state.typedMessage
        }));
    };

    displayMessages = () => {
        console.log("display messages: '%s'", this.state.messages)
        return (
            <div>
                {this.state.messages.map((msg, index) => {
                    return (
                        <div key={index}>
                            {this.state.name === msg.name ?
                                <div>
                                    <p className="title1">{msg.name} : </p><br/>
                                    <p>{msg.message}</p>
                                </div> :
                                <div>
                                    <p className="title2">{msg.name} : </p><br/>
                                    <p>{msg.message}</p>
                                </div>
                            }
                        </div>)
                })}
            </div>
        );
    };


    render() {
        return (
            <div>
                <div className="align-center">
                    <h1>Web Sockets</h1>
                    <br/><br/>
                </div>
                <div className="align-center">
                    User : <p className="title1"> {this.state.name}</p>
                    <input type="text" placeholder="Enter Username" onChange={(e) => this.setName(e)}/>
                </div>
                <div className="align-center">
                    <br/><br/>
                    <table border="1px">
                        <tbody>
                        <tr>
                            <td>
                                <textarea placeholder="Enter Message to Send"
                                          onChange={(event) => {
                                              this.setState({typedMessage: event.target.value});
                                          }}/>
                            </td>
                            <td>
                                <button color="primary"
                                        onClick={this.sendMessage}>Send
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <br/><br/>
                <p className="align-center" >Notifications</p>
                <div className="align-center">
                    {this.displayMessages()}
                </div>
                <SockJsClient url='http://localhost:8080/messages/'
                              topics={['/topic/greetings']}
                              onConnect={() => {
                                  console.log("connected");
                              }}
                              onDisconnect={() => {
                                  console.log("Disconnected");
                              }}
                              onMessage={(msg) => {
                                  const jobs = this.state.messages;
                                  jobs.push(msg);
                                  this.setState({messages: jobs});
                                  console.log(this.state);
                              }}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>
            </div>
        )
    }
}

export default App;
