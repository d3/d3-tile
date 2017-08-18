export default function TileTransform(scale, x, y) {
  var r = scale % 1 ? Number : Math.round;
  this.x = r(x * scale);
  this.y = r(y * scale);
  this.k = scale / 256;
}

TileTransform.prototype = {
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
