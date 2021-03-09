import React from 'react';


class AttendanceList extends React.Component {
  constructor() {
    super()

    this.state = {
      currentDate: new Date(),
      members: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:8888/cc-service/api/v1/personas")
      .then(response => response.json())
      .then(data => this.setState({members : data.personas}));
  }

  render() {
    return (
      <div>
        <center>
          <h1>Lista de Asistencia!</h1>

          <h3>
            {new Intl.DateTimeFormat("es", {
              year: "numeric",
              month: "short",
              day: "2-digit"
            }).format(this.state.currentDate)}
          </h3>

        </center>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Asistencia</th>
            </tr>
          </thead>

          <tbody>
            {this.state.members.map((value) => (
              <tr key={value.id}>
                <td>{ value.completeName } </td>
                <td>
                  { 'some :' + value.attended}
                  <input type="checkbox" defaultChecked={value.attended} id="cbox2" value="second_checkbox" /> <label htmlFor="cbox2">Este es mi segundo checkbox</label>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    )
  }
}

export default AttendanceList
