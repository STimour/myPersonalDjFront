import React, { useState } from "react";
import { useNavigate } from "react-router-dom";




const Connexion = () => {
  const [connexion, setConnexion] = useState({
    identifier: "",
    password: "",
  });

  const navigte = useNavigate()



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reponse = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(connexion)
      });

      const data = await reponse.json()
      if(data.user){
        navigte("/accueil")
      }else{
        console.log('error')
        setConnexion({
            identifier: "",
            password: "",
        })
      }
 
      console.log('data', data)
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = currentTarget;
    setConnexion({
      ...connexion,
      [name]: value
    });
  };


    
        return(
            <>
                <h1>My Personal DJ</h1>
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="identifier">Login</label>
                    <input 
                        type="text" 
                        id="identifier" 
                        name="identifier"
                        onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">Mot de Passe</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        onChange={handleChange}/>
                </div>
                
                <button>Connexion</button>
                </form>
                <p>Besoin d'un compte?</p>
                <a href="#">Inscrivez-vous</a>      
            </>
        )
 
}

export default Connexion