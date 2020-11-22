import React from 'react';
import './App.css';
import userData from './userData.json';
import carData from './carData.json';


class Menu extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            showMenu: false,
        }
    }

    showMenu = (event) => {
        console.log("showMenu");
        event.preventDefault();
        this.setState({showMenu: true},
            () => {
                document.addEventListener('click', this.closeMenu)
            }
        );
    }

    closeMenu = (event) => {
        console.log("closeMenu");
        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({showMenu: false}, () => {
                    document.removeEventListener('click', this.closeMenu)
                }
            );
        }
    }

    render() {
        return (
            <div className="menu" ref={(element) =>
                this.dropdownMenu = element}>
                <button onClick={this.showMenu}>...</button>
                {
                    this.state.showMenu
                        ? (
                            <div className="menu">
                                <div className="menu-button-container">
                                    {this.props.children}
                                </div>
                            </div>
                        )
                        : null
                }
            </div>
        )
    }
}

class Card extends React.Component {
    render() {
        return (
            <div className="card-item">
                <div className="card-menu-container">
                    <Menu>
                        <button className="menu-button"
                                onClick={(e) => this.props.handleClick(1, this.props.itemId)}>
                            Menu item 1</button>
                        <button className="menu-button"
                                onClick={(e) => this.props.handleClick(2, this.props.itemId)}>
                            Menu item 2</button>
                    </Menu>
                    <Menu children={(<div>
                            <button className="menu-button"
                                    onClick={(e) => this.props.handleClick(3, this.props.itemId)}>
                                Menu item 3</button>
                            <button className="menu-button"
                                    onClick={(e) => this.props.handleClick(4, this.props.itemId)}>
                                Menu item 4</button>
                        </div>
                    )}>
                    </Menu>
                </div>
                <img src={this.props.image} alt="Avatar" style={{width: "100%"}}/>
                <div className="card-info">
                    <h4><b>{this.props.name}</b></h4>
                    <p>{this.props.description}</p>
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            id: 0,
            buttonId: 0,
        }
    }

    handleClick = (buttonId, itemId) => {
        console.log("buttonId: '%s', itemId: '%s'", buttonId, itemId);
        this.setState({id: itemId, buttonId: buttonId});
    }

    render() {
        return (
            <div className="main">
                <div className="main-header">
                    <h1 className="title">Cards</h1>
                    <p>id:{this.state.id}, buttonId:{this.state.buttonId}</p>
                </div>
                <div className="top-container">
                    <div className="card-container">
                        {
                            userData.map(u => {
                                const img = "./images/" + u.img;
                                return <Card
                                    key={u.id}
                                    itemId={u.id}
                                    name={u.name}
                                    description={u.occupation}
                                    image={img}
                                    handleClick={this.handleClick}/>
                            })
                        }
                    </div>
                    <div className="card-container">
                        {
                            carData.map(c => {
                                const img = "./images/" + c.img;
                                return <Card
                                    key={c.id}
                                    itemId={c.id}
                                    name={c.make}
                                    description={c.model}
                                    image={img}
                                    handleClick={this.handleClick}/>

                            })
                        }
                    </div>
                </div>
                <div className="bottom-container">
                    <div className="card-container">
                        {
                            carData.map(c => {
                                const img = "./images/" + c.img;
                                return <Card
                                    key={c.id}
                                    itemId={c.id}
                                    name={c.make}
                                    description={c.model}
                                    image={img}
                                    handleClick={this.handleClick}/>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
