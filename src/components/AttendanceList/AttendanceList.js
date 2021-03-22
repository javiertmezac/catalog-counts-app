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
    //1st iteration
    // validate date is Sunday
    // validate there is a "service" created
    // if not : get persona
    // else: get attendance by Id

    //Note: Sunday is 0, Monday is 1, and so on.
    var sunday = 1;
    var day = this.state.currentDate.getDay();

    // var attendance = { attendanceId: '', attended: false, persona : {}}
    if (day === sunday) {
      var tempMembers = [];

      fetch("http://localhost:8888/cc-service/api/v1/persona")
        .then(response => response.json())
        .then(data => {

          data.personas.forEach(element => {
            var attendance = { attendanceId: element.id, attended: false, persona: element }
            tempMembers.push(attendance);
          });

          this.setState({ members: tempMembers });
        });

          // this.setState({ members: data.personas }));
    } 
    // else {
    //   //load from attendance

    //   // var tempMembers = [];
    //   fetch("http://localhost:8888/cc-service/api/v1/service/1/attendance")
    //   .then(response => response.json())
    //   .then(data => {

    //     console.log("DATA: "  + data)

    //     data.attendanceList.forEach(element => {

    //       var persona = { id: '', completeName: '', attended: false }
    //       persona.id = element.persona.id;
    //       persona.completeName = element.persona.completeName;
    //       persona.attended = element.attended;

    //       tempMembers.push(persona);
    //     });

    //     this.setState( { members : tempMembers });
    //   })
    // }
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
                <tr key={value.attendanceId}>
                  <td>{value.persona.completeName} </td>
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
