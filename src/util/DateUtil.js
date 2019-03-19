var DateDiff = require('date-diff');

class DateUtil {

  age(date) {
    const now = new Date();
    const diff = new DateDiff(now, date);

    if (diff.minutes() < 60) {
      return `${Math.floor(diff.minutes())} minutes`;
    } else if (diff.hours() < 24) {
      return `${Math.floor(diff.hours())} hours`;
    } else if (diff.days() < 7) {
      return `${Math.floor(diff.days())} days`;
    } else if (diff.weeks() < 4) {
      return `${Math.floor(diff.weeks())} weeks`;
    } else if (diff.months() < 12) {
      return `${Math.floor(diff.months())} months`;
    } else {
      return `${Math.floor(diff.years())} years`;
    }
  }

}

const util = new DateUtil();
export default util;