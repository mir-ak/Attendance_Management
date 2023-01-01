import React from 'react';
import MaterialIcon from 'material-icons-react';
import { DiApple } from "react-icons/di";
import { DiWindows } from "react-icons/di";
import { DiLinux } from "react-icons/di";
function otherSkills() {
  return (
    <div className="otherSkills">
      <h3>Langues</h3>
      <div className="list">
        <ul className="exp1">
          <li>
            <MaterialIcon icon="g_translate" size={18} color='#2a1d52' invert />
            <strong> Anglais :</strong> niveau intermédiaire.
          </li>
          <li>
            <MaterialIcon icon="g_translate" size={18} color='#2a1d52' invert />
            <strong> Arabe :</strong> courant.
          </li>
          <li>
            <MaterialIcon icon="g_translate" size={18} color='#2a1d52' invert />
            <strong> Kabyle :</strong> langue maternelle.
          </li>
        </ul>
      </div>
      <h3>Préférence OS</h3>
      <div className="list">
        <ul className="exp2">
          <li>
            <DiLinux />
            <strong> Linux :</strong> &#x2605; &#x2605; &#x2605; &#x2605;
          </li>
          <li>
            <DiWindows />
            <strong> Windows :</strong> &#x2605; &#x2605; &#x2605; &#x2606;
          </li>
          <li>
            <DiApple />
            <strong> Mac OS :</strong> &#x2605; &#x2605; &#x2605; &#x2606;
          </li>
        </ul>
      </div>
    </div>
  )
}

export default otherSkills
