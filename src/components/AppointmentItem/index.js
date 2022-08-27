import './index.css'

const AppointmentItem = props => {
  const {appointmentDetailsList, starChange} = props
  const {id, isStared, title, date} = appointmentDetailsList

  const appStarClicked = () => {
    starChange(id)
  }

  return (
    <li className="app-list">
      <div className="app-card">
        <p className="app-h1">{title}</p>
        <button
          className="app-start-btn"
          type="button"
          testid="star"
          onClick={appStarClicked}
        >
          <img
            src={
              isStared === false
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
            }
            alt="star"
          />
        </button>
      </div>
      <p className="app-p">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
