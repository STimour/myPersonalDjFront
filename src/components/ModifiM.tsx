import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface IMorceau {
  id: number;
  attributes: {
    Titre: string;
    lienYoutube: string;
    Favoris: boolean;
    Couleur: string;
    DateDeSortie: string,
    chanteur?: {
      data: {
        id: number,
        attributes: {
          Nom: string;
          Prenom: string;
        };
      };
    };
  };
}

interface IChanteur{
    id: number
    attributes:{
        Nom: string,
        Prenom: string,
        DateDeNaissance: string
    }

}

let msgErr = ""

const ModifiM = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [morceau, setMorceauData] = useState<IMorceau | null>(null);
  const [chanteurs, setChanteurs] = useState<IChanteur[]>([])

  const [titre, setTitre] = useState(morceau?.attributes.Titre)
  const [lienYoutube, setLienYoutube] = useState(morceau?.attributes.lienYoutube)
  const [chanteur, setChanteur] = useState(morceau?.attributes.chanteur?.data.id)
  const [favoris, setFavoris] = useState<boolean>(morceau?.attributes.Favoris ?? false);
  const [dateDeSortie, setDateDeSorie] = useState(morceau?.attributes.DateDeSortie)
  const [couleur, setCouleur] = useState(morceau?.attributes.Couleur)





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/musiques/${id}?populate=*`);
        const mData = await response.json();
        setMorceauData(mData.data);
      } catch (error) {
        console.error('Erreur lors de la requête API : ', error);
      }
    };

    fetchData();

    const fetchChanteurdata = async () =>{
        try{
            const responseChanteur = await fetch('http://localhost:1337/api/chanteurs')
            const chanteursData = await responseChanteur.json()
            const chanteurData: IChanteur[] = chanteursData.data
            setChanteurs(chanteurData)
        }catch (error){
            console.error('Erreur lors de la requête API : ', error);
        }
    }
    fetchChanteurdata()
  }, [id]);

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

  if (!morceau) {
    // Ajoutez ici une logique pour le cas où le morceau n'est pas trouvé
    return <p>Morceau non trouvé</p>;
  }







const handleChangeTitre = (e: ChangeEvent<HTMLInputElement>) => {
    setTitre(e.target.value);
  };

  const handleChangeLienYoutube = (e: ChangeEvent<HTMLInputElement>) => {
    setLienYoutube(e.target.value);
  };


  const handleChangeChanteur = (e: ChangeEvent<HTMLSelectElement>) => {
 
    const selectedChanteurId = Number(e.target.value);
    setChanteur(selectedChanteurId);
  };
  

  const handleChangeDateDeSortie = (e: ChangeEvent<HTMLInputElement>) => {
    setDateDeSorie(e.target.value);
  };

  const handleChangeCouleur = (e: ChangeEvent<HTMLInputElement>) => {
    setCouleur(e.target.value);
  };

  const handleChangeFavoris = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Boolean(e.target.checked)
    setFavoris(selected);
  };

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()
    const formData = {
        data: {
            Titre: titre,
            lienYoutube: lienYoutube,
            chanteur: {id: chanteur},
            DateDeSortie: dateDeSortie,
            Couleur: couleur,
            Favoris: favoris
        }
      };
    const enregistrement = await fetch(`http://localhost:1337/api/musiques/${id}`, {
        method: "PUT",
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
 

  return (
    <>
     
      <p>ID: {morceau.id}</p>
      <p>Titre: {morceau.attributes.Titre}</p>
      <p>Chanteur : {morceau.attributes.chanteur?.data.id}</p>
      <p>Lien YouTube: {morceau.attributes.lienYoutube}</p>
      <p>Favoris: {morceau.attributes.Favoris ? "Oui" : "Non"}</p>
      {/* Ajoutez d'autres informations du morceau au besoin */}

      <div style={{width: "100vw"}}>
            <nav style={{width: "90vw", margin: "auto", display: "flex", justifyContent: "flex-end"}}> 
                <button style={{fontSize: "1.5rem"}} onClick={() => navigate(-1)}>Revenir</button>
            </nav>
            <h1 style={{textAlign: "center"}}>Modifier Les Informations</h1>
            <h2>{msgErr}</h2>
            <div>
                <form style={{display: "flex", flexDirection: "column", padding: "40px"}}>
                    
                        <label htmlFor="Titre">Titre</label>
                        <input style={{padding: "10px"}} 
                               type="text" 
                               id="Titre"
                               name="Titre"
                               placeholder={morceau.attributes.Titre}
                               onChange={handleChangeTitre}/>
                        
                        <label htmlFor="Favoris">Favoris ?</label>
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
                               placeholder={morceau.attributes.lienYoutube}
                               onChange={handleChangeLienYoutube}/>
                    
                    
                    
                        <label htmlFor="chanteur">Interprété par</label>
                        <select style={{padding: "10px"}} 
                            name="chanteur" 
                            id="chanteur"
                            
                            onChange={handleChangeChanteur}
                            >
                            <option value="" disabled>
                                {morceau.attributes.chanteur?.data.attributes.Nom} {morceau.attributes.chanteur?.data.attributes.Prenom}
                            </option>
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
                            value={morceau.attributes.DateDeSortie || ''} 
                            onChange={handleChangeDateDeSortie}/>

                        <label htmlFor="Couleur">Couleur du Carré</label>
                        <input 
                               type="color" 
                               id="Couleur"
                               name="Couleur"
                               value={morceau.attributes.Couleur}
                               onChange={handleChangeCouleur}/>
                    
                    <button style={{marginTop: "20px"}} onClick={handleSubmit}>Modifier</button>
                </form>
        
            </div>
        </div>


    </>
  );
};

export default ModifiM;