import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Ball } from '../../elements/ball';

class Canvas extends React.Component{
    
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Ball />
                <canvas id="game" width="640" height="480"></canvas>
            </div>
        );
    }
}

export default Canvas;
