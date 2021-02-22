// Grid(m, n) has the same answer as Grid(n, m)
// Time complexity O(m * n)
// Space complexity O(m + n)
function MemGrid(m, n) {
    const key = m + ',' + n
    const altKey = n + ',' + m

    if (key in memo) return memo[key]
    if (altKey in memo) return memo[altKey]

    if (m == 0 || n == 0) return 0
    if (m == 1 && n == 1) return 1
    

    memo[key] = MemGrid(m - 1, n) + MemGrid(m, n - 1)
    return memo[key]
}

var memo = {}

console.log(MemGrid(4, 4))