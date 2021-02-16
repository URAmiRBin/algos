// Dynamic Programming Memoization method
// Stores answers
// Linear complexity O(n)
// Space complexity O(n)
var f = []
f[0] = 1
f[1] = 1

function MemFib(n) {
    if (f[n] != undefined) {
        return f[n]
    }
    f[n] = MemFib(n - 1) + MemFib(n - 2)
    return f[n]
}

console.log(MemFib(49))