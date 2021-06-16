import React from 'react'
import DatePicker, { setDefaultLocale } from "react-datepicker";
import { config } from '../../Constans';
import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";

const CC_URL = config.url.BASE_API_URL.concat("/catalog-count");
setDefaultLocale(es)

class CatalogCountForm extends React.Component {
  constructor() {
    super();
    this.state = {
      catalogCountEnumId: 0,
      amount: 0,
      details: '',
      registrationDate: new Date()
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name] : event.target.value});
  }

  handleSubmit(event) {
    const headers = {
      'content-type' : 'application/json'
    }

    //todo: make this async, and or use useEffect(), benefits?
    fetch(CC_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(this.state)
    }).then(res => {
        if (!res.ok) {
          res.json().then(data => {
            alert('Server Error!\n' + data.message)
          })
        }
    }).catch(function(error) {
      console.log(error)
    })

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="grid-container">
          <div className="grid-x grid-padding-x">

            <div className="medium-3 cell">
              <label>Cantidad: </label>
              <input type="text" name="amount" onChange={this.handleChange} />
            </div>

            <div className="medium-3 cell">
              <label>Número de Cuenta:</label>
              <input type="text" name="catalogCountEnumId" onChange={this.handleChange} />
            </div>

            <div className="medium-3 cell">
              <label>Fecha Registro:</label>
              <DatePicker
                locale="es"
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                selected={this.state.registrationDate}
                onChange={(date) => this.setState({registrationDate : date})}>
              </DatePicker>
            </div>

            <div className="medium cell">
              <label>Detalles: </label>
              <textarea placeholder="Descripción" name="details" onChange={this.handleChange} ></textarea>
            </div>

            <button className=".submit button small expanded" href="#">Guardar!</button>

          </div>
        </div>
      </form>
    )
  }
}

export default CatalogCountForm