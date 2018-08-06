/*
 * @Author: Xavier Yin 
 * @Date: 2018-08-03 10:33:14 
 * @Last Modified by: Xavier Yin
 * @Last Modified time: 2018-08-03 15:58:16
 */
import Ask from "armor-ask";

describe("Armor-ask test cases.", () => {
  let foo, bar;

  let q1 = "who are you";
  let q2 = "where are you from";
  let questionWithoutAnswerYet = "question withou an answer yet";

  beforeEach(() => {
    foo = Object.assign({ id: "foo" }, Ask);
    bar = Object.assign({ id: "bar" }, Ask);

    foo.answer(q1, function(name) {
      return `I'm ${name || this.id}`;
    });
    foo.answer(q2, "Wuhan city", { once: true });
  });

  afterEach(() => {
    foo.shut();
    bar.shut();
  });

  it("ask", done => {
    expect(foo.ask(q1)).toBe("I'm foo"); // 测试提问，且正确调用上下文，对 solution 求值
    expect(foo.ask(q1, { params: "Bob" })).toBe("I'm Bob"); // 测试提问传参
    expect(foo.ask(q2)).toBe("Wuhan city"); // 测试一次性答案是否正确
    expect(foo.ask(q2)).toBe(void 0); // 测试一次性答案是否移除

    foo.answer(q2);
    expect(bar.answer(q2)).toBe(false); // 测试不能重提回答同一个问题
    let solution = () => "Wuhan";
    expect(bar.answer(q2, solution, { update: true })).toBe(true); // 测试更新已有答案
    expect(foo.ask(q2, { evaluate: false })).toBe(solution); // 测试不对 solution 求值。
    foo.ask(q2, { wait: 1 }).then(result => expect(result).toBe("Wuhan")); // 测试对已存在答案提出问题（返回 Promise）
    foo.ask(questionWithoutAnswerYet, { wait: 2000 }).catch(question => {
      expect(question).toBe(questionWithoutAnswerYet);
      done();
    }); // 测试超时提问
  });

  it("ask a question and wait for an answer.", done => {
    let answerOfQuestion = "whoops";
    foo
      .ask(questionWithoutAnswerYet, { wait: 3000, ns: "new" })
      .then(answer => {
        expect(answer).toBe(answerOfQuestion);
        done();
      });

    foo.answer(questionWithoutAnswerYet, answerOfQuestion, { ns: "new" });
  });

  it("ask a series of questions and wait for answers.", done => {
    foo.ask("1", { wait: 500 }).then(answer => {
      expect(answer).toBe("success");
      callDone();
    });

    foo.ask("2", { wait: 800 }).then(answer => {
      expect(answer).toBe("success too");
      callDone();
    });

    foo.ask("3", { wait: 1000 }).catch(question => {
      expect(question).toBe("3");
      callDone();
    });

    let count = 0;
    let callDone = () => {
      count++;
      if (count >= 3) done();
    };

    bar.answer("1", "success", {
      once: true,
      onShut: () => {
        bar.answer("2", "success too");
      }
    });
  });

  it("confirm the arguments passed into solution function.", () => {
    foo.answer(
      "x",
      (params, question, ns) => {
        expect([params, question, ns]).toEqual(["y", "x", "new"]);
      },
      { ns: "new" }
    );
    foo.ask("x", { params: "y", ns: "new" });
  });
});
