var tape = require("tape-await"),
    d3 = require("../");

function tile(x, y, z, tx, ty) {
  return {
    x: x,
    y: y,
    z: z,
    tx: tx,
    ty: ty
  };
}

tape("tile", test => {
  var width = 960,
      height = 500,
      tileLayout = d3.tile()
        .size([width, height])
        .scale(4096)
        .translate([1617, 747]),
      tiles = tileLayout();

  test.deepEqual(tileLayout.size(), [width, height]);
  test.equal(tileLayout.scale(), 4096);
  test.deepEqual(tileLayout.translate(), [1617, 747]);

  test.equal(tiles.scale, 256);
  test.equal(tiles.translate[0], -1.68359375);
  test.equal(tiles.translate[1], -5.08203125);
  test.equal(tiles.length, 15);

  test.deepEqual(tiles[0],  tile(1, 5, 4, 1 * 256, 5 * 256));
  test.deepEqual(tiles[1],  tile(2, 5, 4, 2 * 256, 5 * 256));
  test.deepEqual(tiles[2],  tile(3, 5, 4, 3 * 256, 5 * 256));
  test.deepEqual(tiles[3],  tile(4, 5, 4, 4 * 256, 5 * 256));
  test.deepEqual(tiles[4],  tile(5, 5, 4, 5 * 256, 5 * 256));
  test.deepEqual(tiles[5],  tile(1, 6, 4, 1 * 256, 6 * 256));
  test.deepEqual(tiles[6],  tile(2, 6, 4, 2 * 256, 6 * 256));
  test.deepEqual(tiles[7],  tile(3, 6, 4, 3 * 256, 6 * 256));
  test.deepEqual(tiles[8],  tile(4, 6, 4, 4 * 256, 6 * 256));
  test.deepEqual(tiles[9],  tile(5, 6, 4, 5 * 256, 6 * 256));
  test.deepEqual(tiles[10], tile(1, 7, 4, 1 * 256, 7 * 256));
  test.deepEqual(tiles[11], tile(2, 7, 4, 2 * 256, 7 * 256));
  test.deepEqual(tiles[12], tile(3, 7, 4, 3 * 256, 7 * 256));
  test.deepEqual(tiles[13], tile(4, 7, 4, 4 * 256, 7 * 256));
  test.deepEqual(tiles[14], tile(5, 7, 4, 5 * 256, 7 * 256));
});

tape("size and extent", test => {
  var tileLayout = d3.tile();
  test.deepEqual(tileLayout.size(), [960, 500]);
  test.deepEqual(tileLayout.extent(), [[0, 0], [960, 500]]);

  tileLayout.size([200, 300]);
  test.deepEqual(tileLayout.size(), [200, 300]);
  test.deepEqual(tileLayout.extent(), [[0, 0], [200, 300]]);

  tileLayout.extent([[100, 200], [300, 350]]);
  test.deepEqual(tileLayout.size(), [200, 150]);
  test.deepEqual(tileLayout.extent(), [[100, 200], [300, 350]]);
});

tape("wrap", test => {
  var tileLayout = d3.tile()
        .scale(1 << 8)
        .translate([480, 250]),
      tiles = tileLayout();

  test.equal(tileLayout.wrap(), true);
  test.equal(tileLayout().length, 5);

  test.deepEqual(tiles[0], tile(0, 0, 0, -2 * 256, 0));
  test.deepEqual(tiles[1], tile(0, 0, 0, -1 * 256, 0));
  test.deepEqual(tiles[2], tile(0, 0, 0, 0 * 256, 0));
  test.deepEqual(tiles[3], tile(0, 0, 0, 1 * 256, 0));
  test.deepEqual(tiles[4], tile(0, 0, 0, 2 * 256, 0));

});

tape("tileSize", test => {
  var tileLayout256 = d3.tile()
        .scale(1 << 8)
        .translate([480, 250]),
      tiles256 = tileLayout256();

  test.equal(tileLayout256.tileSize(), 256);
  test.equal(tiles256.length, 5);

  test.deepEqual(tiles256[0], tile(0, 0, 0, -2 * 256, 0));
  test.deepEqual(tiles256[1], tile(0, 0, 0, -1 * 256, 0));
  test.deepEqual(tiles256[2], tile(0, 0, 0, 0 * 256, 0));
  test.deepEqual(tiles256[3], tile(0, 0, 0, 1 * 256, 0));
  test.deepEqual(tiles256[4], tile(0, 0, 0, 2 * 256, 0));

  var tileLayout512 = d3.tile()
        .tileSize(512)
        .scale(1 << 8)
        .translate([480, 250]),
      tiles512 = tileLayout512();

  test.equal(tileLayout512.tileSize(), 512);
  test.equal(tiles512.length, 3);

  test.deepEqual(tiles512[0], tile(0, 0, 0, -1 * 512, 0));
  test.deepEqual(tiles512[1], tile(0, 0, 0, 0 * 512, 0));
  test.deepEqual(tiles512[2], tile(0, 0, 0, 1 * 512, 0));
});
