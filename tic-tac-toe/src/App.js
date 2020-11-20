import React from 'react';
import './App.css';
import Modal from "react-modal";

Modal.setAppElement("#root");

//For modal window
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Board extends React.Component {
    render() {
        let gridSize = this.props.boardSize === "small" ? "board-grid-small" : "board-grid-big";
        console.log("Board.playerTokens: '%s", this.props.playerTokens.toString());
        return (
            <div className={"board-grid " + gridSize}>
                {this.props.boardData.map((sq, index) =>
                    <div key={index} className="board-item"
                         onClick={() => {
                             this.props.handleClick(index)
                         }}>
                        {this.props.playerTokens[sq]}
                    </div>
                )}
            </div>
        );
    }
}

class History extends React.Component {
    render() {
        return (
            <div className="history-container">
                {this.props.history.map((b, index) =>
                    <div key={index}
                         onClick={() => this.props.clickHandlerHistory(index)}>
                        <Board
                            boardData={b}
                            boardSize="small"
                            handleClick={this.props.clickHandlerNone}
                            playerTokens={this.props.playerTokens}
                        />
                    </div>
                )}
            </div>
        )
    }
}

class App extends React.Component {
    winStates = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    playerNone = 0;
    player1 = 1;
    player2 = 2;

    constructor(props) {
        super(props);
        this.state = {
            board: [this.playerNone, this.playerNone, this.playerNone, this.playerNone,
                this.playerNone, this.playerNone, this.playerNone, this.playerNone,
                this.playerNone],
            player1Token: "X",
            player2Token: "O",
            playerNoneToken: "",
            player: 1,//starting player
            win: this.playerNone,
            history: [],
            showModal: false,
            historySelected: null,
        }
    }

    handleClick = (i) => {
        if (this.state.win !== this.playerNone) {
            return;
        }

        const current = this.state.player;
        const board = [...this.state.board];
        console.log("length %s", board.length)
        const history = [...this.state.history];
        history.push(board);
        console.log("lengthH1 %s", history.length)
        console.log("i: '%s', player: '%s'", i, current);
        if (this.state.board[i] === this.playerNone) {
            this.setState((prevState) => {
                prevState.board[i] = current;
                prevState.player = current === this.player1 ? this.player2 : this.player1;
                console.log("prevState: '%s'", prevState.player);

                prevState.history = history;
                console.log("lengthH2 %s", prevState.history.length)
                return prevState;
            }, this.checkForWinOrDraw)
        }
        console.log("size: %s", this.state.history.length);
    }

    handleClickNone() {
        console.log("handle click none");
    }

    checkForWinOrDraw() {
        const winnerTokens = ["DRAW", this.state.player1Token,
            this.state.player2Token];
        let winner = this.playerNone;
        this.winStates.forEach(s => {
            const p1 = this.state.board[s[0]];
            const p2 = this.state.board[s[1]];
            const p3 = this.state.board[s[2]];
            if (p1 !== this.playerNone && p1 === p2 && p1 === p3) {
                winner = winnerTokens[p1];
            }
        })

        if (winner === this.playerNone) {
            let draw = this.state.board.find(sq => sq === this.playerNone);

            console.log("draw: '%s'", draw)
            if (draw === undefined) {
                winner = winnerTokens[this.playerNone];
            }
        }

        this.setState({win: winner});
    }

    handleClickHistory = (index) => {
        console.log("Handle Click History index: '%s'", index);
        this.setState({
            showModal: true,
            historySelected: index
        });
    }

    closeModal = () => {
        console.log("showModal: '%s'", this.state.showModal)
        this.setState({
            showModal: !this.state.showModal,
            historySelected: null
        });
    };

    handleModalOK = () => {
        console.log("handleModalOK: '%s'", this.state.showModal)
        const showModal = !this.state.showModal;
        const board = [...this.state.history[this.state.historySelected]];
        const history = this.state.history.slice(0, this.state.historySelected);
        //would it be better to save player in history with board
        let count = 0;
        board.forEach(sq => count += (sq === this.playerNone ? 0 : 1));
        const player = count % 2 === 0 ? this.player1 : this.player2;

        this.setState((prevState) => {
            prevState.showModal = showModal;
            prevState.board = board;
            prevState.history = history;
            prevState.win = this.playerNone;
            prevState.player = player;
            return prevState;
        });
    }

    handleReset = () => {
        console.log("Resetting game");
        this.setState({
            board: [this.playerNone, this.playerNone, this.playerNone, this.playerNone,
                this.playerNone, this.playerNone, this.playerNone, this.playerNone,
                this.playerNone],
            playerNoneToken: "",
            player: 1,
            win: this.playerNone,
            history: [],
            showModal: false,
            historySelected: null,
        });
    }

    render() {
        const playerTokens = [this.state.playerNoneToken, this.state.player1Token,
            this.state.player2Token];
        console.log("playerTokens: '%s'", playerTokens.toString())

        return (
            <div>
                <div>
                    <Modal
                        isOpen={this.state.showModal}
                        style={customStyles}
                        contentLabel="Reset Game State"
                    ><h1>Reset game to previous state?</h1>
                        <div className="model-button-container">
                            <button className="modal-button-close"
                                    onClick={this.closeModal}>Close
                            </button>
                            <button className="modal-button-ok"
                                    onClick={this.handleModalOK}>OK
                            </button>
                        </div>
                    </Modal>
                </div>
                <div className="board-container">
                    <div style={{marginLeft: "10px"}}>
                        <h1>Tic Tac Toe</h1>
                        {this.state.win === this.playerNone ?
                            <p>Current Player: {playerTokens[this.state.player]}</p> :
                            <p>WINNER: {this.state.win}</p>
                        }
                        <Board boardData={this.state.board}
                               handleClick={this.handleClick}
                               playerTokens={playerTokens}/>

                    </div>
                    <div>
                        <h1>History</h1>
                        <p>Select a previous state to return to</p>
                        <History history={this.state.history}
                                 clickHandlerHistory={this.handleClickHistory}
                                 clickHandlerNone={this.handleClickNone}
                                 playerTokens={playerTokens}/>
                    </div>
                </div>
                <br/>
                <button onClick={this.handleReset}>Reset Game</button>
            </div>
        );
    }
}

export default App;
