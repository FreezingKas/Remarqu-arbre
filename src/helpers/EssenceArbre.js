export default essenceData = [
    {
        title: 'Chêne',
        body: "Plus d'informations sur le chêne.",
    },
    {
        title: "Tilleul",
        body: "Plus d'information sur le tilleul.",
    },
    {
        title: 'Douglas Géant',
        body: "Plus d'informations sur le douglas géant.",
    },
    {
        title: 'Chêne2',
        body: "Plus d'informations sur le chêne 2.",
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
  console.log(essenceSearch)
  return essenceSearch
}
