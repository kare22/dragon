import React, {Component} from 'react';
import {Log} from "../models";
import { animateScroll } from "react-scroll";
import '../App.css'

type Props = {
    log: Array<Log>
}

class LogBox extends Component<Props> {

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps !== this.props){
            animateScroll.scrollToBottom({containerId: 'box'});
        }
    }

    displayLog(log: Array<Log>) {

        function style(type: string) {
            if (type === 'success') {
                return {color: 'green'}
            } else if (type === 'fail') {
                return {color: 'red'}
            }

        }

        if (log.length > 0) {
            return (<ul>
                {log.map((l, i) => {
                    return (<li key={'log_' + i}><span
                        style={style(l.type)}><b>{this.getTime(l.timeStamp)}</b> - {l.message}</span></li>)
                })}
            </ul>)
        } else {
            return (<div>No log</div>)
        }
    }

    getTime(date: Date) {
        function assignTime(time: number) {
            if (time < 10) {
                return '0' + time
            } else {
                return time
            }
        }

        return assignTime(date.getHours()) + ':' + assignTime(date.getMinutes()) + ':' + assignTime(date.getSeconds())
    }

    render() {
        return (
            <div id="box" className="overflow-auto box log-box" >
                    {this.displayLog(this.props.log)}
            </div>
        );
    }
}

export default LogBox;
