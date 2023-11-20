import { ChangeEvent, useEffect, useState} from "react"
import { useNavigate } from 'react-router-dom';

interface IChanteur{
    id: number
    attributes:{
        Nom: string,
        Prenom: string,
        DateDeNaissance: string
    }

}

let msgErr = ""

const AddM = () =>{
const [chanteurs, setChanteurs] = useState<IChanteur[]>([])

const [titre, setTitre] = useState("")
const [lienYoutube, setLienYoutube] = useState("")
const [chanteur, setChanteur] = useState("")
const [favoris, setFavoris] = useState<boolean>(false)
const [dateDeSortie, setDateDeSorie] = useState("")
const [couleur, setCouleur] = useState("")


const navigate = useNavigate();



const handleChangeTitre = (e: ChangeEvent<HTMLInputElement>) => {
    setTitre(e.target.value);
  };

  const handleChangeLienYoutube = (e: ChangeEvent<HTMLInputElement>) => {
    setLienYoutube(e.target.value);
  };


  const handleChangeChanteur = (e: ChangeEvent<HTMLSelectElement>) => {
    setChanteur(e.target.value)
    
  };

  const handleChangeDateDeSortie = (e: ChangeEvent<HTMLInputElement>) => {
    setDateDeSorie(e.target.value);
  };

  const handleChangeCouleur = (e: ChangeEvent<HTMLInputElement>) => {
    setCouleur(e.target.value);
  };

  const handleChangeFavoris = (e: ChangeEvent<HTMLInputElement>) => {
    setFavoris(e.target.checked);
  };

useEffect(()=>{
    const fetchData = async () =>{
        try{
            const responseChanteur = await fetch('http://localhost:1337/api/chanteurs')
            const chanteursData = await responseChanteur.json()
            const chanteurData: IChanteur[] = chanteursData.data
            setChanteurs(chanteurData)
        }catch (error){
            console.error('Erreur lors de la requête API : ', error);
        }
    }
    fetchData();
}, [])

const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()
    const formData = {
        data: {
            Titre: titre,
            lienYoutube: lienYoutube,
            chanteur: chanteur,
            DateDeSortie: dateDeSortie,
            Couleur: couleur,
            Favoris: favoris
        }
      };
    const enregistrement = await fetch("http://localhost:1337/api/musiques", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",    
        },
        body: JSON.stringify(formData) 
    })
    if(enregistrement.ok){
        navigate("/accueil")
    }else{
        msgErr = "L'ajout du nouveau morceau n'a pas marché"
    }
}

    return(
        <div style={{width: "100vw"}}>
            <nav style={{width: "90vw", margin: "auto", display: "flex", justifyContent: "flex-end"}}> 
                <button style={{fontSize: "1.5rem"}} onClick={() => navigate(-1)}>Revenir</button>
            </nav>
            <h1 style={{textAlign: "center"}}>Ajouter une Musique</h1>
            <h2>{msgErr}</h2>
            <div>
                <form style={{display: "flex", flexDirection: "column", padding: "40px"}}>
                    
                        <label htmlFor="Titre">Titre</label>
                        <input style={{padding: "10px"}} 
                               type="text" 
                               id="Titre"
                               name="Titre"
                               onChange={handleChangeTitre}/>
                        <div>
                        <label htmlFor="Favoris">Mettre dans le favoris ?</label>
                        <input
                            type="checkbox"
                            id="Favoris"
                            name="Favoris"
                            checked={favoris}
                            onChange={handleChangeFavoris}
                          />
                        </div>
                    
                        <label htmlFor="lienYoutube">Lien Youtube</label>
                        <input style={{padding: "10px"}} 
                               type="text" 
                               id="lienYoutube"
                               name="lienYoutube"
                               onChange={handleChangeLienYoutube}/>
                    
                    
                    
                        <label htmlFor="chanteur">Interprété par</label>
                        <select style={{padding: "10px"}} 
                            name="chanteur" 
                            id="chanteur"
                            onChange={handleChangeChanteur}>
                            <option value="">N'est pas dans la liste</option>
                            {chanteurs.map((chanteur, index) =>(
                            <option key={index} value={chanteur.id}>{chanteur.attributes.Nom} {chanteur.attributes.Prenom}
                            </option>
                            ))}
                        </select>
                    
                        <label htmlFor="DateDeSortie">Date de sorti</label>
                        <input style={{padding: "10px"}} 
                            type="date" 
                            name="DateDeSortie"
                            id="DateDeSortie"
                            onChange={handleChangeDateDeSortie}/>

                        <label htmlFor="Couleur">Couleur du Carré</label>
                        <input 
                               type="color" 
                               id="Couleur"
                               name="Couleur"
                               onChange={handleChangeCouleur}/>
                    
                    <button style={{marginTop: "20px"}} onClick={handleSubmit}>Ajouter</button>
                </form>
        
            </div>
        </div>
    )
}

export default AddM