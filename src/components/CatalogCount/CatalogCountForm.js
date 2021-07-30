import React from 'react'
import DatePicker, { setDefaultLocale } from "react-datepicker";
import { config } from '../../Constans';
import es from 'date-fns/locale/es';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


import "react-datepicker/dist/react-datepicker.css";

const CC_URL = config.url.BASE_API_URL.concat("/catalog-count");
const CCE_URL = config.url.BASE_API_URL.concat("/catalog-count-enum");

setDefaultLocale(es)

class CatalogCountForm extends React.Component {
  constructor() {
    super();
    this.state = {
      catalogCountEnumId: 0,
      amount: 0,
      details: '',
      registrationDate: new Date(),
      catalogCountEnum: []
    }
    this.baseSate = this.state;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onSelect = this._onSelect.bind(this);

  }

  componentDidMount() {
    fetch(CCE_URL).then(res => {
      if (!res.ok) { alert('Error Fetching CatalogCountEnum') }
      res.json().then(data => {
        this.setState({ catalogCountEnum: data.catalogCountEnumList })
      });
    })
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
          });
        }

        this.setState(this.baseSate);
        this.details.value = ""
        this.amount.value = ""

        window.location.reload();

    }).catch(function(error) {
      console.log(error)
    })

    event.preventDefault();
  }

  _onSelect(event) {

    this.setState({
      catalogCountEnumId: event.value
    });
  }

  render() {
    const options = this.state.catalogCountEnum;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="grid-container">
          <div className="grid-x grid-padding-x">

            <div className="medium-3 cell">
              <label>Cantidad: </label>
              <input type="text" name="amount" onChange={this.handleChange} ref={(el) => (this.amount = el)}/>
            </div>

            <div className="medium-3 cell">
              <label>Número de Cuenta:</label>
              <Dropdown options={options} onChange={this._onSelect} placeholder="--" />
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
              <textarea 
                placeholder="Descripción" name="details" onChange={this.handleChange} 
                ref={(el) => (this.details = el)}></textarea>
            </div>

            <button className=".submit button small expanded" href="#">Guardar!</button>

          </div>
        </div>
      </form>
    )
  }
}

export default CatalogCountForm