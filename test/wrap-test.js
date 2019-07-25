import tape from "tape-await";
import * as d3 from "../src/index.js";

tape("d3.tileWrap([x, y, z]) can wrap in x", test => {
  test.deepEqual(d3.tileWrap([-1, 0, 1]), [1, 0, 1]);
  test.deepEqual(d3.tileWrap([-1, 0, 2]), [3, 0, 2]);
});

tape("d3.tileWrap([x, y, z]) can wrap in y", test => {
  test.deepEqual(d3.tileWrap([1, -1, 1]), [1, 1, 1]);
  test.deepEqual(d3.tileWrap([1, -1, 2]), [1, 3, 2]);
});

tape("d3.tileWrap([x, y, z]) can wrap in x and y", test => {
  test.deepEqual(d3.tileWrap([-1, -1, 1]), [1, 1, 1]);
  test.deepEqual(d3.tileWrap([-1, -1, 2]), [3, 3, 2]);
});
