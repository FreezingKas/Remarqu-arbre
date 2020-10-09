# ArbreScanner

Ce dépôt est un projet de 2ème année d'IUT dont l'objectif est de pouvoir scanner des puces NFC les arbres remarquables afin des récolter des informations culturelles sur eux. L'objectif est d'avoir une map indiquant les arbres, un écran de scan NFC ainsi qu'un regroupement des arbres déjà scannés puis une fonction administateur pour gérer les puces des arbes déjà posés.

### Tester le projet avec expo :

```
git clone https://github.com/FreezingKas/ArbreScanner.git
npm install
expo start
```

## Tasks

- [x] Implémenter la navigation et les boutons associés à celle-ci
- [x] Implémenter la map de Google
- [x] Créer un historique dans une BottomSheet
- [ ] Implémenter le Scan NFC
- [ ] Implémenter l'authentification via firebase
- [ ] Implémenter la base de données des utilisateurs et des <Marker/> rn-maps via firebase afin d'avoir un historique dynamique en fonction de l'utlisateurs
- [ ] Créer le screen administrateur permettant de gérer les infos deds puces déjà posés


### Versions

Expo SDK : 38.0.8
expo-cli : 3.26.0
react-native : 0.62.2
react-native-modalize : 2.0.6
react-navigation : 4.4.0
react-native-maps : 0.27.1
react-native-modal : 11.5.6
