import React from "react";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import Login from "../views/Login.View";
import Svg from "../components/SvgMap";
import { Provider } from "react-redux";
import store from "../redux/store";
import userEvent from "@testing-library/user-event";

const LoginComponent = () => {
  return render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
};
describe("LOGIN", () => {
  afterEach(cleanup);
  it("should render login component", () => {
    const { asFragment } = LoginComponent();
    expect(asFragment(<Login />)).toMatchSnapshot();
  });
  it("should be able to handle change", () => {
    const { getByLabelText, getByText, container, debug } = LoginComponent();
    const email = getByLabelText("email");
    const password = getByLabelText("password");

    userEvent.type(email, "email@gmail.com");
    userEvent.type(password, "password");

    expect(email.value).toBe("email@gmail.com");
    expect(password.value).toBe("password");
  });

  it("renders the svg map", () => {
    const { asFragment } = render(<Svg />);
    expect(asFragment(<Svg />)).toMatchSnapshot();
  });

  it("should be returning error when submitting without providing password", async () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = LoginComponent();
    const email = getByLabelText("email");
    const password = getByLabelText("password");
    // const submit = getByLabelText('submit');
    const form = container.querySelector("form");

    userEvent.type(email, "email@gmail.com");
    userEvent.type(password, "");
    await form.dispatchEvent(new Event("submit"));
    await waitFor(() =>
      expect(getByText("Please provide a password")).toBeTruthy()
    );
  });
  it("should be returning error when submitting without providing password", async () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = LoginComponent();
    const email = getByLabelText("email");
    const password = getByLabelText("password");
    // const submit = getByLabelText('submit');
    const form = container.querySelector("form");
    userEvent.type(password, "password");
    await form.dispatchEvent(new Event("submit"));
    await waitFor(() => expect(getByText("Requires valid email")).toBeTruthy());
  });
  it("should display error message if email and/or password are wrong", async () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = LoginComponent();
    const email = getByLabelText("email");
    const password = getByLabelText("password");
    const form = container.querySelector("form");
    // const close = getByLabelText('Close');
    userEvent.type(email, "email@gmail.com");
    userEvent.type(password, "wrong");
    await form.dispatchEvent(new Event("submit"));
    // await waitFor(() => expect(getByLabelText('Close')).toBeTruthy());
  });

  it("should login successfuly", async () => {
    const {
      getByLabelText,
      getByText,
      getByTestId,
      container,
      debug,
    } = LoginComponent();
    const email = getByLabelText("email");
    const password = getByLabelText("password");
    const form = container.querySelector("form");

    userEvent.type(email, "octopusbn@gmail.com");
    userEvent.type(password, "password");
    await form.dispatchEvent(new Event("submit"));
    // await waitFor(() => expect(getByText('Please provide a password')).toBeTruthy());
  });
});
