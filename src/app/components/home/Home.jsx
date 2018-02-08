import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stat, { StatCount } from '../stat/Stat';
import Canvas from '../canvas/Canvas';

import { Skittles } from '../../elements/skittle';
import { Ball } from '../../elements/ball';

class Home extends Component {
    constructor(props) {
        super(props);
        this.skittles = null;
        this.ball = null;
        this.counter = null;
        this.throwLocked = false;
    }

    componentWillMount() {
        this.stat = {
            roll: 1,
            rolls: 2,
            frame: 1,
            frames: 10,
            scores: [],
            score: 0,
            scorenow: 0,
            bar: 0,
            strike: false,
            spare: false,
            table: []
        };
        this.setState(this.stat);
    }

    componentDidMount() {
        this.counter = new StatCount();
        this.gameInit();
        //this.gameStart();
    }

    gameInit()
    {
        var game_canvas = document.getElementById("game");
        var context = game_canvas.getContext("2d");

        // clear canvas
        context.clearRect(0, 0, 640, 480);

        // draw borders
        context.beginPath();
        context.rect(200, 0, 240, 480);
        context.strokeStyle = "rgba(0, 0, 0, 0.8)";
        context.stroke();
        context.closePath();

        this.skittles = new Skittles(context, 243, 40, 25, "rgba(200, 200, 200)");
        this.skittles.setSkittles();

        this.ball = new Ball(context, 320, 440, 30, "black");
        this.ball.setBall();
        this.throwLocked = false;

        //document.addEventListener("mousedown", this.gameInit, false);
    };

    gameStart()
    {
        let offset = Math.floor(Math.random() * 60) -30;
        this.ball.kickBall(320 + offset, 245);
        this.throwLocked = true;
        this.stat.strike = false;
        this.stat.spare = false;
        this.setState(this.stat);
        
        setTimeout(() => this.scoreCount(offset), 2800);
        setTimeout(() => this.ball.setBall(320, 440), 3300);
    }

    scoreCount(offset)
    {
        let throwScore = 10 - Math.abs(Math.floor(offset/3));
        if (this.stat.roll == 2 && throwScore + this.counter.throws[this.counter.throws.length-1] > 10)
            throwScore = 10 - this.counter.throws[this.counter.throws.length-1];
        //console.log(throwScore);
        this.stat.scorenow = throwScore;
        this.counter.addThrow(throwScore);
        this.stat.table.push(throwScore);

        this.skittles.deleteSkittles(throwScore);

        this.stat.score = this.counter.getScore();

        if (this.stat.roll == 2 && throwScore + this.counter.throws[this.counter.throws.length-2] == 10) {
            this.stat.table[this.stat.table.length-1] += ' /';
            this.stat.spare = true;
        }

        if (this.stat.roll == 2)
            setTimeout(() => this.skittles.setSkittles(), 2000);

        if (this.stat.roll == 1 && throwScore == 10) {
            this.updateLevel();
            this.counter.addThrow(0);
            this.stat.table.push('x');
            this.stat.strike = true;
        }

        if (!(this.stat.roll == 2 && this.stat.frame == this.stat.frames)) {
            this.updateLevel();
            this.throwLocked = false;
        }

        this.setState(this.stat);
    }

    updateLevel()
    {
        if (this.stat.roll < this.stat.rolls)
            this.stat.roll++;
        else 
            { this.stat.frame++; this.stat.roll = 1;}
        if (this.stat.frame > this.stat.frames)
            { this.stat.roll = this.stat.frame = 1; }
        this.stat.bar++;
        this.setState(this.stat);
    }

    render() {
      return <div className="container home">
                <h1>Bowling Game</h1>
                <Stat className="stat" stat={this.stat}></Stat>
                <button type="button" className="btn btn-default btn-lg" onClick={() => this.gameStart()} disabled={this.throwLocked}>Throw!</button>
                <Canvas />
            </div>
    }
}

function mapStateToProps (state) {
    return {
        score: state
    }
}
/*
const mapDispatchToProps = {  
    activateGeod
  };
*/
export default connect(mapStateToProps)(Home);

// import React from 'react';
// import Stat from '../stat/Stat';
// import Canvas from '../canvas/Canvas';

// function Home(props) {
//   return (
//     <div className="container home">
//       <h1>Bowling Game</h1>
//       <Stat className="info"></Stat>
//       <Canvas />
//       <canvas id="game" width="640" height="480"></canvas>
//     </div>
//   )
// }

// export default Home;
