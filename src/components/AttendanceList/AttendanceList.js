import React from 'react';
import { config } from '../../Constans';
import PersonaForm from '../AttendanceList/PersonaForm'

const SERVICE_URL = config.url.BASE_API_URL.concat("/service/");

class AttendanceList extends React.Component {
  constructor() {
    super()

    this.state = {
      isNotSunday: true,
      fetchingData: true,
      serviceId: 0,
      currentDate: new Date(),
      members: []
    }
  }

  onUpdateItem = (event, i) => {

    const newCheckedValue = event.target.checked;

    this.setState(state => {
      const members = state.members.map((item, j) => {
        if (j === i) {
          item.attended = newCheckedValue;
          return item;
        } else {
          return item;
        }
      });
      return  {
        members
      }
    });
  }

  onSubmit = () => {
    var url = SERVICE_URL.concat(this.state.serviceId ).concat("/attendance");
    var bodyPayload = {
      "attendanceList" : this.state.members
    }
    fetch(url, {
      method: 'PUT',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(bodyPayload)
    }).then( response =>  {
      console.log(response)
      // alert("Cambios Guardados!")
      //todo: consider having a "green status bar (notification)" that fades after 2s?
    }).catch(error => {
      console.log(error)
    })
  }

  onSubmitService = () => {
    //todo: detect localDate
    var formatDate = this.state.currentDate.toLocaleDateString("en-CA");
    var servicePayload = {
      date : formatDate
    }

    fetch(SERVICE_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(servicePayload)
    }).then(res => {
      if (res.ok) {
        console.log(res);
        res.json().then(data => {

          this.setState({serviceId: data.id })
          this.getAttendanceList();

        });
      } else {
        console.log(res);
      }
    })
  }

  componentDidMount() {
    //Note: Sunday is 0, Monday is 1, and so on.
    var sunday = 0;
    var thursday = 4;
    var day = this.state.currentDate.getDay();

    if (day === sunday || day === thursday) {

      this.setState({ isNotSunday: false })

      // validate there is a service created for this sunday
      var formatDate = this.state.currentDate.toLocaleDateString("en-CA");
      var getServiceByDateUrl = SERVICE_URL.concat(formatDate);

      fetch(getServiceByDateUrl)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.setState({ serviceId: data.id })
              this.getAttendanceList();
            })
          } else {
            var message = "No serviceId found for date: "
              .concat(formatDate).concat("\n")
            console.log(message)
            // this.setState( { fetchingData : false })
          }
        });
    } else {
      console.log(this.state.currentDate + "is not Sunday")
    }
  }

  getAttendanceList() {
    var tempMembers = [];

    var attendanceURL = SERVICE_URL.concat(this.state.serviceId).concat("/attendance");

    fetch(attendanceURL)
      .then(response => response.json())
      .then(data => {

        data.attendanceList.forEach(element => {

          var persona = { id: '', completeName: '' }
          persona.id = element.persona.id;
          persona.completeName = element.persona.completeName;

          var attendance = { attended: false, persona: element }
          attendance.attended = element.attended;
          attendance.persona = persona;

          tempMembers.push(attendance);
        });

        this.setState({ members: tempMembers });
      });

    this.setState({ fetchingData: false })
  }

  render() {
    const notSunday = this.state.isNotSunday;
    const loading = this.state.fetchingData;
    const missingService = this.state.serviceId === 0 ? true : false;

    return (
      <div className="grid-container">
        { notSunday ?
        (
          <center><div> Esperar al dia de servicio para Generar lista de Asistencia!</div></center>
        ) :
          <div>
            { missingService ? (
              <div>
                <button
                  onClick={() => this.onSubmitService()}
                  className="button small expanded"
                  href="#">Crear nuevo Servicio!</button>
              </div>
            ) : <div>
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
              {loading ?
                (
                  <center>
                    <h4>Cargando lista Personas</h4>
                  </center>
                ) :
                (
                  <div>

                    <PersonaForm />

                    <div className="medium-6 cell">
                      <table>
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Asistencia</th>
                          </tr>
                        </thead>

                        <tbody>
                          {
                            this.state.members.map((value, index) => (
                              <tr key={value.persona.id}>
                                <td>{value.persona.completeName} </td>
                                <td>
                                  <input
                                    onChange={(event) => this.onUpdateItem(event, index)}
                                    type="checkbox"
                                    defaultChecked={value.attended}
                                    id={value.persona.id}
                                    value="second_checkbox" /> <label htmlFor="cbox2"></label>
                                </td>
                              </tr>
                            ))}
                        </tbody>

                      </table>
                    </div>
                    <div>
                      <button
                        onClick={() => this.onSubmit()}
                        className="button small expanded"
                        href="#">Guardar Asistencia!</button>
                    </div>
                  </div>
                )
              }
            </div>}
          </div>
        }
      </div>
    )
  }
}

export default AttendanceList
