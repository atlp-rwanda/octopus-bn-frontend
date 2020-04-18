import React, {Component} from 'react';
import { Provider } from 'react-redux';
import Counter from '../src/components/Counter';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import store from './redux/store';

const Home = () => <h1> Dummy Home Page</h1>;
const Login = () => <h1> Dummy Login Page </h1>;

class App extends Component {
	render(){
		return (
	 <Provider store = {store}>
        <Router>
      <div className="center">
             <Switch>
             <Route path='/' exact component={Home} />
             <Route path='/signin' exact component={Login}/>
             <Route path='/count' exact component={Counter}/>
             </Switch>
      </div> 
      </Router>
     </Provider>
	  );
  }
}

export default App;