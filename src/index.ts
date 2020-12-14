export const sum = (x: number, y: number): number => x + y;

export const addProperty = <O, V>(
  obj: O,
  key: string,
  value: V
): O & { [P in typeof key]: V } => {
  return { ...obj, [key]: value };
};

export const keys = <O>(obj: O): (keyof O)[] => {
  const output: (keyof O)[] = [];
  for (const key in obj) {
    output.push(key);
  }
  return output;
};

export const filter = <V>(arr: V[], cb: (v: V, i: number) => boolean): V[] => {
  const output: V[] = [];
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (cb(el, i)) output.push(el);
  }
  return output;
};

export const map = <V, N = V>(arr: V[], cb: (v: V, i: number) => N): N[] => {
  const output: N[] = [];
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    output.push(cb(el, i));
  }
  return output;
};

export function reduce<V>(arr: V[], cb: (t: V, v: V) => V): V;
export function reduce<V>(arr: V[], cb: (t: V, v: V) => V, initialValue?: V): V;
export function reduce<V, O>(
  arr: V[],
  cb: (t: O, v: V) => O,
  initialValue?: O
): O;
export function reduce<V, O>(
  arr: V[],
  cb: (t: O | V, v: V) => V | O,
  initialValue?: V | O
): O | V | never {
  if (!arr.length) {
    if (typeof initialValue === "undefined")
      throw "Cannot reduce an empty array with no initializer";
    else return initialValue;
  }

  let startingIndex = 0;
  let output: V | O;

  if (typeof initialValue === "undefined") {
    output = arr[0];
    startingIndex = 1;
  } else {
    output = initialValue;
  }

  for (let i = startingIndex; i < arr.length; i++) {
    output = cb(output, arr[i]);
  }

  return output;
}

export interface OpenBracketRules {
  open: true;
  pair: string;
}
export interface ClosingBracketRules {
  open: false;
}
export type BracketRules = OpenBracketRules | ClosingBracketRules;
type BracketParserConfig = Record<string, BracketRules>;

export const parseBracketFactory = (
  config: BracketParserConfig
): ((str: string) => boolean | never) => (str: string): boolean => {
  const queue: (keyof typeof config)[] = [];

  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    const lastIndexOfQueue = queue.length - 1;

    if (config[c] === undefined)
      throw `Invalid character in input '${str}' at index ${i}: '${c}'`;
    if (config[c].open) queue.push(c);
    else {
      if (!queue.length) return false;
      const currentScopedOpenBracket = config[queue[lastIndexOfQueue]];
      if (currentScopedOpenBracket.open && currentScopedOpenBracket.pair !== c)
        return false;
      queue.pop();
    }
  }

  return !queue.length;
};
