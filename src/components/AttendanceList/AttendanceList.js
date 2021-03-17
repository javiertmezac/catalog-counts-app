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
    fetch("http://localhost:8888/cc-service/api/v1/attendance")
      .then(response => response.json())
      .then(data => this.setState({members : data.personas}));
  }

  render() {
    return (
      <div className="grid-container">
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

        <div className="medium-6 cell">
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
                  <td>{value.completeName} </td>
                  <td>
                    <input type="checkbox" defaultChecked={value.attended} id="cbox2" value="second_checkbox" /> <label htmlFor="cbox2"></label>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
        <div>
          <button className="button small expanded" href="#">Guardar Asistencia!</button>
        </div>
      </div>
    )
  }
}

export default AttendanceList
