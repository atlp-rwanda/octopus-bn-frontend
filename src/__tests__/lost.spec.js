import Lost from "../views/Lost.View";
import React from "react";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import userEvent from "@testing-library/user-event";
import IntlProvider from "../languages/components/IntlProvider";
import { BrowserRouter as Router, Link } from "react-router-dom";

const LostComponent = () => {
  return render(
    <Provider store={store}>
      <IntlProvider>
        <Router>
          <Lost />
        </Router>
      </IntlProvider>
    </Provider>
  );
};

describe("LOST", () => {
  afterEach(cleanup);
  it("should render login component", () => {
    const { asFragment } = LostComponent();
    expect(asFragment(<Lost />)).toMatchSnapshot();
  });
  it("should have a lost words", () => {
    const { getByLabelText } = LostComponent();
    const lost_text = getByLabelText("lost-text");
    expect(lost_text.innerHTML).toBe(
      'Lost? let\'s Take you <a href="/">Home</a>'
    );
  });
});
