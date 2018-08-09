/*
 * @Author: Xavier Yin 
 * @Date: 2018-08-02 10:58:10 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-08-09 11:38:52
 * 
 * 问题注册表
 * 
 * 所有提问按照命名空间注册在 namespaces 对象。
 * 
 * 注册表的存储关系为：
 *  1. namespaces 根据命名空间名称返回注册表（registry）；
 *  2. registry 根据问题返回回复（reply）；
 *  3. 从 reply 中获取解决方案（solution）。
 * 
 * namespaces[namespace] => registries[question] => reply[solution] 
 */

import { safeNs } from "./utils";

// 命名空间仓储
export const namespaces = {
  default: {}
};

/**
 * 获取命名空间
 * @param {string} ns 命名空间名称。
 * @param {bool} create 是否强制创建新的命名空间。
 */
export function getRegistry(ns, create) {
  ns = safeNs(ns);
  let registry = namespaces[ns];
  if (!registry && create) {
    registry = namespaces[ns] = {};
  }
  return registry;
}
