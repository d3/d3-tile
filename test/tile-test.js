import tape from "tape-await";
import * as d3 from "../src/index.js";

tape("d3.tile() has the expected defaults", test => {
  const tile = d3.tile();
  test.deepEqual(tile.size(), [960, 500]);
  test.deepEqual(tile.extent(), [[0, 0], [960, 500]]);
  test.deepEqual(tile.scale(), 256);
  test.deepEqual(tile.translate(), [480, 250]);
  test.deepEqual(tile.zoomDelta(), 0);
  test.deepEqual(tile.tileSize(), 256);
  test.deepEqual(tile.clampX(), true);
  test.deepEqual(tile.clampY(), true);
  test.deepEqual(tile(), Object.assign([
    [0,  0, 0]
  ], {
    translate: [1.375, 0.4765625],
    scale: 256
  }));
});

tape("tile.size(…) sets the viewport", test => {
  const tile = d3.tile().extent([[100, 200], [300, 500]]).size([200, 400]);
  test.deepEqual(tile.size(), [200, 400]);
  test.deepEqual(tile.extent(), [[0, 0], [200, 400]]);
});

tape("tile.size(…) coerces the input to numbers", test => {
  const tile = d3.tile().size([" 200 ", " 400 "]);
  test.strictEqual(tile.size()[0], 200);
  test.strictEqual(tile.size()[1], 400);
});

tape("tile.extent(…) sets the viewport", test => {
  const tile = d3.tile().size([200, 400]).extent([[100, 200], [300, 500]]);
  test.deepEqual(tile.size(), [200, 300]);
  test.deepEqual(tile.extent(), [[100, 200], [300, 500]]);
});

tape("tile.extent(…) coerces the input to numbers", test => {
  const tile = d3.tile().extent([[" 100 ", " 200 "], [" 300 ", " 500 "]]);
  test.strictEqual(tile.extent()[0][0], 100);
  test.strictEqual(tile.extent()[0][1], 200);
  test.strictEqual(tile.extent()[1][0], 300);
  test.strictEqual(tile.extent()[1][1], 500);
});

tape("tile.scale(…) sets the scale", test => {
  const tile = d3.tile().scale(1000);
  test.deepEqual(tile.scale(), 1000);
});

tape("tile.scale(…) coerces the input to numbers", test => {
  const tile = d3.tile().scale(" 200 ");
  test.strictEqual(tile.scale(), 200);
});

tape("tile.scale(…) can be less than the tile size", test => {
  const tile = d3.tile().scale(128);
  test.deepEqual(tile(), Object.assign([
    [0,  0, 0]
  ], {
    translate: [3.25, 1.453125],
    scale: 128
  }));
});

tape("tile.translate(…) sets the translate", test => {
  const tile = d3.tile().translate([100, 200]);
  test.deepEqual(tile.translate(), [100, 200]);
});

tape("tile.translate(…) coerces the input to numbers", test => {
  const tile = d3.tile().translate([" 200 ", " 400 "]);
  test.strictEqual(tile.translate()[0], 200);
  test.strictEqual(tile.translate()[1], 400);
});

tape("tile.zoomDelta(…) sets the zoom offset", test => {
  const tile = d3.tile().zoomDelta(1);
  test.deepEqual(tile.zoomDelta(), 1);
});

tape("tile.zoomDelta(…) coerces the input to numbers", test => {
  const tile = d3.tile().zoomDelta(" 2 ");
  test.strictEqual(tile.zoomDelta(), 2);
});

tape("tile.tileSize(…) sets the tile size", test => {
  const tile = d3.tile().tileSize(1000);
  test.deepEqual(tile.tileSize(), 1000);
});

tape("tile.tileSize(…) coerces the input to numbers", test => {
  const tile = d3.tile().tileSize(" 512 ");
  test.strictEqual(tile.tileSize(), 512);
});

tape("tile.clampX(…) sets the x-clampt", test => {
  const tile = d3.tile().clampX(false);
  test.deepEqual(tile.clampX(), false);
  test.deepEqual(tile(), Object.assign([
    [-2,  0, 0], [-1,  0, 0], [0,  0, 0], [+1,  0, 0], [+2,  0, 0],
  ], {
    translate: [1.375, 0.4765625],
    scale: 256
  }));
});

tape("tile.clampY(…) sets the y-clampt", test => {
  const tile = d3.tile().clampY(false);
  test.deepEqual(tile.clampY(), false);
  test.deepEqual(tile(), Object.assign([
    [0, -1, 0],
    [0,  0, 0],
    [0, +1, 0]
  ], {
    translate: [1.375, 0.4765625],
    scale: 256
  }));
});

tape("tile.clamp(…) disables both clamps", test => {
  const tile = d3.tile().clamp(false);
  test.deepEqual(tile.clampX(), false);
  test.deepEqual(tile.clampY(), false);
  test.deepEqual(tile(), Object.assign([
    [-2, -1, 0], [-1, -1, 0], [0, -1, 0], [+1, -1, 0], [+2, -1, 0],
    [-2,  0, 0], [-1,  0, 0], [0,  0, 0], [+1,  0, 0], [+2,  0, 0],
    [-2, +1, 0], [-1, +1, 0], [0, +1, 0], [+1, +1, 0], [+2, +1, 0]
  ], {
    translate: [1.375, 0.4765625],
    scale: 256
  }));
});
