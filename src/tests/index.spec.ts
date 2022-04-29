import {
  reduce,
  map,
  filter,
  sum,
  keys,
  addProperty,
  parseBracketFactory,
} from "../";

describe("Sum", () => {
  it("Should equal 4", () => {
    expect(sum(2, 2)).toBe(4);
  });
});

describe("Add Property", () => {
  it("Should add foo:bar key/value pair", () => {
    const withFooBar = addProperty({ key: "value" }, "foo", "bar");
    expect(withFooBar).toEqual({ key: "value", foo: "bar" });
  });
});

describe("Keys", () => {
  it("Should get all object property names", () => {
    expect(keys({ name: "Ben", age: 32 })).toEqual(["name", "age"]);
  });
});

describe("Filter", () => {
  it("Should return even numbers", () => {
    expect(filter([1, 2, 3, 4], (v) => !(v % 2))).toEqual([2, 4]);
  });
});

describe("Map", () => {
  it("Should output doubled numbers", () => {
    expect(map([1, 2, 3], (v) => v * 2)).toEqual([2, 4, 6]);
  });
  it("Should output stringified numbers", () => {
    expect(map([1, 2, 3], (v) => "" + v)).toEqual(["1", "2", "3"]);
  });
});

describe("Reduce", () => {
  it("Should output sum of integers", () => {
    const sum = reduce([1, 2, 3], (t, v) => t + v);
    expect(sum).toBe(6);
  });

  it("Should output concatenated digits", () => {
    const concatenated = reduce([1, 2, 3], (t, v) => t + v, "");
    expect(concatenated).toBe("123");
  });

  it("Should output initializer", () => {
    const initialValue = reduce<never, string>(
      [] as Array<never>,
      () => {
        throw "";
      },
      "initialized"
    );
    expect(initialValue).toBe("initialized");
  });

  it("Should throw with empty array and undefined initializer", () => {
    const thrower = () => {
      return reduce<never>([] as Array<never>, () => {
        throw "";
      });
    };
    expect(thrower).toThrow("Cannot reduce an empty array with no initializer");
  });
});

describe("Parse Brackets", () => {
  const parseEmpty = parseBracketFactory({});
  const parseDefault = parseBracketFactory({
    "{": { open: true, pair: "}" },
    "[": { open: true, pair: "]" },
    "<": { open: true, pair: ">" },
    "}": { open: false },
    "]": { open: false },
    ">": { open: false },
  });

  it("Should throw error for invalid characters", () => {
    expect(() => parseDefault("invalid")).toThrow(
      "Invalid character in input 'invalid' at index 0: 'i'"
    );
  });

  it("Should return true for empty strings", () => {
    expect(parseDefault("")).toBe(true);
    expect(parseEmpty("")).toBe(true);
  });

  it("Should fail for any non-empty string if config is empty", () => {
    Array.from(Array(100)).map(() => {
      const c = String.fromCharCode(Math.floor(Math.random() * 97) + 29);
      expect(() => parseEmpty(c)).toThrow(
        `Invalid character in input '${c}' at index 0: '${c}'`
      );
    });
  });

  it("Should return false if bracket placement is invalid", () => {
    ["<", ">", "{", "}", "[", "]", "{]", "[{<>]}", "<>{}]["].forEach((s) =>
      expect(parseDefault(s)).toBe(false)
    );
  });

  it("Should return true if bracket placement is valid", () => {
    ["<>", "{}", "[]", "{{}}", "[][]", "{<>[]}", "{{}}<{[]}<{[]}>>"].forEach((s) =>
      expect(parseDefault(s)).toBe(true)
    );
  });
});
