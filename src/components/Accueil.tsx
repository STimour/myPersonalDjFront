import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



interface IMorceau {
    id: number;
    attributes: {
        Titre: string;
        lienYoutube: string;
        Favoris: boolean;
        Couleur: string
        chanteur?: {
            data: {
                attributes: {
                    Nom: string;
                    Prenom: string;
                };
            };
        };
    };
}

const Accueil = () => {
    const [morceaux, setMorceaux] = useState<IMorceau[]>([]);
    const navigte = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMoreceau = await fetch('http://localhost:1337/api/musiques?populate=*');
        const mData = await responseMoreceau.json();

        const morceauxData: IMorceau[] = mData.data;
        setMorceaux(morceauxData);
        console.log(morceauxData);
      } catch (error) {
        console.error('Erreur lors de la requête API : ', error);
      }
    };

    fetchData();
  }, []);

  const toggleFavori = async (id: number, currentFavori: boolean) => {
    try {
    
      await fetch(`http://localhost:1337/api/musiques/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
          Favoris: !currentFavori, 
          }
        }),
      });

     
      const updatedMorceaux = morceaux.map((morceau) =>
        morceau.id === id
          ? { ...morceau, attributes: { ...morceau.attributes, Favoris: !currentFavori } }
          : morceau
      );
      setMorceaux(updatedMorceaux);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de Favoris : ", error);
    }
  };


  return (
    <div style={{width: "100vw", textAlign: "center"}}>
      <nav style={{width: "90vw", margin: "auto", display: "flex", justifyContent: "flex-end"}}> 
           <button style={{fontSize: "1.5rem"}} onClick={() => navigte("/addMusique")}>+</button>
      </nav>

    
      <h1>My Personal DJ</h1>

      <h2>Mes Favoris</h2>
      <div style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "80vw",
            margin: "auto",
            flexWrap: "wrap"
      }}>{morceaux.map((item) => (
        item.attributes.Favoris === true ? (
          
            <div
            style={{
              width: "200px",
              height: "200px",
              fontSize: "1rem",
              border: "1px solid white",
              overflow: "auto",
              margin: "25px",
              backgroundColor: item.attributes.Couleur,
              position: "relative"
            }}
          >
             <button style={{position: "absolute", left: "1px",padding: "3px" , background: "transparent"}} onClick={() => toggleFavori(item.id, item.attributes.Favoris)}><img src="./src/assets/oui.png"  /></button>
             <Link style={{color: "white", textShadow: "1px 1px 1px black"}} to={"/modifierMusique"} key={item.id}>
             <div>
              <p>Titre: {item.attributes.Titre}</p>
            {item.attributes.chanteur && item.attributes.chanteur.data && (
              <p>
                Chanteur: {item.attributes.chanteur.data.attributes.Nom}{" "}
                {item.attributes.chanteur.data.attributes.Prenom}
              </p>
            )}
            </div>
        </Link>
        <p style={{color: "white", textShadow: "1px 1px 1px black"}}>
            <span>Lien YouTube: </span>
            
              <a href={item.attributes.lienYoutube} target="_blanc">{item.attributes.lienYoutube}</a>  
             
            </p>
          </div>
        ) : null
      ))}
    </div>

      <h2>Tous Les Morceaux</h2>
      <div style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "80vw",
            margin: "auto",
            flexWrap: "wrap"
      }}>
        {morceaux.map((item) => (
          <div key={item.id} style={{
                width: "200px",
                height: "200px",
                fontSize: "1rem",
                border: "1px solid white",
                overflow: "auto",
                margin: "25px",
                backgroundColor: item.attributes.Couleur,
                position: "relative"}}>
            <button style={{position: "absolute", left: "1px",padding: "3px" , background: "transparent"}} onClick={() => toggleFavori(item.id, item.attributes.Favoris)}>{item.attributes.Favoris === true ? <img src="./src/assets/oui.png"  /> : <img src="./src/assets/non.png"  />}</button>
            <Link style={{color: "white", textShadow: "1px 1px 1px black"}} to={"/modifierMusique"} key={item.id}>
             <div>
              <p>Titre: {item.attributes.Titre}</p>
            {item.attributes.chanteur && item.attributes.chanteur.data && (
              <p>
                Chanteur: {item.attributes.chanteur.data.attributes.Nom}{" "}
                {item.attributes.chanteur.data.attributes.Prenom}
              </p>
            )}
            </div>
        </Link>
        <p style={{color: "white", textShadow: "1px 1px 1px black"}}>
            <span>Lien YouTube: </span>
            
              <a href={item.attributes.lienYoutube} target="_blanc">{item.attributes.lienYoutube}</a>  
             
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accueil;
