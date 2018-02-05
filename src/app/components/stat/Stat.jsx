import React, { Component } from 'react';
import { connect } from 'react-redux';

class Stat extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow="{{(this.props.stat.bar)*5}}"
                    aria-valuemin="0" aria-valuemax="100" style={{ width: (this.props.stat.bar)*5 + '%'}}>
                        <span className="sr-only"></span>
                    </div>
                </div> 
                <p>Statistic:</p>
                <div className="table">Table: {this.props.stat.table.map((item) => <span>{item}</span>)}</div>
                <div>
                    <div>Frame: {this.props.stat.frame} / {this.props.stat.frames}</div>
                    <div>Roll: {this.props.stat.roll} / {this.props.stat.rolls}</div>
                    <div><b>Score: Throw: {this.props.stat.scorenow} / Total: {this.props.stat.score}</b></div>
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
    }

    rollScore(fr) {
        return this.throws[fr] ? this.throws[fr] : 0;
    }

    isSpare() {
        return this.rollScore(this.frame) + this.rollScore(this.frame + 1) === 10;
    }

    isStrike() {
        return this.rollScore(this.frame) === 10;
    }
    
    frameScore() {
        return this.rollScore(this.frame) + this.rollScore(this.frame + 1);
    }

    spareScore() {
        return this.rollScore(this.frame + 2);
    }

    strikeScore() {
        return this.rollScore(this.frame + 1) + this.rollScore(this.frame + 2);
    }

    getScore() {
        this.frame = 0;
        let score = 0;
        //console.log(this.throws);

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
            //console.log(i+'-'+this.frame+'-'+score);
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
