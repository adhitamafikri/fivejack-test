/**
 * @desc compare failure rates of each stages
 * @param {Object} a
 * @param {Object} b
 */
function failureRateComparator(a, b) {
  // descending order
  if (a[1].failureRate < b[1].failureRate) return 1;
  if (a[1].failureRate > b[1].failureRate) return -1;
  return 0;
}

/**
 * @desc Get the stage's stats. Number of Failures and Plays
 * @param {Number} stage
 * @param {Number[]} users
 * @param {Number} N  The number denoting the final stage
 * @return {Object}
 */
function getStageStats(stage, users, N) {
  let result = {
    hasFailed: 0,
    hasPlayed: 0,
    failureRate: 0,
  };

  users.forEach((currUserStage) => {
    if (currUserStage === stage || currUserStage === N) {
      result = {
        ...result,
        hasFailed: result.hasFailed + 1,
      };
    }
    if (currUserStage >= stage) {
      result = {
        ...result,
        hasPlayed: result.hasPlayed + 1,
      };
    }
  });

  // calculate failureRate
  result = {
    ...result,
    failureRate: result.hasFailed / result.hasPlayed || 0,
  };

  return result;
}

/**
 * @param {Number} N  total stages
 * @param {Number} users  contains numbers [1 ~ N + 1], each number reps the stage are currently in play, N + 1 = user who cleared the last astage
 */
function solution(N, users) {
  let stageStats = {};

  // Map each stage and its stats
  /* stats signature
  [stage] = {
    hasFailed: Number,
    hasPlayed: Number,
    failureRate: Float,
  } */
  users.forEach((currUserStage) => {
    if (currUserStage === N + 1) {
      stageStats = {
        ...stageStats,
        [currUserStage - 1]: getStageStats(currUserStage - 1, users, N),
      };
    } else {
      stageStats = {
        ...stageStats,
        [currUserStage]: getStageStats(currUserStage, users, N),
      };
    }
  });

  // NOTE: Uncomment this if you want to stage mapping
  // console.log("stages mapping\n", stageStats);

  // Adding the stages that nobody is currently playing
  for (let i = 1; i <= N; i++) {
    if (!stageStats[`${i}`]) {
      stageStats = {
        ...stageStats,
        [i]: { failureRate: 0 },
      };
    }
  }

  // NOTE: Uncomment this if you want to see the new mapping
  // console.log(
  //   "\nstages mapping with stages that nobody is currently playing on\n",
  //   stageStats
  // );

  const sortedEntries = Object.entries(stageStats).sort(failureRateComparator);
  const answer = sortedEntries.map((entry) => {
    return parseInt(entry[0], 10);
  });

  return answer;
}

console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]));
console.log(solution(4, [4, 4, 4, 4, 4]));
