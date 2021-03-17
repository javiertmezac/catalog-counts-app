import React from 'react';
import './CatalogCount.scss';
import { Get } from './CatalogCountHook';
import { CatalogCountForm } from '../CatalogCount';

function CatalogCount() {
  const [ data, loading ] = Get("http://localhost:8888/cc-service/api/v1/catalog-count")
  const list = data.catalogCountResponseCollection;
    return (
      <div>
        <center><h3>Favor de capturar otro Registro (Catalogo de Cuentas)</h3></center>
        <CatalogCountForm />

        <center>
          <h1>Historial Catalogo de Cuentas</h1>
        </center>
        { loading ? ("Cargando Lista ... ") : (
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th width="350">Fecha Registro</th>
                <th width="200">Cantidad</th>
                <th>Detalles</th>
                <th width="150">Saldo</th>
              </tr>
            </thead>
            <tbody>
              { list.map((cc) => (
                <tr key={cc.id}>
                  <td>
                    {new Intl.DateTimeFormat("es", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit"
                    }).format(cc.registrationDate)}
                  </td>
                  <td>{new Intl.NumberFormat().format(cc.amount)}</td>
                  <td>{cc.details}</td>
                  <td>
                    {new Intl.NumberFormat().format(cc.total)}
                  </td>
              </tr>
              )) }
            </tbody>
          </table>
          )
        }
      </div>
    );
  }

export default CatalogCount