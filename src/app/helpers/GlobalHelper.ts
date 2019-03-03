
export class GlobalHelper {

  getLang(key: string) {
    return lang(key);
  }

  isNullOrEmptyOrUndefined(value: string) {
    return (!value || value == undefined || value == "" || value.length == 0);
  }

}
