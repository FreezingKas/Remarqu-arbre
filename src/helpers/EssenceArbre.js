export default essenceData = [
    {
        id: 1,
        title: 'Chêne',
        subTitle: "Plus d'informations sur le chêne.",
        body: "Coucou je suis là !",
        photo: require('../Ressources/Images/arbre.jpg'),
    },
    {
        id: 2,
        title: "Tilleul",
        subTitle: "Plus d'information sur le tilleul.",
        body: "Ça va ?\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.",
        photo: require('../Ressources/Images/arbre.jpg'),
    },
    {
        id: 3,
        title: 'Douglas Géant',
        subTitle: "Plus d'informations sur le douglas géant.",
        body: "Moi ça va.",
        photo: require('../Ressources/Images/arbre.jpg'),
    },
    {
        id: 4,
        title: 'Chêne2',
        subTitle: "Plus d'informations sur le chêne 2.",
        body: "Salut...",
        photo: require('../Ressources/Images/arbre.jpg'),
    },
]

export function getEssenceFromDataWithSearchedText(text) {
  var essenceSearch = []
  for (var i=0; essenceData[i]; i++) {
    var essence = essenceData[i]
    if(essence.title.includes(text)) {
      essenceSearch.push(essence)
    }
  }
  return essenceSearch
}
