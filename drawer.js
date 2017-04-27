/**
 * Helper class for drawing canvas objects
 */
class Drawer {
    constructor(context) {
        this.ctx = context;
    }

    drawCircle(color, x, y, r, startRad, endRad, anticlockwise) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, startRad, endRad, anticlockwise || false);
        this.ctx.fill();
    }

    drawRect(color, x, y, w, h) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }

    drawText(color, x, y, font, text ) {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, x, y);
    }
}