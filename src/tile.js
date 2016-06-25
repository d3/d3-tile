import {range} from "d3-array";

export default function() {
  var x0 = 0,
      y0 = 0,
      x1 = 960,
      y1 = 500,
      zoomDelta = 0;

  function tile(t) {

    var z = Math.max(Math.log(t.k) / Math.LN2 - 8, 0),
        z0 = Math.round(z + zoomDelta),
        k = Math.pow(2, z - z0 + 8),
        x = t.x - t.k / 2,
        y = t.y - t.k / 2,
        tiles = [],
        cols = range(Math.max(0, Math.floor((x0 - x) / k)), Math.max(0, Math.ceil((x1 - x) / k))),
        rows = range(Math.max(0, Math.floor((y0 - y) / k)), Math.max(0, Math.ceil((y1 - y) / k)));

    rows.forEach(function(y) {
      cols.forEach(function(x) {
        tiles.push([x, y, z0]);
      });
    });

    tiles.translate = [x / k, y / k];
    tiles.scale = k;
    return tiles;
  }

  tile.size = function(_) {
    return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], tile) : [x1, y1];
  };

  tile.extent = function(_) {
    return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], tile) : [[x0, y0], [x1, y1]];
  };

  tile.zoomDelta = function(_) {
    return arguments.length ? (zoomDelta = +_, tile) : zoomDelta;
  };

  return tile;
}
