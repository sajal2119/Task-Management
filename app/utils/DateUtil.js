const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

class DateUtil {
  static secondsToMilliseconds(tm) {
    return tm * 1000;
  }

  static millisecondsToSeconds(tm) {
    return tm / 1000;
  }

  /**
   * Set date to start of day
   * @param {Date} date
   */
  static getStartOfDay(date) {
    let tempDate = date;
    if (!(tempDate && tempDate.constructor === Date)) {
      tempDate = new Date();
    }
    tempDate.setHours(0);
    tempDate.setMinutes(0);
    tempDate.setSeconds(0);
    tempDate.setMilliseconds(0);

    return tempDate;
  }

  /**
   * Set date to start of day and convert it into milliseconds
   * @param {Date} date
   */
  static getStartOfDayInMilliseconds(date) {
    const tempDate = this.getStartOfDay(date);
    return DateUtil.dateToMilliseconds(tempDate);
  }

  /**
   * Set date to end of day
   * @param {Date} date
   */
  static getEndOfDay(date) {
    let tempDate = date;
    if (!(tempDate && tempDate.constructor === Date)) {
      tempDate = new Date();
    }
    tempDate.setHours(23);
    tempDate.setMinutes(59);
    tempDate.setSeconds(59);
    tempDate.setMilliseconds(0);

    return tempDate;
  }

  /**
   * Set date to end of day and convert it into milliseconds
   * @param {Date} date
   */
  static getEndOfDayInMilliseconds(date) {
    const tempDate = this.getEndOfDay(date);
    return DateUtil.dateToMilliseconds(tempDate);
  }

  static dateToMilliseconds(date) {
    if (typeof date === 'object' && date.constructor === Date) {
      return date.getTime();
    }
    throw (new Error('dateToMilliseconds only accept'));
  }

  static secondsToDate(seconds) {
    const ms = DateUtil.secondsToMilliseconds(seconds);
    return (new Date(ms));
  }

  static generateDateString(dt) {
    if (DateUtil.isValidDate(dt)) {
      return `${dt.getDate()} ${monthArray[dt.getMonth()]}, ${dt.getFullYear()}`;
    }
    throw (new Error('dt can only be of type Date'));
  }

  static isValidDate(dt) {
    if (dt.constructor === Date && !isNaN(dt.getDate())) {
      return true;
    }
    return false;
  }
}

export default DateUtil;
