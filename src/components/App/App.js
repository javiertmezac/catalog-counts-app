import React from 'react';
// import './App.scss';
import { CatalogCount } from '../CatalogCount';
import { AttendanceList } from '../AttendanceList';
// import { routes } from '../../routes/common';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <div>

                <ul className="vertical medium-horizontal menu align-center">
                  <li>
                    <Link to="/">Catálogo de Cuentas</Link>
                  </li>
                  <li>
                    <Link to="/attendance-list">Lista Asistencia</Link>
                  </li>
                </ul>

              {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
              <Switch>
                
                <Route path="/attendance-list">
                  <AttendanceList />
                </Route>

                <Route path="/">
                  <CatalogCount />
                </Route>

              </Switch>
            </div>
          </Router>
        </header>
      </div>
    );
  }
}

export default App
