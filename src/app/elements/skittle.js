import Circle from '../elements/circle';

export function setSkittles(context, x, y, r, color)
{
    Circle(context, x, y, r, color);
    Circle(context, x+r*2+1, y, r, color);
    Circle(context, x+r*4+2, y, r, color);
    Circle(context, x+r*6+3, y, r, color);
    Circle(context, x+r+1, y+r*2, r, color);
    Circle(context, x+r*3+2, y+r*2, r, color);
    Circle(context, x+r*5+3, y+r*2, r, color);
    Circle(context, x+r*2, y+r*4, r, color);
    Circle(context, x+r*4+1, y+r*4, r, color);
    Circle(context, x+r*3, y+r*6, r, color);
}

export default setSkittles;