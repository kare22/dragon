import React, {Component, PureComponent} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Game, Message, Reputation, Item, Log} from "./models";
import LogBox from "./components/LogBox";
import ProductBox from "./components/ProductBox";
import MessageBox from "./components/MessageBox";


const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: 'React POST Request Example'})
};


class App extends Component {


    componentDidMount(): void {

        this.startGame();

    }

    state = {
        game: new Game(),
        reputation: new Reputation(),
        items: [],
        messages: [],
        log: []

    };

    log(message: string, type?: string) {
        this.setState({
            log: [...this.state.log, {
                message: message,
                timeStamp: new Date(),
                type: type ? type : 'neutral'
            }]
        })
    }

    updateGameData(result: Game) {
        let game = this.state.game;
        if(result.gold){game.gold = result.gold}
        if(result.turn){game.turn = result.turn}
        if(result.lives){game.lives = result.lives}
        if(result.level){game.level = result.level}
        if(result.score){game.score = result.score}
        this.setState({game: game});
    }

    startGame() {
        fetch("https://dragonsofmugloar.com/api/v2/game/start", requestOptions).then(res => res.json()).then((result) => {
            this.setState({game: result});
            this.getAllProducts(result.gameId);
            this.getAllMessages(result.gameId);
            this.getInvestigationData(result.gameId);
            this.setState({log: []});
            this.log('Game started!')
        })
    }

    getAllProducts(gameId: any) {
        fetch("https://dragonsofmugloar.com/api/v2/" + gameId + "/shop").then(res => res.json()).then((result) => this.setState({items: result}))
    }

    getAllMessages(gameId: any) {
        fetch("https://dragonsofmugloar.com/api/v2/" + gameId + "/messages").then(res => res.json()).then((result) => {
            if(result && result.status && result.status === "Game Over"){
                let game = this.state.game;
                game.lives = 0;
                this.setState({game: game})
            } else {
                this.setState({messages: result})
            }
        })
    }

    getInvestigationData(gameId: any) {
        fetch("https://dragonsofmugloar.com/api/v2/" + gameId + "/investigate/reputation", requestOptions).then(res => res.json()).then((result) => this.setState({reputation: result}))
    }

    displayGameData(game: Game, reputation: Reputation) {
        if (game) {
            return (
                <ul className="navbar-nav" style={{color: "white"}}>
                    {/*<li className="nav-item">Game id: {game.gameId ? game.gameId : 'waiting for new game'}</li>*/}
                    <li className="nav-item">Lives: {game.lives ? game.lives : 0}</li>
                    <li className="nav-item">Gold: {game.gold ? game.gold : 0}</li>
                    <li className="nav-item">Level: {game.level ? game.level : 0}</li>
                    <li className="nav-item">Score: {game.score ? game.score : 0}</li>
                    <li className="nav-item">Turn: {game.turn ? game.turn : 0}</li>
                    {/*<li className="nav-item">High Score: {game.highScore ? game.highScore : 0}</li>*/}
                    <li className="nav-item">People: {reputation.people ? reputation.people.toFixed(2) : 0}</li>
                    <li className="nav-item">State: {reputation.state ? reputation.state : 0}</li>
                    <li className="nav-item">Underworld: {reputation.underworld ? reputation.underworld : 0}</li>
                </ul>
            )
        } else {
            return (<div>No game data</div>)
        }
    }

    render() {
        return (
            <div className="main-wrapper">
                <div className="start" style={this.state.game.lives > 0 ? {display: 'none'} : {}}>
                    <div className="row start-row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <div className="box-button" style={{textAlign: 'center'}} onClick={() => this.startGame()}>
                                You died, with the score of <b>{this.state.game.score}</b>!
                                <br/>
                                <span style={{fontSize: '20px'}}>START NEW GAME</span>
                            </div>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
                <div className="game" style={!(this.state.game.lives > 0) ? {display: 'none'} : {}}>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom: '2vh'}}>
                        <div className="justify-content-md-start">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <button onClick={() => this.startGame()}>start new game</button>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar navbar-light justify-content-md-end">
                            {this.displayGameData(this.state.game, this.state.reputation)}
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-7">
                                <MessageBox game={this.state.game} log={(l: string) => this.log(l)}
                                            messages={this.state.messages}
                                            getInvestigationData = {(gameId: any) => this.getInvestigationData(gameId)}
                                            getAllMessages={(msg: Array<Message>) => this.getAllMessages(msg)}
                                            updateGameData={(result: Game) => this.updateGameData(result)}/>
                            </div>
                            <div className="col-lg-3">
                                <div className="row">
                                    <ProductBox game={this.state.game} items={this.state.items}
                                                log={(l: string) => this.log(l)}
                                                updateGameData={(result: Game) => this.updateGameData(result)}
                                                getInvestigationData = {(gameId: any) => this.getInvestigationData(gameId)}
                                                getAllMessages={(msg: Message) => this.getAllMessages(msg)}/>
                                </div>
                                <div className="row">
                                    <LogBox log={this.state.log}/>
                                </div>
                            </div>
                            <div className="col-lg-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default App;
