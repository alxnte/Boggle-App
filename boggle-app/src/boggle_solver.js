function findAllSolutions(grid, dictionary) {
  let solutions = [];
  if(grid == null || dictionary == null) return solutions;
  let N = grid.length;
  for(let i = 0; i < N; i++) {
    if(grid[i].length != N) { //|| grid[i] == []) {
      return solutions;
    }
  }
  convertCaseToLower(grid, dictionary);
  let trie = createHashMap(dictionary);
  let solutionSet = new Set();
  for(let y = 0; y < N; y++) {
    for(let x = 0; x < N; x++) {
      let word = "";
      let visited = new Array(N).fill(false).map(() => new Array(N).fill(false));
      findWords(word, y, x, grid, visited, trie, solutionSet);
    }
  }
  solutions = Array.from(solutionSet);
  return solutions;
}


function convertCaseToLower(grid, dict) {
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }
  for(let i = 0; i < dict.length; i++) {
    dict[i] = dict[i].toLowerCase();
  }
}


function findWords(word, y, x, grid, visited, trie, solutionSet) {
  let adjMatrix = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1]
  ];
  if(y < 0 || x < 0 || y >= grid.length || x >= grid.length || visited[y][x] == true) return;
  word += grid[y][x];
  if(isPrefix(word, trie)) {
    visited[y][x] = true;
    if(isWord(word, trie)) {
      if(word.length >= 3) solutionSet.add(word);
    }
    for(let i = 0; i < 8; i++) {
      findWords(word, y + adjMatrix[i][0], x + adjMatrix[i][1], grid, visited, trie, solutionSet);
    }
  }
  visited[y][x] = false;
}
function isPrefix(word, trie) {
  return trie[word] != undefined;
}


function isWord(word, trie) {
  return trie[word] == 1;
}


function createHashMap(dictionary) {
  var dict = {};
  for(let i = 0; i < dictionary.length; i++) {
    dict[dictionary[i]] = 1;
    let wordlength = dictionary[i].length;
    var str = dictionary[i];
    for(let j = wordlength; wordlength > 1; wordlength--) {
      str = str.substr(0, wordlength - 1);
      if(str in dict) {
        if(str == 1) {
          dict[str] = 1;
        }
      } else {
        dict[str] = 0;
      }
    }
  }
  return dict;
}

const grid = [
  ['T', 'W', 'Y', 'R'],
  ['E', 'N', 'P', 'H'],
  ['G', 'Z', 'Qu', 'R'],
  ['O', 'N', 'T', 'A']
];

const dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat', 'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp', 'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];
console.log(findAllSolutions(grid, dictionary));
export default findAllSolutions;