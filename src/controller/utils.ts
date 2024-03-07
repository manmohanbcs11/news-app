export class Utils {

  static isEmpty(str: any): boolean {
    return (typeof str === 'undefined' || str === null || str === '' || str.length === 0);
  }
}