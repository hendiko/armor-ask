/*
 * @Author: Xavier Yin 
 * @Date: 2018-08-02 14:01:01 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-08-03 09:57:53
 * 
 * Answer
 * 
 * Provide the resolution to a topic.
 */
import shutApi from "./shut";
import { getRegistry } from "./registry";
import { SOLUTION } from "./consts";

/**
 *
 * @param {object} answerer
 * @param {string} question
 * @param {any} solution
 * @param {object} options
 *  - @param {bool} update: if given true, the new solution would replace the older solution if it exists.
 *  - @param {string} ns: the namespace where the question is. if given undefined or null, the value of ns would be default.
 *  - @param {object} ctx: if solution is a function, ctx could be its context. If not given, it would be answerer itself.
 *  - @param {bool} once: if given true, the answer would immediately be closed if it has been asked once.
 *  - @param {function} onShut: if given, it would be called when this solution is being closed. It would be passed two arguments which are question and namespace.
 */
export default function answer(answerer, question, solution, options) {
  let { update, ns, ctx, once, onShut } = options || {};
  if (!ctx) ctx = answerer;
  if (question == void 0) question = "";

  let registry = getRegistry(ns, true);
  let reply = registry[question];
  let { waiting } = reply || {};

  // 如果已经存在 solution
  if (reply && reply.hasOwnProperty(SOLUTION)) {
    // 如果要求更新已存在的 solution
    if (update) {
      shutApi(reply.answerer, question, { ns });
    } else {
      // 返回注册解决方案失败
      return false;
    }
  }

  reply = registry[question] = {
    [SOLUTION]: solution,
    ctx,
    waiting,
    answerer,
    once,
    onShut
  };

  if (!answerer._armorAskAnswers) answerer._armorAskAnswers = [];
  answerer._armorAskAnswers.push({ question, ns, registry });

  if (waiting && waiting.length) {
    let fn;
    while (waiting.length) {
      fn = waiting.shift();
      if (!fn._rejected) {
        fn(solution, ctx);
        if (once) {
          shutApi(answerer, question, { ns });
          break;
        }
      }
    }
  }

  return true;
}
