class Graph {
    constructor(noOfVertecies) {
        this.noOfVertecies = noOfVertecies;
        this.adjList = new Map();
    }

    addVertex(v) {
        this.adjList.set(v, []);
    }

    addEdge(v, e) {
        this.adjList.get(v).push(e);
    }

    print() {
        var vertecies = this.adjList.keys();

        for (var i of vertecies) {
            var neighbors = this.adjList.get(i);
            var conc = "";

            for (var j of neighbors) {
                conc += j + " ";
            }

            console.log(i + " -> " + conc);
        }
    }

    getSimplePaths() {
        var simplePaths = [];
        var vertecies = this.adjList.keys();
        for (var i of vertecies) {
            simplePaths.push(new Path(i));
        }

        var oldPaths = simplePaths;
        while (oldPaths.length != 0) {
            oldPaths = this.getExtendedPaths(oldPaths);
            simplePaths = simplePaths.concat(oldPaths);
        }
        
        return simplePaths;
    }

    getExtendedPaths(paths) {
        var newPaths = [];
        for (var path of paths) {
            var tail = path.getTail();
            var neighbors = this.adjList.get(tail);
            for (var j of neighbors) {
                var p = new Path(path.p + j);
                if (!p.hasInnerLoop())
                    newPaths.push(p);
            }
        }
        return newPaths;
    }

    getFinishPaths() {
        var finishNode = Array.from(this.adjList.keys()).pop();
        var finishPaths = [];
        var finished = []
        var simplePaths = this.getSimplePaths();
        for (var simplePath of simplePaths) {
            if (simplePath.getHead() == finishNode) continue;
            if (simplePath.getTail() == finishNode && !finished.includes(simplePath.getHead())) {
                finished.push(simplePath.getHead());
                finishPaths.push(simplePath);
            }
        }
        return finishPaths;
    }

    getPrimePaths() {
        var primePaths = []
        var simplePaths = this.getSimplePaths();
        for (var path of simplePaths) {
            var isPrime = false;
            for (var bpath of simplePaths) {
                if (bpath == path) continue;
                if (!path.isSubpathOf(bpath)) isPrime = true;
                else {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) primePaths.push(path);
        }

        return primePaths;
    }
}

class Path {
    constructor(p) {
        this.p = p;
        this.length = p.length;
    }

    getHead() {
        return this.p[0];
    }

    getTail() {
        return this.p[this.length - 1];
    }

    addNode(node) {
        this.p = this.p + node;
        this.length += node.length;
    }

    hasInnerLoop() {
        var noTailPart = this.p.slice(0, this.length - 1);
        var noHeadPart = this.p.slice(1, this.length);
        if (/(.).*\1/.test(noTailPart) || /(.).*\1/.test(noHeadPart)) return true;
        else return false;
    }

    isSelfLoop() {
        return this.getTail() == this.getHead();
    }

    isSubpathOf(bpath) {
        return bpath.p.includes(this.p);
    }
}

function getTestPaths(start, end, primePaths, finishPaths) {
    testPaths = [];
    for (var primePath of primePaths) {
        if (primePath.getHead() == start && primePath.getTail() == end) testPaths.push(primePath);
        else if (!primePath.isSelfLoop()) {
            for (var path of finishPaths) {
                if (path.getHead() == primePath.getTail()) {
                    testPaths.push(new Path(primePath.p + path.p.slice(1, path.length)));
                    break;
                }
            }
        }
    }

    for (var primePath of primePaths) {
        if (primePath.isSelfLoop()) {
            var path = testPaths.find(e => e.p.includes(primePath.getHead()));
            if (path == undefined) break;
            var p = new Path(path.p.replace(primePath.getHead(), primePath.p));
            if (testPaths.includes(p)) break;
            testPaths.push(p);
        }
    }

    return testPaths;
}

var g = new Graph(5);
g.addVertex('1');
g.addVertex('2');
g.addVertex('3');
g.addVertex('4');
g.addVertex('5');
g.addEdge('1', '2');
g.addEdge('1', '3');
g.addEdge('2', '4');
g.addEdge('3', '4');
g.addEdge('4', '2');
g.addEdge('4', '5');
var primes = g.getPrimePaths();
var finishes = g.getFinishPaths();
var tests = getTestPaths('1', '5', primes, finishes);
testSet = new Set();
for (test of tests) {
    testSet.add(test.p);
}
console.log(testSet);