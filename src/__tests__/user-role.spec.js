import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockAxios from "axios";
import store from "../redux/store";
import IntlProvider from "../languages/components/IntlProvider";
import UserRoleView from "../views/Dashboard/UserRoles";
import UserRole from "../components/UserRole";
import LostSvg from "../components/SvgLost";
import processLocale from "../languages/helper/processLocale";

const userRoleComponent = () => {
  return render(
    <Provider store={store}>
      <IntlProvider>
        <Router>
          <UserRoleView />
        </Router>
      </IntlProvider>
    </Provider>
  );
};

describe("User role setting", () => {
  addEventListener;
  afterEach(cleanup);

  it("should render the user role view", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <IntlProvider>
            <UserRoleView />
          </IntlProvider>
        </Router>
      </Provider>
    );
    expect(asFragment(<UserRoleView />)).toMatchSnapshot();
  });

  it("should render the main component itself", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <IntlProvider>
            <UserRole />
          </IntlProvider>
        </Router>
      </Provider>
    );
    expect(asFragment(<UserRole />)).toMatchSnapshot();
  });

  it("should render the lost svg component", () => {
    const { asFragment } = render(<LostSvg />);
    expect(asFragment(<LostSvg />)).toMatchSnapshot();
  });

  it("should be able to handle the values change", () => {
    const { getByLabelText, getByText, container, debug } = userRoleComponent();

    const email = getByLabelText("email");
    const role = getByLabelText("Role");

    userEvent.type(email, "example@gmail.com");
    userEvent.type(role, "manager");

    expect(email.value).toBe("example@gmail.com");
    expect(role.value).toBe("manager");
  });

  it("should show an error when there is no valid email provided", () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = userRoleComponent();
    const email = getByLabelText("email");
    const role = getByLabelText("Role");
    const form = container.querySelector("form");

    userEvent.type(email, "");
    userEvent.type(role, "manager");
    form.dispatchEvent(new Event("submit"));
    waitFor(() => expect(getByText("Please enter a valid email")).toBeTruthy());
  });

  it("should show an error when there is no role selected", () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = userRoleComponent();
    const email = getByLabelText("email");
    const role = getByLabelText("Role");
    const form = container.querySelector("form");

    userEvent.type(email, "example@gmail.com");
    userEvent.type(role, "");
    form.dispatchEvent(new Event("submit"));
    waitFor(() => expect(getByText("You must select a role")).toBeTruthy());
  });

  it("should show an error when the provided role is not allowed", () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = userRoleComponent();
    const email = getByLabelText("email");
    const role = getByLabelText("Role");
    const form = container.querySelector("form");

    userEvent.type(email, "PO@gmail.com");
    userEvent.type(role, "owner");
    form.dispatchEvent(new Event("submit"));
    waitFor(() =>
      expect(
        getByText(
          "You have to be loggen in as a super administrator to assign roles to users"
        )
      ).toBeTruthy()
    );
  });

  it("should set user role successfully", () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = userRoleComponent();
    const email = getByLabelText("email");
    const role = getByLabelText("Role");
    const form = container.querySelector("form");

    userEvent.type(email, "PO@gmail.com");
    userEvent.type(role, "manager");
    form.dispatchEvent(new Event("submit"));
  });

  it("should change language to french", () => {
    const data = processLocale("fr");
    expect(data).toHaveProperty("lang", "englishColor", "frenchColor");
    expect(data.frenchColor).toEqual("primary");
  });
  it("should change language to english", () => {
    const data = processLocale("en");
    expect(data).toHaveProperty("lang", "englishColor", "frenchColor");
    expect(data.englishColor).toEqual("primary");
  });
  it("should change language to english even when called with no species locale", () => {
    const data = processLocale();
    expect(data).toHaveProperty("lang", "englishColor", "frenchColor");
    expect(data.englishColor).toEqual("primary");
  });
});
