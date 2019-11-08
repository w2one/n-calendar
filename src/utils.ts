/**
 * 根据月份获取当月天数
 * @param {月份} month
 */
export function getDaysByMonth(month: number) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      var year = new Date().getFullYear();
      return year % 400 == 0 || (year % 100 != 0 && year % 4 == 0) ? 29 : 28;
    default:
      break;
  }
}
