/*
 * @Author: Xavier Yin 
 * @Date: 2018-08-02 11:20:48 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-08-02 21:19:00
 */

export function isFunction(obj) {
  return typeof obj === "function";
}

export function isNumber(num) {
  return "number" === typeof num && !isNaN(num) && num !== Infinity;
}
