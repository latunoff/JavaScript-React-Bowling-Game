function Circle(context, x, y, r, color)
{
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

export default Circle;