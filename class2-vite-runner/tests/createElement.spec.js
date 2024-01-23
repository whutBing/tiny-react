import React from "../core/React";
import { it, expect, describe, expectTypeOf } from "vitest";

describe("createElement", () => {
  it("should return vdom for element", () => {
    const el = React.createElement("div", { id: "app" }, "hi");
    // expect(el).toEqual({
    //   type: "div",
    //   props: {
    //     children: [
    //       {
    //         type: "TEXT_ELEMENT",
    //         props: {
    //           nodeValue: "hi",
    //           children: [],
    //         },
    //       },
    //     ],
    //   },
    // });
    expect(el).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "hi",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
          "id": "app",
        },
        "type": "div",
      }
    `);
  });
});
