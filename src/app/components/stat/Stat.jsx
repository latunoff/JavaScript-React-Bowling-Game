import React, { Component } from 'react';
import { connect } from 'react-redux';

class Stat extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className={this.props.className}>
                <p>Statistic:</p>
                <div>
                    <div>Frame: {this.props.stat.frame} / {this.props.stat.frames}</div>
                    <div>Roll: {this.props.stat.roll} / {this.props.stat.rolls}</div>
                    <div><b>Score: Now: {this.props.stat.scorenow} / Total: {this.props.stat.score}</b></div>
                    <div>{this.props.stat.strike ? <span>Strike!</span> : <span></span>}</div>
                    <div>{this.props.stat.spare ? <span>Spare!</span> : <span></span>}</div>
                </div>
            </div>
        );
    }
}

export class StatCount extends Component {
    throws = [];
    frame = 0;

    constructor(){
        super();
        let throws = [];
    }
    
    addThrow(score) {
        this.throws.push(score);
        console.log(this.throws);
    }

    isSpare() {
        return this.throws[this.frame] + this.throws[this.frame + 1] === 10;
    }

    isStrike() {
        return this.throws[this.frame] === 10;
    }
    
    frameScore() {
        return this.throws[this.frame] + this.throws[this.frame + 1];
    }

    spareScore() {
        return this.throws[this.frame + 2];
    }

    strikeScore() {
        return this.throws[this.frame + 1] + this.throws[this.frame + 2];
    }

    getScore() {
        let score = 0;

        for (let i = 0; i < this.throws.length; i++) {
            if (this.isStrike()) {
                score += 10 + this.strikeScore();
                this.frame++;
            } else if (this.isSpare()) {
                score += 10 + this.spareScore();
                this.frame += 2;
            } else {
                score += this.frameScore();
                this.frame += 2;
            }
        }
        return score;
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default Stat;

/*
function mapStateToProps (state) {
    let statenew = {};
    statenew = {
        frame: 5,
        count: 3
    }
    return statenew;
}

export default connect(mapStateToProps)(Stat);
/*
function Stat(props){
    return <div {...props}>
        <p>Statistic:</p>
        {props.count}
        </div>
}
*/
