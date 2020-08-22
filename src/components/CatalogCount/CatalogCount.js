import React from 'react'
import './CatalogCount.scss';
import { Get } from './CatalogCountHook'

function CatalogCount() {
  const [ data, loading ] = Get("http://localhost:8888/api/v1/catalog-count")
  const list = data.catalogCountResponseCollection;
    return (
      <div>
        <center><h1>Historial Catalogo de Cuentas</h1></center>
        { loading ? ("Cargando Lista ... ") : (
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th width="200">Cantidad</th>
                <th>Detalles</th>
                <th width="150">Fecha Registro</th>
              </tr>
            </thead>
            <tbody>
              { list.map((cc) => (
                <tr key={cc.id}>
                  <td>{cc.amount}</td>
                  <td>{cc.details}</td>
                  <td>{cc.registrationDate}</td>
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