/**
 * @desc find the possible number of candidate keys for the given relation
 * @param {2DArray} relations
 * @return {Number}
 */
function solution(relations) {
  const rowLength = relations.length;
  const colLength = relations[0].length;
  let answer = 0;
  let possibleCandidates = {};

  // Map the possible candidate keys
  for (let i = 0; i < colLength; i++) {
    // denote each key by 'key-N`
    possibleCandidates = {
      ...possibleCandidates,
      [`key-${i}`]: [],
    };
  }

  // traverse and assign all the values in the array into the possible candidate keys
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      // check if the current value already exists in the `key-N` possible candidate key
      // push the value into it if it does not exists yet
      let currentValue = relations[i][j];
      if (possibleCandidates[`key-${j}`].indexOf(currentValue) === -1) {
        possibleCandidates[`key-${j}`].push(currentValue);
      }
    }
  }

  // debugs
  console.log("possible candidates\n", possibleCandidates);

  /**
   * Determine the possible tuples
   */
  let tuples = [];
  for (let i = 0; i < colLength; i++) {
    let currentCandidate = possibleCandidates[`key-${i}`];
    console.log("c1:", currentCandidate);
    // if the current candidate has length equals to rowLength, then it will be a candidate key
    if (currentCandidate.length === rowLength) {
      tuples.push(`["key-${i}"]`);
      // increment answer by 1
      answer += 1;
    }

    // if not, search for another candidate to be paired in a tuple
    else {
      // check if theres any more candidates
      if (i + 1 === colLength) break;

      for (let j = i + 1; j < colLength; j++) {
        let currentCandidate2 = possibleCandidates[`key-${j}`];
        console.log("c1 - c2", currentCandidate, currentCandidate2);
        // if the current candidate 2 has length equals to rowLength, then it will be a candidate key
        if (currentCandidate2.length === rowLength) {
          tuples.push(`["key-${j}"]`);
          // increment answer by 1
          answer += 1;
          
          if (j === colLength - 1) i = colLength

          console.log("tuples: ", tuples);
        }

        // if not, combine them with the current candidate 1
        else {
          tuples.push(`["key-${i}", "key-${j}"]`);
          // increment answer by 1
          answer += 1;
          // set the main loop index (i) to the (j)
          i = j;

          break;
        }
      }
    }

    console.log("tuples: ", tuples);
  }
  // console.log("tuples\n", tuples);

  return answer;
}

// expected 2 tuples [key-0, [key-1, key-2]]
// console.log(
//   solution([
//     ["100", "ryan", "music", "2"],
//     ["200", "apeach", "math", "2"],
//     ["300", "tube", "computer", "3"],
//     ["400", "con", "computer", "4"],
//     ["500", "muzi", "music", "3"],
//     ["600", "apeach", "music", "2"],
//   ])
// );

// expected 4 tuples [key-0, [key-1, key-2], [key-3], [key-5]]
// console.log(
//   solution([
//     ["100", "ryan", "music", "migos", "2", "potion"],
//     ["200", "apeach", "math", "einstein", "2", "magic"],
//     ["300", "tube", "computer", "torvald", "3", "teleport"],
//     ["400", "con", "computer", "lingo", "4", "flash"],
//     ["500", "muzi", "music", "beethoven", "3", "shriek"],
//     ["600", "apeach", "music", "roddyrich", "2", "corkscrew"],
//   ])
// );

// expected 5 tuples [key-0, [key-1, key-2], [key-3], [key-5], [key-6]]
// console.log(
//   solution([
//     ["100", "ryan", "music", "migos", "2", "potion", "x0"],
//     ["200", "apeach", "math", "einstein", "2", "magic", "x1"],
//     ["300", "tube", "computer", "torvald", "3", "teleport", "x2"],
//     ["400", "con", "computer", "kurowski", "4", "flash", "x3"],
//     ["500", "muzi", "music", "beethoven", "3", "shriek", "x4"],
//     ["600", "apeach", "music", "roddyrich", "2", "corkscrew", "x5"],
//   ])
// );

// expected 7 tuples [key-0, [key-1, key-2], [key-3], [key-4, key-7], [key-5], [key-6], [key-8]]
console.log(
  solution([
    ["100", "ryan", "music", "migos", "2", "potion", "x0", "red", "burger"],
    ["200", "apeach", "math", "einstein", "2", "magic", "x1", "yellow", "egg"],
    ["300", "tube", "computer", "torvald", "3", "teleport", "x2", "red", "peach"],
    ["400", "con", "computer", "kurowski", "4", "flash", "x3", "green", "milk"],
    ["500", "muzi", "music", "beethoven", "3", "shriek", "x4", "purple", "choco"],
    ["600", "apeach", "music", "roddyrich", "2", "corkscrew", "x5", "yellow", "cheeto"],
  ])
);
