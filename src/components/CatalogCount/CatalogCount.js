import React from 'react';
import './CatalogCount.scss';
import { Get } from './CatalogCountHook';
import { CatalogCountForm } from '../CatalogCount';
import { config } from '../../Constans';

const CC_URL = config.url.BASE_API_URL.concat("/catalog-count");

function CatalogCount() {
  const [ data, loading ] = Get(CC_URL)
  const list = data.catalogCountResponseCollection;
  const saldoAnterior = data.saldoAnterior;

    return (
      <div>
        <center><h3>Favor de capturar otro Registro (Catálogo de Cuentas)</h3></center>
        <CatalogCountForm />

        <center>
          <h1>Historial Catálogo de Cuentas</h1>
        </center>
        { loading ? ( <center><h4> Cargando Lista ...  </h4></center> ) : (
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th width="350">Fecha Registro (yyyy-MM-dd)</th>
                <th width="450">Número de Cuenta</th>
                <th width="200">Cantidad</th>
                <th>Detalles</th>
                <th width="150">Saldo</th>
              </tr>
            </thead>
            <tbody>
              { list.map((cc) => (
                <tr key={cc.id}>
                  <td>{cc.registrationDate}</td>
                  <td>{cc.catalogCountEnum}</td>
                  <td>{new Intl.NumberFormat().format(cc.amount)}</td>
                  <td>{cc.details}</td>
                  <td>
                    {new Intl.NumberFormat().format(cc.total)}
                  </td>
              </tr>
              )) }
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Saldo Anterior:</td>
                <td>{saldoAnterior}</td>
              </tr>
            </tfoot>
          </table>
          )
        }
      </div>
    );
  }

export default CatalogCount