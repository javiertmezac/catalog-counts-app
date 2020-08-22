import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { CatalogCount, CatalogCountForm } from '../CatalogCount';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <center><h3>Favor de capturar otro Registro (Catalogo de Cuentas)</h3></center>
          <CatalogCountForm />

          <CatalogCount />
        </header>
      </div>
    );
  }
}

export default App
