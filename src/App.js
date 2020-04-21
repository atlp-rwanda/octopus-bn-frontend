import React, {Component} from 'react';
import { Provider } from 'react-redux';
import Counter from '../src/components/Counter';

import store from './redux/store';

class App extends Component {
	render(){
		return (
	 <Provider store = {store}>
         <div className="center">
             <Counter counter/>
          </div>
     </Provider>
	  );
	}

}

export default App;
