import BaseCanvas from './base-canvas';
import Utility from './utility';
import { COLOR } from './color';

export default class MessageQueue extends BaseCanvas {

  constructor(baseDiv, options) {
    super(baseDiv, 100, 200);

    // Options
    this._barWidth = Utility.has(options, 'barWidth') ? options.barWidth : 80;
    this._space = Utility.has(options, 'space') ? options.space : 5;
    this._barColor = Utility.has(options, 'barColor') ? options.barColor : COLOR.green;
    this._maxQueueCapacity = Utility.has(options, 'maxQueueCapacity') ? options.maxQueueCapacity : 20;

    this._queue = [];
    this._speed = 5;
    this._barHeight = 20;
  }

  push() {
    if (this._queue.length >= this._maxQueueCapacity) {
      this.pop();
    }

    this._queue.push({
      x: (100 - this._barWidth) / 2,
      y: 220
    });
  }

  pop() {
    if (this._queue.length > 0) {
      this._queue.shift();
    }
  }

  drawFrame() {
    this.clearAll();
    this._ctx.save();
    this.scale();

    for (let i = 0; i < this._queue.length; i++) {
      let q = this._queue[i];

      let currY = (this._barHeight + this._space) * i + this._space;

      // Move up
      if (currY < q.y) {
        q.y -= this._speed;
      } else {
        q.y = currY;
      }

      this._ctx.beginPath();
      this._ctx.fillStyle = this._barColor;
      this._ctx.fillRect(q.x, q.y, this._barWidth, this._barHeight);
      this._ctx.closePath();
    }

    this._ctx.restore();
  }

  set barColor(barColor) {
    this._barColor = barColor;
  }

  get barColor() {
    return this._barColor;
  }

  get queueSize() {
    return this._queue.length;
  }
}

