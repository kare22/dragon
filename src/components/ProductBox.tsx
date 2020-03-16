import React, {Component} from 'react';
import {Game, Item} from "../models";
import '../App.css';

type Props = {
    game: Game,
    items: Array<Item>,
    log: Function,
    updateGameData: Function,
    getAllMessages: Function,
    getInvestigationData: Function
}

const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: 'React POST Request Example'})
};


class ProductBox extends Component<Props> {


    buyItem(gameId: any, item: Item) {
        fetch("https://dragonsofmugloar.com/api/v2/" + gameId + "/shop/buy/" + item.id, requestOptions).then(res => res.json()).then((result) => {
            this.props.log((result.shoppingSuccess ? 'Item ' + item.name + 'bought! -' + item.cost + ' gold' : 'Failed to buy: ' + item.name + '!'), (result.shoppingSuccess ? 'success' : 'fail'));
            this.props.updateGameData(result);
            this.props.getAllMessages(gameId);
            this.props.getInvestigationData(gameId);
            console.log(result)
        })
    }

    displayItemsData(items: Array<Item>) {
        if (items.length > 0) {
            return (
                <ul>
                    {items.map(item => {
                        return (<li key={item.id}>
                            {item.name}, <b>{item.cost}</b> gold<br/>
                            <button onClick={() => this.buyItem(this.props.game.gameId, item)}>buy</button>
                        </li>)
                    })}
                </ul>
            )
        } else {
            return (<div>No item data</div>)
        }
    }

    render() {
        return (
            <div className="box product-box">
                {this.displayItemsData(this.props.items)}
            </div>
        );
    }
}

export default ProductBox;
