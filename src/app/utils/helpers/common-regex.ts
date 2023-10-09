import { REGEX_URL } from '../constants';

export class CommonRegex {
  static isValidURL(url: string): boolean {
    const regex = new RegExp(REGEX_URL);
    return regex.test(url);
  }
}
