# Armor Ask

`armor-ask` is a library in JavaScript.

# Installation

`npm install armor-ask`

# Usage

```js
import ArmorAsk from "armor-ask";
let foo = Object.assign({}, ArmorAsk);
let bar = Object.assign({}, ArmorAsk);

let question = "x + y = ?";
foo.answer(question, (params, question) => {
  let { x, y } = params;
  return `question: ${question}\nanswer: ${x} + ${y} = ${x + y}`;
});
let answer = bar.ask(question, { params: { x: 100, y: 100 } });

// output:
// question: x + y = ?
// answer: 100 + 100 = 200
console.log(answer);
```

# API

## ask(question:string, [options:object])

Ask a question and expect an answer returned.

If a question is asked and there is an answer that has been provided, then a solution that is provided by the answer should be returned, the type of solution could be any.

- `question:string` The question to ask. The any one of `undefined` or `null` is equal to `''`.
- `options`:
  - `evaluate:bool` If the solution returned is a function, it will be evaluated by default unless this option is given false.
  - `params:any` If the solution is a function and the option evaluate is true, the value of this option would be passed in solution as the first argument.
  - `wait:number` The milliseconds to wait for an answer that has not been provided yet when the question is asked. If `wait` is 0, it will immediately get a solution, which would be undefined if there isn't an answer. Otherwise, it will return a promise which would be resolved when the answer is provided, if `wait` is positive, the promise would be rejected until the time of waiting runs out; if `wait` is negative, the promise will be waiting to be resolved until an answer is provided.
  - `ns:string` The namespace where it should look for an answer for this question. The option's default value is "default", the any one of `undefined` or `null` is equal to `default`.

```js
let question = "Who are you?";
foo.answer(question, "foo");

let result = foo.ask(question); // return "foo"

let callback = () => {};
foo
  .ask("give me a function", { wait: 1000, evaluate: false })
  .then(fn => console.log(fn === callback)); // true

foo.answer("give me a function", callback);
```

## answer(question:string, [solution:any], [options:object])

To provide an answer for a question and return a `true` when it successfully registered or a `false` when it failed to register the solution for a question.

- `question:string` The question to answer. The any one of `undefined` or `null` is equal to `''`.
- `solution:any` The solution for a question, this will be returned when the `question` is asked. If it's a function, it takes three arguments: `params`, `question`, `ns`.
- `options`
  - `once:bool` If given ture, the answer would immediately be closed when its corresponding question is asked. The default value is false.
  - `update:bool` If given true, the new answer would replece the current answer if it exists, otherwise it would failed to register the new answer. The default value is false.
  - `ns:string` The namespace to register the question and answer.The any one of `undefined` or `null` is equal to 'default'.
  - `ctx:object` If given, it would be the context of the solution if it's a function. The default context of solution is answerer itself.
  - `onShut:function` If given, it would be called when the answer is closed. It takes two arguments that they are `question` and `ns`.

```js
foo.answer("question", { once: true, update: true, onShut: () => {} });
```

## shut([questions:string], [options:object])

Close the answers.

- `question:string` The question should be closed. If it's given `undefined` or `null`, the all of the questions could be the one to be closed.
- `options`
  - `ns` The namespace to look for the given question to close. The default value is 'default'. the one of `undefined` or `null` is equals to 'default'.
  - `all` If given true, the value of `ns` would be ignored and it would look for question in all of namespaces.

```js
foo.shut(); // close all the answers in default namespace.
foo.shut("some question", { ns: "new" }); // close the answer to 'some question' in 'new' namespace.
foo.shut(void 0, { all: true }); // close all the answers that were provided by foo.
```
