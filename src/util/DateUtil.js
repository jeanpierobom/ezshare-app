var DateDiff = require('date-diff');

class DateUtil {

  age(date) {
    const now = new Date();
    const diff = new DateDiff(now, date);
    let number;
    let unit;
    let result;

    if (diff.minutes() < 60) {
      number = diff.minutes();
      unit = 'minute';
      //result `${Math.floor(diff.minutes())} minute`;
      //return `${Math.floor(diff.minutes())} minutes`;
    } else if (diff.hours() < 24) {
      number = diff.hours();
      unit = 'hour';
      //result `${Math.floor(diff.hours())} hour`;
      //return `${Math.floor(diff.hours())} hours`;
    } else if (diff.days() < 7) {
      number = diff.days();
      unit = 'day';
      //result `${Math.floor(diff.days())} day`;
      //return `${Math.floor(diff.days())} days`;
    } else if (diff.days() < 31) {
      number = diff.weeks();
      unit = 'week';
      //result `${Math.floor(diff.weeks())} week`;
      //return `${Math.floor(diff.weeks())} weeks`;
    } else if (diff.months() < 12) {
      number = diff.months();
      unit = 'month';
      //result `${Math.floor(diff.months())} month`;
      //return `${Math.floor(diff.months())} months`;
    } else {
      number = diff.years();
      unit = 'year';
      //result = `${Math.floor(diff.years())} year`;
      //return `${Math.floor(diff.years())} years`;
    }

    number = Math.floor(number);
    unit = number > 1 ? `${unit}s` : unit;
    result = `${number} ${unit}`;
    if (number === 0 && unit === 'minute') {
      result = 'seconds ago';
    }
    return result;
  }

}

const util = new DateUtil();
export default util;