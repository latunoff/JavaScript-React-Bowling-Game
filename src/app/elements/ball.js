import React, { Component } from 'react';
import Circle from '../elements/circle';

export class Ball extends React.Component
{
    constructor(context, x, y, r, color)
    {
        super();
        this.context = context;
        this.x = this.x2 = x;
        this.y = this.y2 = y;
        this.radius = r;
        this.color = color;
        this.interval = null;
        this.isMoving = false;
    }

    componentWillUnmount() {
        clearInterval(_self.interval);
    }

    setBall(x, y)
    {
        if (!this.isMoving) {
            // clear last drawed ball
            this.context.clearRect(this.x - this.radius-1, this.y - this.radius-1, this.radius*2+2, this.radius*2+2);

            x ? this.x = x : x;
            y ? this.y = y : y;
            
            Circle(this.context, this.x, this.y, this.radius, this.color);
        }
    }

    kickBall(new_x, new_y)
    {
        //alert(new_x + '-' + new_y);
        // set target values "to"
        this.x2 = new_x;
        this.y2 = new_y;

        // start movement
        if (!this.isMoving)
            this.interval = setInterval(this.movingBall, 10, this);
        this.isMoving = true;
    }

    movingBall(_self)
    {
        // clear last drawed ball
        _self.context.clearRect(_self.x - _self.radius-1, _self.y - _self.radius-1, _self.radius*2+2, _self.radius*2+2);
        
        // set margin koefficients
        _self.xmf = _self.ymf = 1;

        // calculate differences between marginations
        Math.abs(_self.x2 - _self.x) < Math.abs(_self.y2 - _self.y)
            ? _self.xmf = Math.abs((_self.x2 - _self.x) / (_self.y2 - _self.y))
            : _self.xmf = Math.abs((_self.y2 - _self.y) / (_self.x2 - _self.x));
        
        
        // new position calculations
        _self.x > _self.x2 ? _self.x -= 1*_self.xmf : _self.x += 1*_self.xmf;
        _self.y > _self.y2 ? _self.y -= 1*_self.ymf : _self.y += 1*_self.ymf;

        // stop movement
        if (_self.y2 == _self.y) 
        {
            _self.isMoving = false;
            clearInterval(_self.interval);
        }

        Circle(_self.context, _self.x, _self.y, _self.radius, _self.color);
    }

    render(){
        return (
            <div>
                ...
            </div>
        );
    }
}
