const Maze = require('./maze.js');

// Size of maze
const xNodes = 14;
const yNodes = 10;

// Create field
const maze = new Maze(xNodes, yNodes);
// Generate maze
maze.generate();
// Print Maze
maze.print();
