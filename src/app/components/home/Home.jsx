import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stat, { StatCount } from '../stat/Stat';
import Canvas from '../canvas/Canvas';

import { setSkittles } from '../../elements/skittle';
import { setBall, Ball } from '../../elements/ball';

class Home extends Component {
    constructor(props) {
        super(props);
        this.ball = 0;
        this.counter = null;
    }

    componentWillMount() {
        this.stat = {
            roll: 1,
            rolls: 2,
            frame: 1,
            frames: 10,
            scores: [],
            throw: 0,
            scorenow: 0,
            scoreroll: 0,
            scoreframe: 0,
            score: 0,
            strike: false,
            spare: false
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

        setSkittles(context, 243, 40, 25, "rgba(200, 200, 200)");

        this.ball = new Ball(context, 320, 440, 30, "black");
        this.ball.setBall();

        document.addEventListener("mousedown", this.gameInit, false);
    };

    gameStart()
    {
        this.updateLevel();

        let offset = Math.floor(Math.random() * 60) -30;
        this.ball.kickBall(320 + offset, 245);
        
        setTimeout(() => this.scoreCount(offset), 2000);
        setTimeout(() => this.ball.setBall(320, 440), 1000);    
    }

    scoreCount(offset)
    {
        this.counter.addThrow(10 - Math.abs(Math.floor(offset/3)));

        this.stat.score = this.counter.getScore();

        this.updateLevel();

        this.setState(this.stat);
    }

    scoreCount1(offset)
    {
        this.stat.scoreroll = 10 - Math.abs(Math.floor(offset/3));

        this.stat.roll == 1 ? this.stat.scoreframe = this.stat.scoreroll : this.stat.scoreframe += this.stat.scoreroll;
        if (this.stat.strike) {
            
            this.stat.score += this.stat.scorenow + 10;
            this.stat.strike = false;
        }
        if (this.stat.scorenow == 10 && this.stat.strike)
            this.stat.spare = true;
        // fix strike            
        if (this.stat.scorenow == 10 && this.stat.roll == 1) {
            this.stat.strike = true;
            this.stat.roll = 1;
            this.stat.frame++;
        }

        this.updateLevel();

        this.setState(this.stat);
    }

    updateLevel()
    {
        if (this.stat.roll < this.stat.rolls)
            this.stat.roll++;
        else 
            { this.stat.frame++; this.stat.roll = 1;}
        if (this.stat.frame == this.stat.frames)
            { this.stat.roll = this.stat.frame = 1; }
        this.setState(this.stat);
    }

    render() {
      return <div className="container home">
                <h1>Bowling Game</h1>
                <Stat className="info" stat={this.stat}></Stat>
                <button onClick={() => this.gameStart()}>Start</button>
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
