import {tileFilterXY, tileFilterNone} from "./filter.js";

export default function() {
  let x0 = 0;
  let y0 = 0;
  let x1 = 960;
  let y1 = 500;
  let tx = (x0 + x1) / 2;
  let ty = (y0 + y1) / 2;
  let tileSize = 256;
  let scale = 256;
  let zoomDelta = 0;
  let filter = tileFilterXY;

  function tile() {
    const z = Math.max(Math.log2(scale / tileSize), 0);
    const z0 = Math.round(z + zoomDelta);
    const k = Math.pow(2, z - z0) * tileSize;
    const x = tx - scale / 2;
    const y = ty - scale / 2;
    const xmin = Math.floor((x0 - x) / k);
    const xmax = Math.ceil((x1 - x) / k);
    const ymin = Math.floor((y0 - y) / k);
    const ymax = Math.ceil((y1 - y) / k);
    const tiles = [];
    for (let y = ymin; y < ymax; ++y) {
      for (let x = xmin; x < xmax; ++x) {
        if (filter(x, y, z0)) {
          tiles.push([x, y, z0]);
        }
      }
    }
    tiles.translate = [x / k, y / k];
    tiles.scale = k;
    return tiles;
  }

  tile.size = function(_) {
    return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], tile) : [x1 - x0, y1 - y0];
  };

  tile.extent = function(_) {
    return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], tile) : [[x0, y0], [x1, y1]];
  };

  tile.scale = function(_) {
    return arguments.length ? (scale = +_, tile) : scale;
  };

  tile.translate = function(_) {
    return arguments.length ? (tx = +_[0], ty = +_[1], tile) : [tx, ty];
  };

  tile.zoomDelta = function(_) {
    return arguments.length ? (zoomDelta = +_, tile) : zoomDelta;
  };

  tile.tileSize = function(_) {
    return arguments.length ? (tileSize = +_, tile) : tileSize;
  };

  tile.filter = function(_) {
    return arguments.length ? (filter = _ == null ? tileFilterNone : filter, tile) : filter === tileFilterNone ? null : filter;
  };

  return tile;
}
