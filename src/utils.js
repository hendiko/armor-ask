/*
 * @Author: Xavier Yin 
 * @Date: 2018-08-02 11:20:48 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-08-09 11:38:24
 */

export function isFunction(obj) {
  return typeof obj === "function";
}

export function isNumber(num) {
  return "number" === typeof num && !isNaN(num) && num !== Infinity;
}

// 强制转换命名空间的合法名称
export function safeNs(ns) {
  return ns == void 0 ? "default" : ns;
}

export function safeQuestion(q) {
  return q == void 0 ? "" : q;
}
