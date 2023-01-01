import React from 'react';
import MaterialIcon from 'material-icons-react';
function Hobbies() {
  return (
    <div className="hobbies">
      <h3>Centres D’intérêt</h3>
      <ul>
        <li className="hobby">
          <MaterialIcon icon="settings_brightness" size={20} color='#2a1d52   ' invert />
          <span><strong>Loisirs :</strong> Montage démontage d’ordinateur Amélioration des performances. </span>
        </li>
        <li className="hobby">
          <MaterialIcon icon="hail" size={20} color='#2a1d52  ' invert />
          <span><strong>Sports :</strong> Football, Natation.</span>
        </li>icon="email"
      </ul>
    </div>
  )
}

export default Hobbies
