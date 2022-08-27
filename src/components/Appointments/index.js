import './index.css'

import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    ipTitle: '',
    ipDate: '',
    appointmentDetails: [],
    isFilter: false,
  }

  titleChange = event => {
    this.setState({ipTitle: event.target.value})
  }

  dateChange = event => {
    this.setState({ipDate: event.target.value})
  }

  add = event => {
    event.preventDefault()
    const {ipTitle, ipDate} = this.state
    const formattedDate = ipDate
      ? format(new Date(ipDate), 'dd MMMM yyyy, EEEE')
      : ''
    const newList = {
      id: v4(),
      isStared: false,
      title: ipTitle,
      date: formattedDate,
    }
    this.setState(prev => ({
      appointmentDetails: [...prev.appointmentDetails, newList],
      ipTitle: '',
      ipDate: '',
    }))
  }

  starChange = id => {
    this.setState(prev => ({
      appointmentDetails: prev.appointmentDetails.map(each => {
        if (each.id === id) {
          return {...each, isStared: !each.isStared}
        }
        return each
      }),
    }))
  }

  staredBtn = () => {
    this.setState(prev => ({isFilter: !prev.isFilter}))
  }

  render() {
    const {ipTitle, ipDate, isFilter, appointmentDetails} = this.state
    const filtredList =
      isFilter === true
        ? appointmentDetails.filter(each => each.isStared === true)
        : appointmentDetails
    return (
      <div className="bg-container">
        <div className="card">
          <h1 className="heading">Add Appointment</h1>
          <div className="sub-card">
            <div className="sub-1">
              <form onSubmit={this.add}>
                <div className="title-div">
                  <label htmlFor="title" className="label">
                    TITLE
                  </label>
                  <input
                    value={ipTitle}
                    className="input"
                    id="title"
                    type="text"
                    placeholder="Title"
                    onChange={this.titleChange}
                  />
                </div>
                <div className="date-div">
                  <label htmlFor="date" className="label">
                    DATE
                  </label>
                  <input
                    value={ipDate}
                    className="input"
                    id="date"
                    type="date"
                    onChange={this.dateChange}
                  />
                </div>
                <button className="sub-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              className="appointments-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
            />
          </div>
          <hr />
          <div className="appoint-div">
            <h1 className="h2">Appointments</h1>
            <button className="star-btn" type="button" onClick={this.staredBtn}>
              Starred
            </button>
          </div>
          <ul className="app-ul">
            {filtredList.map(each => (
              <AppointmentItem
                key={each.id}
                appointmentDetailsList={each}
                starChange={this.starChange}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
