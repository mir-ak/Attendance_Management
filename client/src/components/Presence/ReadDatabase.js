import { useEffect , useState} from 'react';
import databaseApp from '../../config/firebaseConfig';
import {ref,onValue,remove,child} from "firebase/database";
import MaterialIcon from 'material-icons-react';
import IconButton from '@mui/material/IconButton';
export default function ExperClass (){
    
    const [db_list,setDb_list] = useState([]);
    const init_db = () =>{
        onValue(ref(databaseApp, 'formation'), (snapshot)=>{
          let previousList = snapshot.val();
          let list = [];
          for(let id in previousList){
            list.push({id,...previousList[id]});
          }
          setDb_list(list);
          
        })
    }
    useEffect(()=>{
        init_db()
    },[]);   
    const deletdata= (id) =>{
        //const New_dbs = db_list.slice();
        //console.log("ici",id);
        //const index = New_dbs.findIndex((New_db)=>{return New_db.id === id});
        //console.log(index)
        remove(child(ref(databaseApp), 'formation/'+id));   
    }
    /* const updatedata= (id) =>{
        //const New_dbs = db_list.slice();
        //console.log("ici",id);
        //const index = New_dbs.findIndex((New_db)=>{return New_db.id === id});
        //console.log(index) 
        set(child(ref(databaseApp), 'formation/'+id),{
            date:Date,
            formation:Formation,
            ecole:Ecole
        });   
    }*/
    return(
        db_list &&
        db_list.map((item) => {
            return(
                <div key={item.id}> 
                <h4> 
                    {item.date} {item.formation} &nbsp;
                    <IconButton onClick={deletdata.bind(this,item.id)}>
                        <MaterialIcon icon="delete_sweep" size={25} color="rgb(139, 0, 0)" invert /> 
                    </IconButton> 
                </h4> 
                <h5><MaterialIcon icon="school" size={18} color='#2a1d52' invert /> {item.ecole} </h5>
                
                </div>
            )
        })  
    )
}; 
