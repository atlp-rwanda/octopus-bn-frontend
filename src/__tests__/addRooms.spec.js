import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import store from "../redux/store";
import IntlProvider from "../languages/components/IntlProvider";
import CreateRooms from "../views/Dashboard/CreateRooms";
import CreateRoomsForm from "../components/CreateRoomsForm";
import { currencies } from "../helpers/currencies-types";

const AddRooms = () => {
  return render(
    <Provider store={store}>
      <IntlProvider>
        <Router>
          <CreateRooms />
        </Router>
      </IntlProvider>
    </Provider>
  );
};

describe("Travel admin", () => {
  addEventListener;
  afterEach(cleanup);

  it("should render create rooms page", () => {
    const { asFragment } = AddRooms();
    expect(asFragment(<CreateRooms />)).toMatchSnapshot();
  });

  it("should render create rooms form", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <IntlProvider>
            <CreateRoomsForm />
          </IntlProvider>
        </Router>
      </Provider>
    );
    expect(asFragment(<CreateRoomsForm />)).toMatchSnapshot();
  });

  it("should be able to deal with data change", () => {
    const { getByLabelText } = AddRooms();
    const accommodationsID = getByLabelText("Accommodation");
    const roomNumber = getByLabelText("room number");
    const cost = getByLabelText("cost");
    const currency = getByLabelText("currency");

    userEvent.selectOptions(accommodationsID, "Qwhehdbh");
    userEvent.type(roomNumber, "12H");
    userEvent.type(cost, "12");
    userEvent.selectOptions(currency, "RWF");

    expect(accommodationsID.value).toBe(undefined);
    expect(roomNumber.value).toBe("12H");
    expect(cost.value).toBe("12");
    expect(currency.value).toBe(undefined);
  });

  it("should show an error when there is no accommodation provided", () => {
    const { getByLabelText, getByText, container } = AddRooms();
    const accommodationsID = getByLabelText("Accommodation");
    const roomNumber = getByLabelText("room number");
    const cost = getByLabelText("cost");
    const form = container.querySelector("form");

    userEvent.type(accommodationsID, "");
    userEvent.type(roomNumber, "12H");
    userEvent.type(cost, "12");
    form.dispatchEvent(new Event("submit"));
    waitFor(() =>
      expect(getByText("You must specify the accommodation")).toBeTruthy()
    );
  });

  it("should show an error when there is no room number provided", () => {
    const { getByLabelText, getByText, container } = AddRooms();
    const accommodationsID = getByLabelText("Accommodation");
    const roomNumber = getByLabelText("room number");
    const cost = getByLabelText("cost");
    const form = container.querySelector("form");

    userEvent.type(accommodationsID, "");
    userEvent.type(roomNumber, "");
    userEvent.type(cost, "12");
    form.dispatchEvent(new Event("submit"));
    waitFor(() =>
      expect(getByText("The room number is required")).toBeTruthy()
    );
  });
});
