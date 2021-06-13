import React from 'react'
import { config } from '../../Constans';

const CC_URL = config.url.BASE_API_URL.concat("/persona");

class PersonaForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name : '',
      lastname: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name] : event.target.value})
    console.log(this.state)
  }

  handleSubmit(event) {
    const headers = {
      'content-type' : 'application/json'
    }

    console.log('FETCH....')
    fetch(CC_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(this.state)
    }).then(res => {
      console.log("ANY RES: ", res.status)
      if (!res.ok) {
        res.json().then(data => {
          alert('Something went wrong! \n' + data.message)
        })
      }
      window.location.reload();
    })

    event.preventDefault();
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>

          <div>
            <label>Nombre:</label>
            <input type="text" name="name" onChange={this.handleChange} />
          </div>

          <div>
            <label>Apellido:</label>
            <input type="text" name="lastname" onChange={this.handleChange} />
          </div>

          <button className=".submit button small expanded" href="#">Resgistrar nuevo!</button>
        </form>
    )
  }
}

export default PersonaForm