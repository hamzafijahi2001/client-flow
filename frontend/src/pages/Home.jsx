import { useState,useEffect } from "react";
import api from "../api";

function Home(){
    const [clients,setClients] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    const getClient = () => {
        api.get("/api/clients/")
        .then((res) => res.data)
        .then((data)=> {setClients(data);console.log(data);})
        .catch((err)=>alert(err))
    } 
    useEffect(()=>{
        getClient();
    },[])

    const deleteClient = (id) => {
        api.post(`/api/clients/delete/${id}/`)
        .then((res)=>{
            if(res.status===204) alert("Client deleted!")
            else alert("Failed to delete client")
        }).catch((err)=> alert(err))
        getClient()
    }

    return( <div>Home</div>)
}
export default Home;