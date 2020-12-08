import { reduce, map, filter, sum, keys, addProperty } from "../";

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
