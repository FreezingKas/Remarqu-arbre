export default data = [
    { nom: "Chêne",
      ville:"Beuvardes",
      photo: require('../Ressources/Images/arbre.jpg'),
      essence : "Chêne",
      age: 700,
      taille: 22,
      histoire: "Presque 8 mètres de circonfèrence. Il a reçu le label arbre Remarquable de France en mars 2005.",
      site: "http://www.vuduchateau.com/actu-5737-un-chn-ne-pn-donculn-de-700-ans-chez-les-dubois-d-artois.html",
      video: "",
      date:"03/01/2020",
      id: 1},

    { nom: "Arbres du parc Napoléon III",
      ville:"Vichy",
      photo: require('../Ressources/Images/arbre.jpg'),
      essence : "65 espèces différentes",
      age: 160,
      taille: 13 + " hectares",
      histoire: "Ce vaste espace vert donne un aspect original à la ville en faisant le lien entre la frange urbaine et la nature sauvage des rives de l'Allier. Aménagé par Jean-François Radoult de Lafoss, ce parc s'inspire largement des influences romantiques de la vague anglaise très en vogue à l'époque Il est dans la même veine que le Bois de Boulogne, le Bois de Vincennes, les Buttes Chaumont et le parc Montsouris à Paris. Le Parc Napoléon est la partie la plus ancienne des Parcs de l'Allier correspondant au parc Napoléon III. Il a reçu le label Arbre Remarquable de France en février 2010.",
      site: "https://www.aujardin.info/fiches/parc-napoleon-vichy.php",
      video: "",
      date:"19/03/2019",
      id: 2},

    { nom: "Caroubiers",
      ville:"Nice",
      photo: require('../Ressources/Images/arbre.jpg'),
      essence : "Caroubiers",
      age: 520,
      taille: 25,
      histoire: "Année 1621 : plantation d'un figuier dans le jardin du couvent des Capucins à Roscoff, dans le Finistère.\nAnnée 1986 : devenu un arbre vénérable âgé de 365 ans (ses longues branches horizontales, soutenues par des piliers de pierre, formaient une tonnelle de 600 mètres carrés et il produisait plus de cinq cents kilos de figues par an), son nouveau propriétaire le fit couper pour une raison qu'on ignore...\nAnnée 1500 (ou peut-être même avant) : deux caroubiers (Ceratonia siliqua L.) naissent sur les premières hauteurs de Nice.\nAnnée 2007 : devenus des arbres vénérables âgés de plus de 500 ans, enclos dans le jardin d'une très ancienne demeure, ils sont l'objet des soins attentifs de leur propriétaire actuel, comme ils le furent d'innombrables générations précédentes, dans le respect profond de ces chefs-d'oeuvre de la nature... Ils ont reçu le label Arbre Remarquable de France en juillet 2003.",
      site: "http://www.fruitiers-rares.info/articles39a44/article42-deux-caroubiers-multiseculaires-Nice-Ceratonia-siliqua.html",
      video: "",
      date:"14/02/2019",
      id: 3},

    { nom: "Chêne",
      ville:"Tombeboeuf",
      photo: require('../Ressources/Images/arbre.jpg'),
      essence : "Chêne",
      age: 350,
      taille: 25,
      histoire: "elu arbre 2019, envergure 38m, 6.3m de circonference le tronc",
      site: "https://actu.fr/nouvelle-aquitaine/tombeboeuf_47309/lot-garonne-chene-tombeboeuf-elu-arbre-lannee-france_30948043.html",
      video: "",
      date:"27/10/2018",
      id: 4},

    { nom: "Douglas géants",
      ville:"Ribeauvillé",
      photo: require('../Ressources/Images/arbre.jpg'),
      essence : "Douglas géants",
      age: 125,
      taille: 60.3,
      histoire: "La forêt domaniale de Ribeauvillé abrite un autre arbre record : le séquoia géant le plus grand d’Europe, haut de 57 mètres. Là encore, loin des 83 mètres de cette variété dans les parcs de l’ouest américain où trône l’arbre le plus haut du monde, un séquoia sempervirens de 115,55 mètres : « Certains fabriquent une écorce si épaisse que les incendies ne les menacent plus . »",
      site: "https://www.lalsace.fr/haut-rhin/2014/07/30/trois-geants-dont-deux-rois-d-europe-et-un-dechu#:~:text=Le%20plus%20haut%20s%C3%A9quoia%20d'Europe%20%C3%A0%20Ribeauvill%C3%A9&text=Les%20s%C3%A9quoias%20g%C3%A9ants%20import%C3%A9s%20dans,%2C30%20m%C3%A8tres%20de%20diam%C3%A8tre).",
      video: "",
      date:"10/04/2018",
      id: 5},

    { nom: "Tilleul",
      ville:"St Dié-des-Vosges",
      photo: require('../Ressources/Images/arbre.jpg'),
      essence : "Tilleul",
      age: 700,
      taille: 6.5,
      histoire: "circonference 5.3m a 1m du sol",
      site: "https://www.vosgesmatin.fr/edition-de-saint-die/2017/07/06/un-petit-jeune-de-700-ans-distingue#:~:text=saint%2DDi%C3%A9%2Ddes%2DVosges%20Environnement%20Un%20petit%20jeune%20de,d'%C3%AAtre%20finie%2C%20vie.",
      video: "",
      date:"10/04/2018",
      id: 6},
]
export function getArbreFromDataWithSearchedText(text) {
  var arbreSearch = []
  for (var i=0; data[i]; i++) {
    var arbre = data[i]
    if(arbre.nom.includes(text) || arbre.ville.includes(text)) {
      arbreSearch.push(arbre)
    }
  }
  return arbreSearch
}


export function getArbreDetailFromData(id) {
  return data[id]
}
