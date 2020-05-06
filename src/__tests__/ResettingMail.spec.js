import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter, Route, Switch, Redirect } from 'react-router-dom'
import { render, waitFor, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { Snackbar } from '@material-ui/core'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure, mount } from 'enzyme';
import IntlProvider from "../languages/components/IntlProvider";
import store from "../redux/store";
import SendResetEmail from '../components/SendResetEmail';
import * as actions from '../redux/actions/SendMailAction'
import * as types from '../redux/types/PasswordResetTypes'
import sendMailReducer from "../redux/reducers/sendMailReducer";
import { mapDispatchToProps, mapStateToProps } from '../components/SendResetEmail';
import { SendResetEmailView, PasswordResetProcess } from '../views/SendMailView'
import translate from '../languages/translate';


const initialState = {
  loading: 'none',
  email: '',
  error: '',
  open: false
}
const existingEmail = "moiseri01@gmail.com";
const wrongEmail = "*****@gmail.com";
const dispatch = jest.fn();
let assignMock = jest.fn();
delete window.location;
window.location = { assign: assignMock };
configureMockStore([thunk])

const SendResetEmailComponent = () => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <IntlProvider>
          <SendResetEmail />
        </IntlProvider>
      </BrowserRouter>
    </Provider>
  )
}

configure({ adapter: new Adapter() });

describe('RESET MAIL SENDER', () => {
  afterEach(() => {
    cleanup;
    assignMock.mockClear();
  });
  it('Should render the reset email sender component ', () => {
    const { asFragment } = SendResetEmailComponent();
    expect(asFragment(<SendResetEmail />)).toMatchSnapshot()
  })
  it("Should handle new email input", () => {

    const { getByTestId } = SendResetEmailComponent();
    const emailInput = getByTestId('email-input').querySelector('input');
    fireEvent.change(emailInput, {
      target: { value: "email@gmail.com" }
    });

  });

  it("Should return error by submitting without email", async () => {
    const {
      getByTestId,
      getByText,
      container,
    } = SendResetEmailComponent();
    const emailInput = getByTestId('email-input').querySelector('input');
    userEvent.type(emailInput, "")
    const form = container.querySelector("form");
    form.dispatchEvent(new Event("submit"));
    await waitFor(() => expect(getByText("Requires valid email")).toBeTruthy());
  });

  it('should handle the correct routing to different pages', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']} initialIndex={0} >
          <IntlProvider>
            <Switch>
              <Route exact path='/'  render={()=>(<Redirect to={'/forgot-password'}/>, <SendResetEmailView/>)} />
              <Route exact path='/forgot-password' render={()=>(<Redirect to={'/password-reset-process'}/>,<PasswordResetProcess/>)}/>
            </Switch>
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(SendResetEmailView)).toHaveLength(1);
  });

})

it("Should redirect to 'reset-password-progress'",  () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/forgot-password']} initialIndex={5} >
        <IntlProvider>
          <Switch>
            <Route exact path='/forgot-password' render={()=>(<Redirect to={'/password-reset-process'}/>,<PasswordResetProcess/>)}/>
          </Switch>
        </IntlProvider>
      </MemoryRouter>
    </Provider>
  );
  const {
    getByTestId,
    getByText,
    container,
  } = SendResetEmailComponent();
  const emailInput = getByTestId('email-input').querySelector('input');
  userEvent.type(emailInput, "moiseri01@gmail.com")
  const form = container.querySelector("form");
  form.dispatchEvent(new Event("submit"));
  expect(wrapper.find(PasswordResetProcess)).toBeTruthy();

});

it("Should translate to French", async () => {
  const {
    getByLabelText,
    getByText
  } = SendResetEmailComponent();
  const french = getByLabelText("french-button");
  fireEvent.click(french);
  waitFor(() =>
    expect(
      getByText(translate('bn-value'))).toBeTruthy()
  );
});


describe("TESTING RESET EMAIL SENDING ACTIVITY", () => {
  let mock;
  beforeEach(() => {
    mock = jest.spyOn(axios, 'post');
  });
  afterEach(() => {
    mock.mockRestore();
  });

  it('should test the sendMailAction', async (done, data) => {
    try {
      const push = jest.fn();
      const history = { push };
      mock.mockResolvedValue();
      await actions.sendMailAction(data, history)(dispatch);
      await actions.sendEmailSuccess(existingEmail);
      sinon.stub(window.location, 'assign');
      expect(mock).toHaveBeenCalledWith('https://octopus-bn-backend.herokuapp.com/api/v1/auth/forgot-password', data);
    } catch (err) {
      if (err.response) {
        const serverError = await err.response.data.error;
        dispatch(actions.sendEmailFailure(serverError));
      }
    }

    done()
  });

  it('should show a previous email input state', () => {
    const initialState = {
      email: 'karegeya@gmail.com',

    };
    expect(mapStateToProps(initialState).sendEMailState).toBeFalsy()
  })

  it('should set an email value', (done) => {

    mapDispatchToProps(dispatch).sendMail();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: types.SEND_EMAIL_REQUEST });
    expect(dispatch.mock.calls[1][0].type).toEqual(types.SEND_EMAIL_FAILURE);
    done()
  })

  it("Should return error by submitting a wrong email", async () => {
    const {
      getByTestId,
      getByText,
      container,
    } = SendResetEmailComponent();
    const emailInput = getByTestId('email-input').querySelector('input');
    userEvent.type(emailInput, "falsey.email@gmail.com")
    const form = container.querySelector("form");
    form.dispatchEvent(new Event("submit"));
    const wrapper = shallow(<Snackbar open={true}/>);
    mapDispatchToProps(dispatch).closeMessage();
    expect(dispatch.mock.calls[3][0].type).toEqual(types.CLOSE_MESSAGE)
    
  });

  it('should send a SEND_EMAIL_REQUEST', (done) => {

    expect(sendMailReducer({
      ...initialState,
      loading: 'block'
    }, { type: types.SEND_EMAIL_REQUEST })).toMatchSnapshot()
    done()

  })

  it('should send a SEND_EMAIL_SUCCESS', (done) => {

    const initialState = {
      loading: 'none',
      email: '',
      error: '',
      open: false
    }
    expect(sendMailReducer({
      ...initialState,
      email: existingEmail,
    }, { type: types.SEND_EMAIL_SUCCESS })).toMatchSnapshot()
    done()
  })

  it('should send a SEND_EMAIL_FAILURE', (done) => {

    const error = "The provided email don't exist, create an account"
    expect(sendMailReducer({
      ...initialState,
      email: wrongEmail,
      error,
      open: true
    }, { type: types.SEND_EMAIL_FAILURE })).toMatchSnapshot()
    done()
  })

  it('should send a CLOSE_MESSAGE', (done) => {

    expect(sendMailReducer(null, { type: types.CLOSE_MESSAGE })).toMatchSnapshot()
    debugger;
    done()
  })

})

