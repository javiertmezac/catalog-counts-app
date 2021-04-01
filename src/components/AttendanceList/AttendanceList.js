import React from 'react';


class AttendanceList extends React.Component {
  constructor() {
    super()

    this.state = {
      serviceId: 4,
      currentDate: new Date(),
      members: []
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    //Note: Sunday is 0, Monday is 1, and so on.
    var sunday = 3;
    var day = this.state.currentDate.getDay();

    if (day === sunday) {

      // validate there is a service created for this sunday
      var formatDate = this.state.currentDate.toLocaleDateString("en-CA");
      var getServiceByDateUrl = "http://localhost:8888/cc-service/api/v1/service/" + formatDate

      fetch(getServiceByDateUrl)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.state.setState({ serviceId: data.id })
            })
          } else {
            console.log("no serviceId found for date: " + formatDate)
          }
        });

      var tempMembers = [];
      if (this.state.serviceId === 0) {

        fetch("http://localhost:8888/cc-service/api/v1/persona")
          .then(response => response.json())
          .then(data => {

            data.personas.forEach(element => {
              var attendance = { attended: false, persona: element }
              tempMembers.push(attendance);
            });

            this.setState({ members: tempMembers });
          });
      } else {
        var attendanceURL = "http://localhost:8888/cc-service/api/v1/service/" +
        this.state.serviceId + "/attendance"
        console.log(attendanceURL)
        fetch(attendanceURL)
          .then(response => response.json())
          .then(data => {

            data.attendanceList.forEach(element => {

              var persona = { id: '', completeName: ''}
              persona.id = element.persona.id;
              persona.completeName = element.persona.completeName;

              var attendance = { attended: false, persona: element }
              attendance.attended = element.attended;
              attendance.persona = persona;

              tempMembers.push(attendance);
            });

            this.setState({ members: tempMembers });
          });
      }
    } else {
      console.log(this.state.currentDate + "is not Sunday")
    }
  }

  handleChange(event) {

    var membersIndex = event.target.id - 1;
    var member = this.state.members[membersIndex]

    console.log(member)
    this.state.setState({ [members[membersIndex].attended] : event.target.checked })
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
                <tr key={value.persona.id}>
                  <td>{value.persona.completeName} </td>
                  <td>
                    <input 
                      onChange={this.handleChange}
                      type="checkbox" 
                      defaultChecked={value.attended} 
                      id={value.persona.id} value="second_checkbox" /> <label htmlFor="cbox2"></label>
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
