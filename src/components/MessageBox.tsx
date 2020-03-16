import React, {Component} from 'react';
import {Game, Message} from "../models";

type Props = {
    log: Function,
    updateGameData: Function,
    getAllMessages: Function,
    messages: Array<Message>,
    getInvestigationData: Function,
    game: Game
}

const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: 'React POST Request Example'})
};

class MessageBox extends Component<Props> {

    displayMessagesData(messages: Array<Message>) {
        if (messages.length > 0) {
            return (
                <ul>
                    {messages.map(message => {
                        return (<li key={message.adId}>
                            <b>Message</b>: {message.encrypted && message.encrypted === 1 ? atob(message.message) : message.message}<br/>
                            <b>Reward</b>: {message.reward} - <b>Probability</b>: {message.encrypted && message.encrypted === 1 ? atob(message.probability) : message.probability}<br/>
                            <b>Expires in</b>: {message.expiresIn} turns<br/>
                            <button onClick={() => this.solveQuest(this.props.game.gameId, message.encrypted && message.encrypted === 1 ? atob(message.adId) : message.adId)}>Solve Quest
                            </button>
                            {message.encrypted && message.encrypted === 1 ? <b>ENCRYPTO</b> : null}
                            {message.encrypted ? message.encrypted : null}
                        </li>)
                    })}
                </ul>
            )
        } else {
            return (<div>No messages</div>)
        }
    }

    solveQuest(gameId: any, adId: any) {
        fetch("https://dragonsofmugloar.com/api/v2/" + gameId + "/solve/" + adId, requestOptions).then(res => res.json()).then((result) => {


            this.props.log(result.message, (result.success ? 'success' : 'fail'));
            this.props.updateGameData(result);
            this.props.getAllMessages(gameId);
            this.props.getInvestigationData(gameId);
            console.log(result);

        })
    }

    render() {
        return (
            <div className="overflow-auto box message-box">
                {this.displayMessagesData(this.props.messages)}
            </div>
        );
    }
}

export default MessageBox;
