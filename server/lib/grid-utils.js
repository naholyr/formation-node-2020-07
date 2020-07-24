const HORIZONTAL = 1;
const VERTICAL = 2;
const DIAGONAL_DESC = 3;
const DIAGONAL_ASC = 4;

/**
 * @typedef {string[]} Grid
 * @typedef {1|2|3|4} Direction
 */

/**
 *
 * @param {Grid} grid
 * @param {number} size grid's size
 * @param {number} nbAlign number of aligned
 */
const checkAlign = (grid, size, nbAlign) =>
  /**
   * @param {number} startI
   * @param {number} startJ
   * @param {Direction} direction
   * @returns boolean | string
   */
  (startI, startJ, direction) => {
    const startIndex = startI * size + startJ;
    const value = grid[startIndex];
    if (!value) return false;
    switch (direction) {
      case HORIZONTAL:
        for (let j = 1; j < nbAlign; j++) {
          if (grid[startI * size + (startJ + j)] !== value) return false;
        }
        return value;
      case VERTICAL:
        for (let i = 1; i < nbAlign; i++) {
          if (grid[(startI + i) * size + startJ] !== value) return false;
        }
        return value;
      case DIAGONAL_DESC:
        for (let x = 1; x < nbAlign; x++) {
          if (grid[(startI + x) * size + (startJ + x)] !== value) return false;
        }
        return value;
      case DIAGONAL_ASC:
        for (let x = 1; x < nbAlign; x++) {
          if (grid[(startI - x) * size + (startJ + x)] !== value) return false;
        }
        return value;
      default:
        return false;
    }
  };

/**
 * Check if the grid is ended (victory or null)
 * @param {Grid} grid List of cells
 * @param {number} nbAlign Number of aligned cells you need to win
 * @returns {[boolean, string?]}
 */
const checkGrid = (grid, nbAlign) => {
  const size = Math.sqrt(grid.length);
  const nbTest = Math.max(0, size - nbAlign + 1);
  const _checkAlign = checkAlign(grid, size, nbAlign);
  // as X = size - 1, to align X you need to have a cell at row 1 or 2
  // Test top-left square for diagonals
  for (let i = 0; i < nbTest; i++) {
    for (let j = 0; j < nbTest; j++) {
      const winnerD = _checkAlign(i, j, DIAGONAL_DESC);
      if (winnerD) return [true, winnerD];
    }
  }
  // Test bottom-left square for diagonals
  for (let i = 0; i < nbTest; i++) {
    for (let j = 0; j < nbTest; j++) {
      const winnerD = _checkAlign(size - i - 1, j, DIAGONAL_ASC);
      if (winnerD) return [true, winnerD];
    }
  }
  // Test top rows for verticals
  for (let i = 0; i < nbTest; i++) {
    for (let j = 0; j < size; j++) {
      const winnerV = _checkAlign(i, j, VERTICAL);
      if (winnerV) return [true, winnerV];
    }
  }
  // Test left columns for horizontals
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < nbTest; j++) {
      const winnerH = _checkAlign(i, j, HORIZONTAL);
      if (winnerH) return [true, winnerH];
    }
  }
  // Is the grid full?
  const full = grid.every((c) => !!c);
  return [full, null];
};

module.exports = {
  checkGrid,
};
