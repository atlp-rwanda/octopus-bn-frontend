import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

describe("", () => {
  it("renders the component", () => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />)).toMatchSnapshot();
  });
});
