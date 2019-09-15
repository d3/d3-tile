import tape from "tape-await";
import * as d3 from "../src/index.js";

tape("d3.tile() has the expected defaults", test => {
  const tile = d3.tile();
  test.deepEqual(tile.size(), [960, 500]);
  test.deepEqual(tile.extent(), [[0, 0], [960, 500]]);
  test.deepEqual(tile.scale()({k: 256}), 256);
  test.deepEqual(tile.translate()({x: 480, y: 250}), [480, 250]);
  test.deepEqual(tile.zoomDelta(), 0);
  test.deepEqual(tile.tileSize(), 256);
  test.deepEqual(tile.clampX(), true);
  test.deepEqual(tile.clampY(), true);
  test.deepEqual(tile({k: 256, x: 480, y: 250}), Object.assign([
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
  test.strictEqual(tile.size([256, 256]), tile);
  test.deepEqual(tile.size(), [256, 256]);
});

tape("tile(…) observes the size", test => {
  test.deepEqual(d3.tile().size([256, 256])({k: 256, x: 128, y: 128}), Object.assign([[0, 0, 0]], {translate: [0, 0], scale: 256}));
  test.deepEqual(d3.tile().size([256, 256])({k: 512, x: 128, y: 128}), Object.assign([[0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]], {translate: [-0.5, -0.5], scale: 256}));
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

tape("tile(…) observes the extent", test => {
  test.deepEqual(d3.tile().extent([[256, 256], [512, 512]])({k: 512, x: 256, y: 256}), Object.assign([[1, 1, 1]], {translate: [0, 0], scale: 256}));
  test.deepEqual(d3.tile().extent([[0, 256], [256, 512]])({k: 512, x: 256, y: 256}), Object.assign([[0, 1, 1]], {translate: [0, 0], scale: 256}));
});

tape("tile.extent(…) coerces the input to numbers", test => {
  const tile = d3.tile().extent([[" 100 ", " 200 "], [" 300 ", " 500 "]]);
  test.strictEqual(tile.extent()[0][0], 100);
  test.strictEqual(tile.extent()[0][1], 200);
  test.strictEqual(tile.extent()[1][0], 300);
  test.strictEqual(tile.extent()[1][1], 500);
});

tape("tile.scale(…) sets the scale function", test => {
  test.deepEqual(d3.tile().scale(42).scale()(), 42);
  test.deepEqual(d3.tile().scale(t => t.scale).scale()({scale: 42}), 42);
});

tape("tile(…) observes the scale", test => {
  test.deepEqual(d3.tile().scale(512).translate([256, 256]).size([512, 512])(), Object.assign([[0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]], {translate: [0, 0], scale: 256}));
  test.deepEqual(d3.tile().scale(256).translate([256, 256]).size([512, 512])(), Object.assign([[0, 0, 0]], {translate: [0.5, 0.5], scale: 256}));
});

tape("tile.scale(…) coerces the input to numbers", test => {
  test.deepEqual(d3.tile().scale(" 512 ").translate([256, 256]).size([512, 512])(), Object.assign([[0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]], {translate: [0, 0], scale: 256}));
});

tape("tile.scale(…) can be less than the tile size", test => {
  const tile = d3.tile();
  test.deepEqual(tile({k: 128, x: 480, y: 250}), Object.assign([
    [0,  0, 0]
  ], {
    translate: [3.25, 1.453125],
    scale: 128
  }));
});

tape("tile.translate(…) sets the translate function", test => {
  test.deepEqual(d3.tile().translate([100, 200]).translate()(), [100, 200]);
  test.deepEqual(d3.tile().translate(t => t.translate).translate()({translate: [100, 200]}), [100, 200]);
});

tape("tile(…) observes the translate", test => {
  test.deepEqual(d3.tile().size([512, 512])({k: 512, x: 256, y: 256}), Object.assign([[0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]], {translate: [0, 0], scale: 256}));
  test.deepEqual(d3.tile().size([512, 512])({k: 512, x: 0, y: 0}), Object.assign([[1, 1, 1]], {translate: [-1, -1], scale: 256}));
});

tape("tile.translate(…) coerces the input to numbers", test => {
  test.deepEqual(d3.tile().size([512, 512])({k: 512, x: " 256 ", y: " 256 "}), Object.assign([[0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]], {translate: [0, 0], scale: 256}));
});

tape("tile.zoomDelta(…) sets the zoom offset", test => {
  const tile = d3.tile().zoomDelta(1);
  test.deepEqual(tile.zoomDelta(), 1);
});

tape("tile.zoomDelta(…) coerces the input to numbers", test => {
  const tile = d3.tile().zoomDelta(" 2 ");
  test.strictEqual(tile.zoomDelta(), 2);
});

tape("tile(…) observes the zoom delta", test => {
  test.deepEqual(d3.tile().scale(512).translate([256, 256]).size([256, 256]).zoomDelta(-1)(), Object.assign([[0, 0, 0]], {translate: [0, 0], scale: 512}));
  test.deepEqual(d3.tile().scale(512).translate([256, 256]).size([256, 256]).zoomDelta(1)(), Object.assign([[0, 0, 2], [1, 0, 2], [0, 1, 2], [1, 1, 2]], {translate: [0, 0], scale: 128}));
});

tape("tile.tileSize(…) sets the tile size", test => {
  const tile = d3.tile().tileSize(1000);
  test.deepEqual(tile.tileSize(), 1000);
});

tape("tile.tileSize(…) coerces the input to numbers", test => {
  const tile = d3.tile().tileSize(" 512 ");
  test.strictEqual(tile.tileSize(), 512);
});

tape("tile(…) observes the tile size", test => {
  test.deepEqual(d3.tile().scale(512).translate([256, 256]).size([256, 256]).tileSize(512)(), Object.assign([[0, 0, 0]], {translate: [0, 0], scale: 512}));
  test.deepEqual(d3.tile().scale(512).translate([256, 256]).size([256, 256]).tileSize(128)(), Object.assign([[0, 0, 2], [1, 0, 2], [0, 1, 2], [1, 1, 2]], {translate: [0, 0], scale: 128}));
});

tape("tile.clampX(…) sets the x-clampt", test => {
  const tile = d3.tile().clampX(false);
  test.deepEqual(tile.clampX(), false);
  test.deepEqual(tile({k: 256, x: 480, y: 250}), Object.assign([
    [-2,  0, 0], [-1,  0, 0], [0,  0, 0], [+1,  0, 0], [+2,  0, 0],
  ], {
    translate: [1.375, 0.4765625],
    scale: 256
  }));
});

tape("tile(…) observes the x-clamp", test => {
  test.deepEqual(d3.tile().scale(256).translate([0, 0]).size([256, 256]).clampX(false)(), Object.assign([[0, 0, 0], [1, 0, 0]], {translate: [-0.5, -0.5], scale: 256}));
});

tape("tile.clampY(…) sets the y-clampt", test => {
  const tile = d3.tile().clampY(false);
  test.deepEqual(tile.clampY(), false);
  test.deepEqual(tile({k: 256, x: 480, y: 250}), Object.assign([
    [0, -1, 0],
    [0,  0, 0],
    [0, +1, 0]
  ], {
    translate: [1.375, 0.4765625],
    scale: 256
  }));
});

tape("tile(…) observes the y-clamp", test => {
  test.deepEqual(d3.tile().scale(256).translate([0, 0]).size([256, 256]).clampY(false)(), Object.assign([[0, 0, 0], [0, 1, 0]], {translate: [-0.5, -0.5], scale: 256}));
});

tape("tile.clamp(…) disables both clamps", test => {
  const tile = d3.tile().clamp(false);
  test.deepEqual(tile.clampX(), false);
  test.deepEqual(tile.clampY(), false);
  test.deepEqual(tile({k: 256, x: 480, y: 250}), Object.assign([
    [-2, -1, 0], [-1, -1, 0], [0, -1, 0], [+1, -1, 0], [+2, -1, 0],
    [-2,  0, 0], [-1,  0, 0], [0,  0, 0], [+1,  0, 0], [+2,  0, 0],
    [-2, +1, 0], [-1, +1, 0], [0, +1, 0], [+1, +1, 0], [+2, +1, 0]
  ], {
    translate: [1.375, 0.4765625],
    scale: 256
  }));
});

tape("tile(…) observes the clamp", test => {
  test.deepEqual(d3.tile().scale(256).translate([0, 0]).size([256, 256]).clamp(false)(), Object.assign([[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]], {translate: [-0.5, -0.5], scale: 256}));
});

tape("tile(…) observes the maxNativeZoom", test => {
  test.deepEqual(d3.tile().scale(512).translate([256, 256]).size([512, 512]).maxNativeZoom(0)(), Object.assign([[0, 0, 0]], {translate: [0, 0], scale: 512}));
});