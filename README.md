# 2d-maze-generator
This is a maze generator written in NodeJS for randomly and recursively creating 2D mazes.

## File structure:
- mazeGenerator.js - Main executable file 
- maze.js - File containing the actual maze generator and its components

## Run with:
> node mazeGenerator.js

Max maze size: 1950x1950 nodes

For larger mazes (ex 4000x4000), run with more RAM:
> node --max-old-space-size=8192 mazeGen.js

## Instructions:
O - marks beginning of maze
X - marks end of maze

## Execution times on dev machine:
// With 1,76 GB RAM limit in runtime:
// 1000 x 1000 => 5,7 seconds to generate maze
// 1250 x 1250 => 8,76 seconds to generate maze
// 1750 x 1750 => 18,3 seconds to generate maze
// 1950 x 1950 => 33,8 seconds to generate maze
// 1951 x 1951 => Out of Memory

// With 8 GB RAM limit in runtime:
// 2000 x 2000 => 23 seconds
// 4000 x 4000 => 3 minutes
