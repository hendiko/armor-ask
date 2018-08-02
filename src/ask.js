/*
 * @Author: Xavier Yin 
 * @Date: 2018-08-02 11:14:55 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-08-03 15:51:07
 * 
 * 提问
 */

import { getRegistry } from "./registry";
import { isNumber, isFunction } from "./utils";
import { SOLUTION } from "./consts";
import shutApi from "./shut";

// 是否以 Promise 返回 result
function shouldBePromise(result, should) {
  return should ? Promise.resolve(result) : result;
}

/**
 * 提问
 * @param {string} question 问题
 * @param {object} options
 *  - evaluate(bool) 如果获取的 solution 是函数的话，是否要立即求值。默认为 true。
 *  - ns(string) 提问的命名空间。默认为 default。
 *  - wait(number) 如果未找到答案，是否要继续等待。如果为 0，则表示不等待，直接返回。如果为大于 0 的数字，则表示等待超时时间，单位为毫秒。如果为小于 0 的数字，则表示要一直等待到有人提供答案。
 *  - params(any) 如果 solution 是函数，该选项将作为该函数的第一个参数传入。
 */
export default function ask(question, options) {
  let { evaluate = true, ns, wait, params } = options || {};
  wait *= 1;
  if (!isNumber(wait)) wait = 0;

  let registry = getRegistry(ns, wait);

  // 如果不要求 wait，当 registry 为否时可以直接返回。
  if (!registry) return;

  if (question == void 0) question = "";
  let reply = registry[question];

  // 如果不要求 wait，当 reply 为否时可以直接返回。
  if (!reply && !wait) return;
  if (!reply) reply = registry[question] = { waiting: [] };

  // 检查是否包含 solution 字段，如果有，表示已经提供了 solution。
  // 否则表示还没有人提供 solution。
  if (reply.hasOwnProperty(SOLUTION)) {
    let { [SOLUTION]: solution, ctx, once, answerer } = reply;
    if (once) shutApi(answerer, question, { ns });
    return shouldBePromise(
      evaluate
        ? isFunction(solution)
          ? solution.call(ctx, params, question, ns)
          : solution
        : solution,
      wait
    );
  } else if (wait) {
    // 如果要求 wait，则返回一个 Promise。
    // 如果在超时之前有人提供了 solution，则 Promise 被 resolve，resolve 的 value 为 solution 提供的结果。
    // 如果超时还没有人提供 solution，则表示 Promsie 被 reject。
    return new Promise((resolve, reject) => {
      let timer;
      // 只有设置了超时时间，才进行超时处理。
      if (wait > 0) {
        timer = setTimeout(function() {
          waitForResolve._rejected = true;
          reject(question);
        }, wait);
      }
      let waitForResolve = function(solution, ctx) {
        if (wait > 0) clearTimeout(timer);
        let result = evaluate
          ? isFunction(solution)
            ? solution.call(ctx, params, question, ns)
            : solution
          : solution;
        resolve(result);
      };
      reply.waiting.push(waitForResolve);
    });
  } else {
    return;
  }
}
