class Maze {
    // Constructor, creates a maze of a given size.
    constructor(xNodes, yNodes) {
        const x_size = xNodes*2+1;
        const y_size = yNodes*2+1;

        // Create the field, a wall if coordinates are odd, a node if even.
        this.mazeMap = [];
        for ( let i=0; i < y_size; i++) {
            this.mazeMap[i] = [];
            for ( let j=0; j < x_size; j++) {
                // if i*j is odd there should be a wall (for display purposes)
                this.mazeMap[i][j] = i*j%2 ? new Node(i, j) : new Wall();
            }
        }

        // Create exploration stack with upper left node as beginning. Mark node as explored.
        this.explorationStack = [];
        const initialNode = this.mazeMap[1][1];
        initialNode.isUnexplored = false;
        this.explorationStack.push(initialNode);

        // Mark beginning and end visually, X marks the spot
        this.mazeMap[1][1].character = '0';
        this.mazeMap[y_size-2][x_size-2].character = 'X';
    }

    // Function to print the current maze representation.
    print() {
        this.mazeMap.forEach(row => {
            // Functionally reduce row of node arrays to a string for printout. Separate with space for 
            // better proportions
            const rowString = row.reduce((prev, cur) => `${prev} ${cur.character}`, '')
            console.log(rowString);
        });
    }

    // Function to actually generate the maze from the initial node map.
    generate() {
        // The exploration stack was created with upper left node already in it. 
        // While the stack has anything left to explore, explore top node
        while (this.explorationStack.length > 0) {
            const nextNode = this.explorationStack[this.explorationStack.length - 1];

            // If the next node has anything left to explore, then do that
            // otherwise cut topmost node and move forward to next.
            if (nextNode.hasDirectionsToExplore()) {
                this.explore(nextNode)
            } else {
                this.explorationStack.pop()
            }
        }
    }

    // "Explores" the paths of a node
    explore(currentNode) {
        // Get a new random direction for the current node
        let direction = currentNode.pickDirection()
        // Get node for that direction, null if there is none
        let nextNode = this.getNodeForDirection(currentNode, direction)

        // If next node is not yet explored, "connect" and push it to exploration "stack"
        if (nextNode !== null && nextNode.isUnexplored) {
            // Connect node visually by removing wall
            this.connect(currentNode, direction)
            // Set node as explored
            nextNode.isUnexplored = false;
            // Push node to exploration stack, return here eventually and look at other directions
            this.explorationStack.push(nextNode)
        }
    }

    // Simply returns the node in a given direction "n", "e", "s", "w"
    getNodeForDirection(connectingNode, direction) {
        let x = connectingNode.x;
        let y = connectingNode.y;

        // Step two steps in maze map, to avoid the wall
        switch (direction) {
            case 'n':
                y = y+2;
                break;
            case 'e':
                x = x+2;
                break;
            case 's':
                y = y-2;
                break;
            case 'w':
                x = x-2;
                break;
        }

        if (this.mazeMap[x] && this.mazeMap[x][y]) {
            return this.mazeMap[x][y];
        }

        // If no node was found, return null to avoid this direction (outside a wall for example)
        return null;
    }

    // Connect two nodes visually, by removing # charecter for wall
    connect(connectingNode, direction) {
        let x = connectingNode.x;
        let y = connectingNode.y;

        // Step one step in the maze map to get the wall
        switch (direction) {
            case 'n':
                y++;
                break;
            case 'e':
                x++;
                break;
            case 's':
                y--;
                break;
            case 'w':
                x--;
                break;
        }

        this.mazeMap[x][y].character = ' ';
    }
}

// A maze node with some basic properties and  convenience functions (for better looking code)
// Mainly it contains coordinates, unexplored directions and a flag saying if it has been explored
class Node {
    constructor(x, y) {
        // What to print for the node
        this.character = ' ';
        // To see if node is explored already
        this.isUnexplored = true;
        // Coordinates in mazeMap
        this.x = x;
        this.y = y;

        // randomise directions at creation, to save execution time
        let directions = new Set(['n','e','s','w']);
        this.randomisedDirections = [];
        while (Array.from(directions.values()).length > 0) {
            const items = Array.from(directions.values());
            const direction = items[Math.floor(Math.random()*items.length)];
            this.randomisedDirections.push(direction)
            directions.delete(direction)
        }
    }

    // Convenience functions
    hasDirectionsToExplore() {
        return this.randomisedDirections.length > 0
    }

    isEqualTo(otherNode) {
        // In this closed environment I see it as sufficient to check coordinates
        if (this.x === otherNode.x && this.y === otherNode.y) {
            return true
        }
        return false
    }

    pickDirection() {
        return this.randomisedDirections.pop();
    }
}

// Simply a holder of a character. # initially, but will be ' ' if a connection is established between nodes.
class Wall {
    constructor () {
        this.character = '#';
    }
}

// Make Maze available outside of this module
module.exports = Maze;
