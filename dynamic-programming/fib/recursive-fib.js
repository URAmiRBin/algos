// Recursive method
// Does not memorize and repeat for already seen sub-problems
// Calls itself 2 ^ n times
// Time : O(n ^ 2)
// Space : O(n)
function Fib(n) {
    if (n == 1 || n == 0) {
        return 1
    }
    return Fib(n - 1) + Fib(n - 2)
}

console.log(Fib(50))