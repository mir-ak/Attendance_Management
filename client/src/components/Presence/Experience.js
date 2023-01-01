import React,{ Component } from 'react';
import MaterialIcon from 'material-icons-react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import databaseApp from '../../config/firebaseConfig';
import {ref, push } from "firebase/database";
import ExperClass from './ReadDatabase';
export default class experience extends Component {
  state = {
    date: "",
		formation: "",
    ecole: "",
    showInfos: false,
    db_list:[]
  }
  cancelCourse =  () => { 
    this.setState({date: "" }); 
    this.setState({formation: "" });
    this.setState({ecole: "" }); 
  }
  handleInfo = () => {
    this.setState({
      showInfos: !this.state.showInfos
    })
  }
  /*  */
  addItem = () => {
    // pour database de realtime
    if(this.state.date ==="" || this.state.formation==="" || this.state.ecole===""){
      alert("Veuillez remplir tous les champs ! ")
    }
    else{
      push(ref(databaseApp, 'formation'),{
        date:this.state.date,
        formation:this.state.formation,
        ecole:this.state.ecole,
      })
    }
    this.handleInfo();
  }; 
  handleInfoshow=()=>{
    return(
      
      this.state.showInfos && (
        <div className="showInfos">
          <div className="infosContent">
            <div className="head">
            <Container  component="main" maxWidth="xs" style={{margin:'10% auto'}}>
              <form  noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="début et fin d'année *"
                  type="text"
                  value={this.state.date}
                  onChange={event => this.setState({date: event.currentTarget.value})}    
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  type="text"
                  label="Formation"
                  value={this.state.formation}
                  onChange={event => this.setState({formation: event.currentTarget.value})}                                  
                />
                <TextField 
                  variant="outlined"
                  margin="normal"
                  required   
                  type="text"             
                  label="Ecole"
                  value={this.state.ecole}
                  onChange={event => this.setState({ecole: event.currentTarget.value})}                                  
                />
              </form>
            </Container>
              <div className="sourceCode">
              <div className="buttonX return2" onClick={this.handleInfo}>
                <MaterialIcon icon="highlight_off" size={25} color='#4FEDD2' invert />
              </div>
              </div>
            </div>
            <div className="button return" onClick={this.addItem}>
              valider
            </div>
          </div>
        </div>
        )
    )
  }
  render() {
    return (
      <div className="experience">
        <h3>Formations <span className="infos" onClick={this.handleInfo}>
            <MaterialIcon icon="add_circle" size={25} color='#4FEDD2' invert /></span> </h3>
        <div className="exp1">
          <this.handleInfoshow/>
          <ExperClass/>
        </div>
        <div className="exp2">
          <h3>Expériences Professionnelles</h3>
          <h4>2020-2021 Alternant en tant que développeur Pc soft chez Buffalo grill </h4>
          <h5><MaterialIcon icon="location_on" size={18} color='#2a1d52' invert /> Montrouge</h5>
          <h4>2017-2020 Employé commercial chez Franprix </h4>
          <h5><MaterialIcon icon="location_on" size={18} color='#2a1d52' invert /> Paris 9 ème.</h5>
          <h4>2013-2015 Job d'été au cybercafé en Maintenance Informatique et réseau</h4>
          <h5><MaterialIcon icon="location_on" size={18} color='#2a1d52' invert /> Algerie</h5>
        </div>
      </div>
    )
  }
}

