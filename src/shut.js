/*
 * @Author: Xavier Yin 
 * @Date: 2018-08-02 14:00:50 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-08-09 11:37:43
 * 
 * 关闭问题答案
 */
import { namespaces } from "./registry";
import { isFunction, safeNs } from "./utils";

function removeQuestion({ question, ns, registry }) {
  ns = safeNs(ns);
  question = safeNs(question);
  let reply = registry[question];
  let { waiting, onShut, ctx } = reply || {};
  // 如果有等待回答的提问，则保留它们。
  if (waiting && waiting.length) {
    registry[question] = { waiting };
  } else {
    // 清理注册表与命名空间
    delete registry[question];
    if (!Object.keys(registry).length) {
      delete namespaces[ns];
    }
  }
  // 调取关闭答案的回调。
  if (isFunction(onShut)) {
    onShut.call(ctx, question, ns);
  }
}

export default function shut(answerer, question, options) {
  let { ns, all } = options || {};
  ns = safeNs(ns);
  let answers = answerer._armorAskAnswers;
  if (!answers || !answers.length) return answerer;

  let answer;
  let transition = [];
  for (let i = 0; i < answers.length; i++) {
    answer = answers[i];
    if (
      (question == void 0 || question === answer.question) &&
      (all || answer.ns === ns)
    ) {
      removeQuestion(answer);
    } else {
      transition.push(answer);
    }
  }
  answerer._armorAskAnswers = transition;
  return answerer;
}
