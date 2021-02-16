// Dynamic Programming method
// Does not recalculate seen sub-problems
// Linear complexity
// Starts from 0 to reach n
function BottomUpFib(n) {
    let f = []
    
    f[0] = 1
    f[1] = 1
    
    for(let i = 2; i <= n; i++) {
        f[i] = f[i - 1] + f[i - 2]
    }

    return f[n]
}

console.log(BottomUpFib(49))