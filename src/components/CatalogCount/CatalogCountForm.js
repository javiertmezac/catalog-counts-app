import React from 'react'
// import CatalogCount from '.';
import { Post } from './CatalogCountHook'

class CatalogCountForm extends React.Component {
  constructor() {
    super();
    this.state = {
      catalogCountEnumId: 0,
      amount: 0,
      details: ''
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
    fetch("http://localhost:8888/api/v1/catalog-count", {
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
      
        <label>Amount</label>
        <input type="text" name="amount" onChange={this.handleChange} />
        
        <label>Details</label>
        <input type="textarea" name="details" onChange={this.handleChange} />

        <label>Enum:
          <input type="text" name="catalogCountEnumId" onChange={this.handleChange} />
        </label>

        <input type="submit" value="Submit" />
    </form>
    )
  }
}

export default CatalogCountForm