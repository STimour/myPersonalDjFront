import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



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
      }}>{morceaux.map((item, index) => (
        item.attributes.Favoris === true ? (
          <div
            key={index}
            style={{
              width: "200px",
              height: "200px",
              fontSize: "1rem",
              border: "1px solid white",
              overflow: "auto",
              margin: "25px",
              backgroundColor: item.attributes.Couleur
            }}
          >
            <p>Titre: {item.attributes.Titre}</p>
            {item.attributes.chanteur && item.attributes.chanteur.data && (
              <p>
                Chanteur: {item.attributes.chanteur.data.attributes.Nom}{" "}
                {item.attributes.chanteur.data.attributes.Prenom}
              </p>
            )}
            <p>
              Lien YouTube:{" "}
              <a href={item.attributes.lienYoutube}>
                {item.attributes.lienYoutube}
              </a>
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
        {morceaux.map((item, index) => (
          <div key={index} style={{
                width: "200px",
                height: "200px",
                fontSize: "1rem",
                border: "1px solid white",
                overflow: "auto",
                margin: "25px",
                backgroundColor: item.attributes.Couleur}}>
            <p>Titre: {item.attributes.Titre}</p>
            {item.attributes.chanteur && item.attributes.chanteur.data && (
              <p>
                Chanteur: {item.attributes.chanteur.data.attributes.Nom} {item.attributes.chanteur.data.attributes.Prenom}
              </p>
            )}
            <p>Lien YouTube: <a href={item.attributes.lienYoutube}>{item.attributes.lienYoutube}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accueil;
