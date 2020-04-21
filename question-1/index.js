/**
 * @desc The main function
 * @param {Object[]} record format
 * @return {Object[]}
 */
function solution(record) {
  let users = {};
  let answer = [];

  /**
   * Adjust user nickname and their userid
   * get the objects to compose the message
   */
  const messageObjs = record.map((rec) => {
    let splitted = rec.split(" ");
    let obj = {
      activity: splitted[0],
      userId: splitted[1],
    };
    if (splitted[2]) Object.assign(obj, { nickname: splitted[2] });

    // Cannot change nickname when the activity is 'Leave'
    if (!obj.activity.match(/Leave/gi)) {
      users = {
        ...users,
        [obj.userId]: obj.nickname,
      };
    }

    return obj;
  });

  // Compose the answer
  messageObjs.forEach((obj) => {
    if (obj.activity.match(/Enter/gi))
      answer.push(`${users[obj.userId]} came in`);
    if (obj.activity.match(/Leave/gi))
      answer.push(`${users[obj.userId]} has left`);
  });

  return answer;
}

console.log(
  solution([
    "Enter uid1234 Muzi",
    "Enter uid4567 Prodo",
    "Leave uid1234",
    "Enter uid1234 Prodo",
    "Change uid4567 Ryan",
  ])
);
