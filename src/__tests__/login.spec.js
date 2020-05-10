import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
  waitForElement,
} from "@testing-library/react";
import Login from "../views/Login.View";
import Svg from "../components/SvgMap";
import { Provider } from "react-redux";
import store from "../redux/store";
import userEvent from "@testing-library/user-event";
import IntlProvider from "../languages/components/IntlProvider";
import { createMemoryHistory } from "history";
import { BrowserRouter as Router, Link } from "react-router-dom";

const history = createMemoryHistory();
const LoginComponent = () => {
  return render(
    <Provider store={store}>
      <IntlProvider>
        <Router>
          <Login />
        </Router>
      </IntlProvider>
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
    form.dispatchEvent(new Event("submit"));
    waitFor(() => expect(getByText("Please provide a password")).toBeTruthy());
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
    form.dispatchEvent(new Event("submit"));
    waitFor(() => expect(getByText("Requires valid email")).toBeTruthy());
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
    userEvent.type(email, "email@gmail.com");
    userEvent.type(password, "wrong");
    form.dispatchEvent(new Event("submit"));
    waitFor(() =>
      expect(
        getByText("Incorrect username or password combination")
      ).toBeTruthy()
    );
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
    userEvent.type(email, "example@gmail.com");
    userEvent.type(password, "password");
    form.dispatchEvent(new Event("submit"));
    waitFor(() =>
      expect(
        getByText("Please update your profile information to continue")
      ).toBeTruthy()
    );
    waitForElement(() => fireEvent.click(getByLabelText("Close")));
  });

  it("should login successfully", async () => {
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
    form.dispatchEvent(new Event("submit"));
  });

  it("should change the language to french",  () => {
    const {
      getByText,
      getByTestId
    } = SendResetEmailComponent();
    const french = getByTestId("french-button").querySelector('div');
    fireEvent.click(french);
    waitFor(() =>
      expect(
        getByText("Rendre le voyage et l'hébergement de l'entreprise faciles et pratiques.")).toBeInTheDocument()
    );
  });


  // it("should change the language to french", async () => {
  //   const {
  //     getByLabelText,
  //     getAllByText,
  //     getByTestId,
  //     container,
  //     debug,
  //   } = LoginComponent();
  //   const french = getAllByText("french-button");
  //   fireEvent.click(french);
  //   waitFor(() =>
  //     expect(
  //       getByText(
  //         "Rendre le voyage et l'hébergement de l'entreprise faciles et pratiques."
  //       )
  //     ).toBeTruthy()
  //   );
  // });
});
