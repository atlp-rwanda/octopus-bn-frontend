import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Signup from "../views/SignupPage";
import Svg from "../components/SvgMap.js";
import SignupForm from "../components/SignupForm";
import Confirm from "../views/ConfirmEmail";
import store from "../redux/store";
import IntlProvider from "../languages/components/IntlProvider";
const signupComponent = () => {
  return render(
    <Provider store={store}>
      <IntlProvider>
        <Router>
          <Signup />
        </Router>
      </IntlProvider>
    </Provider>
  );
};
const appComponent = () => {
  return render(
    <Provider store={store}>
      <IntlProvider>
        <App />
      </IntlProvider>
    </Provider>
  );
};
describe("SIGN UP", () => {
  addEventListener;
  afterEach(cleanup);
  it("renders the component", () => {
    const { asFragment } = appComponent();
    expect(asFragment(<App />)).toMatchSnapshot();
  });
  it("renders the sign up page", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <IntlProvider>
            <Signup />
          </IntlProvider>
        </Router>
      </Provider>
    );
    expect(asFragment(<Signup />)).toMatchSnapshot();
  });
  it("renders the svg map", () => {
    const { asFragment } = render(<Svg />);
    expect(asFragment(<Svg />)).toMatchSnapshot();
  });
  it("renders the signup form", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <IntlProvider>
            <SignupForm />
          </IntlProvider>
        </Router>
      </Provider>
    );
    expect(asFragment(<SignupForm />)).toMatchSnapshot();
  });
  it("renders the confirm page", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <IntlProvider>
          <Confirm />
        </IntlProvider>
      </Provider>
    );
    expect(asFragment(<Confirm />)).toMatchSnapshot();
  });
  it("should be able to deal with data change", () => {
    const { getByLabelText, getByText, container, debug } = signupComponent();
    const firstName = getByLabelText("First Name");
    const lastName = getByLabelText("Last Name");
    const email = getByLabelText("email");
    const password = getByLabelText("password");

    userEvent.type(firstName, "John");
    userEvent.type(lastName, "Doe");
    userEvent.type(email, "example@gmail.com");
    userEvent.type(password, "password");

    expect(firstName.value).toBe("John");
    expect(lastName.value).toBe("Doe");
    expect(email.value).toBe("example@gmail.com");
    expect(password.value).toBe("password");
  });

  it("should show an error when there is no firstname provided", () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = signupComponent();
    const firstName = getByLabelText("First Name");
    const lastName = getByLabelText("Last Name");
    const email = getByLabelText("email");
    const password = getByLabelText("password");
    const form = container.querySelector("form");

    userEvent.type(firstName, "");
    userEvent.type(lastName, "Doe");
    userEvent.type(email, "example@gmail.com");
    userEvent.type(password, "password");
    form.dispatchEvent(new Event("submit"));
    waitFor(() =>
      expect(getByText("Your first name is required")).toBeTruthy()
    );
  });
  it("should show an error when there is no lastname provided", () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = signupComponent();
    const firstName = getByLabelText("First Name");
    const lastName = getByLabelText("Last Name");
    const email = getByLabelText("email");
    const password = getByLabelText("password");
    const form = container.querySelector("form");

    userEvent.type(firstName, "John");
    userEvent.type(lastName, "");
    userEvent.type(email, "example@gmail.com");
    userEvent.type(password, "password");
    form.dispatchEvent(new Event("submit"));
    waitFor(() => expect(getByText("Your last name is required")).toBeTruthy());
  });
  it("should show an error when there is no email provided", () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = signupComponent();
    const firstName = getByLabelText("First Name");
    const lastName = getByLabelText("Last Name");
    const email = getByLabelText("email");
    const password = getByLabelText("password");
    const form = container.querySelector("form");
    userEvent.type(firstName, "John");
    userEvent.type(lastName, "Doe");
    userEvent.type(email, "");
    userEvent.type(password, "password");
    form.dispatchEvent(new Event("submit"));
    waitFor(() => expect(getByText("Please enter a valid email")).toBeTruthy());
  });
  it("should show an error when there is no password provided", () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = signupComponent();
    const firstName = getByLabelText("First Name");
    const lastName = getByLabelText("Last Name");
    const email = getByLabelText("email");
    const password = getByLabelText("password");
    const form = container.querySelector("form");

    userEvent.type(firstName, "John");
    userEvent.type(lastName, "Doe");
    userEvent.type(email, "example@gmail.com");
    userEvent.type(password, "");
    form.dispatchEvent(new Event("submit"));
    waitFor(() =>
      expect(
        getByText("Minimum lenght for password is 8 characters")
      ).toBeTruthy()
    );
  });

  it("should show an error when given email already exist", () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = signupComponent();
    const firstName = getByLabelText("First Name");
    const lastName = getByLabelText("Last Name");
    const email = getByLabelText("email");
    const password = getByLabelText("password");
    const form = container.querySelector("form");

    userEvent.type(firstName, "John");
    userEvent.type(lastName, "Doe");
    userEvent.type(email, "abdoulniyigena@gmail.com");
    userEvent.type(password, "password");
    form.dispatchEvent(new Event("submit"));
    waitFor(() => expect(getByText("email already taken")).toBeTruthy());
  });

  it("should sign up successfully", () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = signupComponent();
    const firstName = getByLabelText("First Name");
    const lastName = getByLabelText("Last Name");
    const email = getByLabelText("email");
    const password = getByLabelText("password");
    const form = container.querySelector("form");

    userEvent.type(firstName, "John");
    userEvent.type(lastName, "Doe");
    userEvent.type(email, "example@gmail.com");
    userEvent.type(password, "password");
    form.dispatchEvent(new Event("submit"));
  });
});
