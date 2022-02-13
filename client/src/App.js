import './App.css';
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom'

import Routes from './component/Route/Route';
const  App = ()  => {

  return (
    <Router>
      <Switch>
      <Route component={Routes}/>
      </Switch>
    </Router>
  );
}

export default App;
