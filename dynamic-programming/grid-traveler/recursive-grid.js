// Recursive method for grid traveler
// Time complexity: O(2 ^ (m + n))
// Space complexity: O(m + n)
function Grid(m, n) {
    if (m == 0 || n == 0) {
        return 0
    }

    if (m == 1 && n == 1) {
        return 1
    }

    //     MOVING DOWN    + MOVING RIGHT
    return Grid(m - 1, n) + Grid(m, n - 1)
}

// TODO: Find the possible paths

console.log(Grid(1,1))
console.log(Grid(2,3))
