/*
 * @Author: Xavier Yin 
 * @Date: 2018-07-24 14:03:54 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-08-03 10:25:04
 */
import ask from "./ask";
import answer from "./answer";
import shut from "./shut";
import { namespaces, getRegistry } from "./registry";
import { SOLUTION } from "./consts";

const ArmorAsk = {
  // 提问
  ask(question, options) {
    return ask(question, options);
  },

  // 注册答案
  answer(question, solution, options) {
    return answer(this, question, solution, options);
  },

  // 关闭答案
  shut(question, options) {
    return shut(this, question, options);
  }
};

const askExtensions = {
  /**
   * 检查提问是否已经有答案。返回 true 或 false。
   * @param {string} question 问题。
   * @param {*} options
   *  - ns: 命名空间，默认 default。
   *  - all: 是否搜索所有命名空间。如果给出该选项，ns 无效。
   */
  has(question, options) {
    if (question == void 0) question = "";
    let { ns, all } = options || {};
    let names = all ? Object.keys(namespaces) : [ns];

    let registry, reply;
    let bingo = false;
    for (let i = 0; i < names.length; i++) {
      registry = getRegistry(names[i]);
      if (registry) {
        reply = registry[question];
        if (reply && reply.hasOwnProperty(SOLUTION)) {
          bingo = true;
          break;
        }
      }
    }
    return bingo;
  },

  /**
   * 列出所有已注册的有回答的提问。
   * @param {*} options
   *  - ns: 命名空间，默认 default。
   *  - all: 是否搜索所有命名空间。如果给出该选项，ns 无效。
   */
  list(options) {
    let { ns, all } = options || {};
    let names = all ? Object.keys(namespaces) : [ns == void 0 ? "default" : ns];
    let list = {};
    let registry, reply;
    for (let i = 0; i < names.length; i++) {
      registry = getRegistry(names[i]);
      if (registry) {
        let arr = [];
        for (let q in registry) {
          reply = registry[q];
          if (reply && reply.hasOwnProperty(SOLUTION)) {
            arr.push(q);
          }
        }
        if (arr.length) list[names[i]] = arr;
      }
    }
    return list;
  },

  // 获取命名空间副本。
  _getNamespaces() {
    return Object.assign({}, namespaces);
  }
};

Object.assign(ArmorAsk.ask, askExtensions);

module.exports = ArmorAsk;
