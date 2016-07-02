var tape = require("tape"),
    d3 = require("../");

function tile(x, y, z, tx, ty) {
  var d = [x, y, z];
  d.tx = tx;
  d.ty = ty;
  return d;
}

tape("tile", function(test) {
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

  test.end();
});

tape("size uses default values", function(test) {
  var size = d3.tile().size();
  test.equal(size[0], 960);
  test.equal(size[1], 500);
  test.end();
});

tape("wrap", function(test) {
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

  test.end();
});
