import React, { Component } from 'react';
import Circle from '../elements/circle';

export class Skittles extends React.Component
{
    total = 10;

    constructor(context, x, y, r, color) {
        super();
        this.context = context;
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.positions = [
            {x: 0, y: 0},
            {x: r*2+1, y: 0},
            {x: r*4+2, y: 0},
            {x: r*6+3, y: 0},
            {x: r+1, y: r*2},
            {x: r*3+2, y: r*2},
            {x: r*5+3, y: r*2},
            {x: r*2, y: r*4},
            {x: r*4+1, y: r*4},
            {x: r*3, y: r*6},
        ];
        this.deleted = 0;
    }

    setSkittles() {
        this.deleted = 0;
        this.positions.forEach((point) => {
            Circle(this.context, this.x+point.x, this.y+point.y, this.r, this.color);
        });
    }

    deleteSkittles(n) {
        this.positions.slice(this.total - n - this.deleted).forEach((point) => {
            this.context.clearRect(this.x+point.x - this.r - 1, this.y+point.y - this.r - 1, this.r*2+2, this.r*2+2);
        });
        this.deleted = n;
    }
}
