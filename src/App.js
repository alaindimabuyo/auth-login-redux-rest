
import {Provider} from "react-redux"
import Auth from "./components/Auth"
import store from "./redux/store"
import Task from "./components/Task"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SetAuthToken from "./redux/setAuthToken";
import PrivateRoute from "./route/PrivateRoute";
import './App.css';

function App() {

  if (localStorage.token) {
    SetAuthToken(localStorage.token)
  }

  return (
    <Provider store={store}>

     <Router>
        <Switch>
          <PrivateRoute exact path='/' component={Task} />      
          <Route exact path='/login' component={Auth} /> 
         
        </Switch>
     </Router>
     </Provider>
  );
}

export default App;
