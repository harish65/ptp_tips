function calcLead(forming) {
  let total = 0;
  let i = 0;

  let pirsett = Number(forming.PIRSETT);
  let pir800 = Number(forming.PIR800);
  let pir400 = Number(forming.PIR400);

  if (pirsett === 0) i++;
  if (pirsett === 1) total += 3;
  if (pirsett === 2) total += 2;
  if (pirsett >= 3) total += 1;

  if (pir800 === 0) i++;
  if (pir800 === 1) total += 3;
  if (pir800 === 2) total += 2;
  if (pir800 >= 3) total += 1;

  if (pir400 === 0) i++;
  if (pir400 === 1) total += 3;
  if (pir400 === 2) total += 2;
  if (pir400 >= 3) total += 1;

  if (i === 1) total = (total / 2) * 3;
  if (i === 2) total = total * 3;

  return total;
}

function calcLeadHandy(forming) {
  let total = 0;
  let i = 0;

  let pirsett = Number(forming.PIRSETT);
  let pir800 = Number(forming.PIR800);
  let pir400 = Number(forming.PIR400);

  if (pirsett === 0) i++;
  if (pirsett === 1) total += 3;
  if (pirsett === 2) total += 3;
  if (pirsett === 3) total += 2;
  if (pirsett >= 4) total += 1;

  if (pir800 === 0) i++;
  if (pir800 === 1) total += 3;
  if (pir800 === 2) total += 3;
  if (pir800 === 3) total += 2;
  if (pir800 >= 4) total += 1;

  if (pir400 === 0) i++;
  if (pir400 === 1) total += 3;
  if (pir400 === 2) total += 3;
  if (pir400 === 3) total += 2;
  if (pir400 >= 4) total += 1;

  if (i === 1) total = (total / 2) * 3;
  if (i === 2) total = total * 3;

  return total;
}

function calcHandy(forming) {
  let total = 0;
  let i = 0;

  let pirsett = Number(forming.PIRSETT);
  let pir800 = Number(forming.PIR800);
  let pir400 = Number(forming.PIR400);

  if (pirsett === 0) i++;
  if (pirsett === 2) total += 3;
  if (pirsett === 3) total += 3;
  if (pirsett === 4) total += 2;
  if (pirsett >= 5) total += 1;

  if (pir800 === 0) i++;
  if (pir800 === 2) total += 3;
  if (pir800 === 3) total += 3;
  if (pir800 === 4) total += 2;
  if (pir800 >= 5) total += 1;

  if (pir400 === 0) i++;
  if (pir400 === 2) total += 3;
  if (pir400 === 3) total += 3;
  if (pir400 === 4) total += 2;
  if (pir400 >= 5) total += 1;

  if (i === 1) total = (total / 2) * 3;
  if (i === 2) total = total * 3;

  return total;
}

function calcHandyMid(forming) {
  let total = 0;
  let i = 0;

  let pirsett = Number(forming.PIRSETT);
  let pir800 = Number(forming.PIR800);
  let pir400 = Number(forming.PIR400);

  if (pirsett === 0) i++;
  if (pirsett === 3) total += 3;
  if (pirsett === 4) total += 3;
  if (pirsett === 5) total += 2;
  if (pirsett >= 6) total += 1;

  if (pir800 === 0) i++;
  if (pir800 === 3) total += 3;
  if (pir800 === 4) total += 3;
  if (pir800 === 5) total += 2;
  if (pir800 >= 6) total += 1;

  if (pir400 === 0) i++;
  if (pir400 === 3) total += 3;
  if (pir400 === 4) total += 3;
  if (pir400 === 5) total += 2;
  if (pir400 >= 6) total += 1;

  if (i === 1) total = (total / 2) * 3;
  if (i === 2) total = total * 3;

  return total;
}

function calcMid(forming) {
  let total = 0;
  let i = 0;

  let pirsett = Number(forming.PIRSETT);
  let pir800 = Number(forming.PIR800);
  let pir400 = Number(forming.PIR400);

  if (pirsett === 0) i++;
  if (pirsett === 3) total += 3;
  if (pirsett === 4) total += 3;
  if (pirsett === 5) total += 3;
  if (pirsett === 6) total += 2;
  if (pirsett >= 7) total += 1;

  if (pir800 === 0) i++;
  if (pir800 === 3) total += 3;
  if (pir800 === 4) total += 3;
  if (pir800 === 5) total += 3;
  if (pir800 === 6) total += 2;
  if (pir800 >= 7) total += 1;

  if (pir400 === 0) i++;
  if (pir400 === 3) total += 3;
  if (pir400 === 4) total += 3;
  if (pir400 === 5) total += 3;
  if (pir400 === 6) total += 2;
  if (pir400 >= 7) total += 1;

  if (i === 1) total = (total / 2) * 3;
  if (i === 2) total = total * 3;

  return total;
}

function calcRear(forming) {
  let total = 0;
  let i = 0;

  let pirsett = Number(forming.PIRSETT);
  let pir800 = Number(forming.PIR800);
  let pir400 = Number(forming.PIR400);

  if (pirsett === 0) i++;
  if (pirsett === 1) total += 3;
  if (pirsett === 2) total += 2;
  if (pirsett >= 3) total += 1;

  if (pir800 === 0) i++;
  if (pir800 === 1) total += 3;
  if (pir800 === 2) total += 2;
  if (pir800 >= 3) total += 1;

  if (pir400 === 0) i++;
  if (pir400 === 1) total += 3;
  if (pir400 === 2) total += 2;
  if (pir400 >= 3) total += 1;

  if (i === 1) total = (total / 2) * 3;
  if (i === 2) total = total * 3;

  return total;
}

function assignPace(item) {
  let value = 0;
  switch (item.pace) {
    case "Lead":
      value = checkIncrement(item, item.lead);
      value = pacePer(item, value, 28, 72);
      break;
    case "Lead/Handy":
      value = checkIncrement(item, item.leadHandy);
      value = pacePer(item, value, 22, 50);
      break;
    case "Handy":
      value = checkIncrement(item, item.handy);
      value = pacePer(item, value, 18, 32);
      break;
    case "Handy/Mid":
      value = checkIncrement(item, item.handyMid);
      value = pacePer(item, value, 14, 18);
      break;
    case "Mid":
      value = checkIncrement(item, item.mid);
      value = pacePer(item, value, 11, 7);
      break;
    case "Rear":
      value = checkIncrement(item, item.rear);
      value = pacePer(item, value, 7, 0);
      break;
    default:
      value = 0;
      break;
  }

  return value;
}

function checkIncrement(item, value) {
  if (item.increment === 1) value = value * 3;
  if (item.increment === 2) value = (value / 2) * 3;
  return value;
}

function pacePer(item, value, per, minPer) {
  let maxNbr = 27;
  if (value) {
    //change the value to %
    value = (value * 100) / maxNbr;

    /**
     * Assign the value % to the range %
     */
    value = (per * value) / 100;

    /**
     * .Add the minimum range to the rounded %
     *
     */
    value = value + minPer;
  }

  return value;
}

// function pacePer (item, v, p){
//     let maxNbr = 27;
//     let reduce = 100 / 6;
//     let value = v;
//
//     //change the value to %
//     value /= (maxNbr/100);
//
//     // Round the % to 100/6 because we have 6 paces.
//     value = value * (reduce / 100);
//
//     /**
//      * Add the value to the minimum % based on each pace.
//      * Starting from lead = 5 ending with rear = 0.
//      */
//     value = p === 0 ? value : (reduce * p) + value;
//
//
//
//     return  value;
//
// }

const paceRanking = (item, data) => {
  let returnValue = 0;
  let sortData = [];

  if (data && data.length) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].pace === item.pace) {
        sortData.push(data[i]);
      }
    }

    sortData = sortData.sort(function (a, b) {
      return b[item.rpace] - a[item.rpace];
    });

    // sortData = removeDuplicates(sortData, item.pace);

    for (let i = 0; i < sortData.length; i++) {
      if (item.name === sortData[i].name && item.pace === sortData[i].pace) {
        switch (item.pace) {
          case "Lead":
            if (i === 0) {
              returnValue = 100;
            } else if (i === 1) {
              returnValue = 91;
            } else if (i >= 2) {
              returnValue = 82;
            }
            break;
          case "Lead/Handy":
            if (i === 0) {
              returnValue = 71;
            } else if (i === 1) {
              returnValue = 62;
            } else if (i >= 2) {
              returnValue = 53;
            }
            break;
          case "Handy":
            if (i === 0) {
              returnValue = 49;
            } else if (i === 1) {
              returnValue = 40;
            } else if (i >= 2) {
              returnValue = 33;
            }
            break;
          case "Handy/Mid":
            if (i === 0) {
              returnValue = 31;
            } else if (i === 1) {
              returnValue = 25;
            } else if (i >= 2) {
              returnValue = 19;
            }
            break;
          case "Mid":
            if (i === 0) {
              returnValue = 18;
            } else if (i === 1) {
              returnValue = 10;
            } else if (i >= 2) {
              returnValue = 8;
            }
            break;
          case "Rear":
            if (i === 0) {
              returnValue = 7;
            } else if (i === 1) {
              returnValue = 5;
            } else if (i >= 2) {
              returnValue = 3;
            }
            break;
          default:
            break;
        }
      }
    }
  }

  return returnValue;
};

// const removeDuplicates = (a, param) => {
//     return a.filter(function (item, pos, array) {
//         return (
//             array
//                 .map(function (mapItem) {
//                     return mapItem[param];
//                 })
//                 .indexOf(item[param]) === pos
//         );
//     });
// };

const roundPace = (value) => {
  try {
    let pace = assignPaceStr(value.pace);
    if (value.increment === 1) {
      value[pace] = Number(value[pace]) * 3;
    }
    if (value.increment === 2) {
      value[pace] = Number(value[pace]) / 2;
      value[pace] = Number(value[pace]) * 3;
    }
  } catch (e) {
    console.log(e);
  } finally {
    return value;
  }
};

const assignPaceStr = (pace) => {
  switch (pace) {
    case "Lead":
      return "lead";
    case "Lead/Handy":
      return "leadHandy";
    case "Handy":
      return "handy";
    case "Handy/Mid":
      return "handyMid";
    case "Mid":
      return "mid";
    case "Rear":
      return "rear";
    default:
      return "not display";
  }
};

export {
  calcLead,
  calcLeadHandy,
  calcHandy,
  calcHandyMid,
  calcMid,
  calcRear,
  assignPace,
  paceRanking,
  roundPace,
};
