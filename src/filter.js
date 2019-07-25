export function tileFilterNone() {
  return true;
}

export function tileFilterX(x, y, z) {
  const j = 1 << z;
  return 0 <= x && x < j;
}

export function tileFilterY(x, y, z) {
  const j = 1 << z;
  return 0 <= y && y < j;
}

export function tileFilterXY(x, y, z) {
  const j = 1 << z;
  return 0 <= x && x < j && 0 <= y && y < j;
}
