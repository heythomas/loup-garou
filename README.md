# Loup Garou

Ce code reprend le jeu du loup garou pour la dernière séance de cours avec les L2 de l'UGA.

## Déroulement de la séance

- Etant donné que le serveur Discord principal n'a pas de salon pour React, je vous invite sur un [autre serveur](https://discord.gg/qk3TzeV).
- Je suis également disponible toute la journée sur skype -- mon identifiant est pl.guhur.
- Pendant la séance, nous allons travailler sur Material UI et Styled components
- Puis un TP noté va reprendre l'ensemble des notions vues en cours.
- Pensez à cloner ce repo et à répondre aux questions en modifiant directement ce README.

## Sass

Au cas où vous avez un trou de mémoire sur Sass, voici un [rappel de la syntaxe](https://devhints.io/sass).

## Material UI

Je vous invite à regarder la vidéo de [Human Talks Paris](https://www.youtube.com/watch?v=D3tB_DGgICE).


Quelques petites questions :

- Résumer en une phrase l'intérêt de Material UI
Designer rapidement en utilisant le design de google qui est abouti, cela évite de repartir de zéro pour faire chaque bouton etc...
- Comment importer `material-ui` dans un fichier ?
`import nom_component from '@material-ui/core/nom_component'`
- Comment une application peut utiliser un thème à travers l'ensemble d'un projet ?
Grace à `MUI theme provider` qui va encapsuler tout le contenu (en prenant en paramètre un objet theme fait par nous même)
- A quoi sert `createMuiTheme` ?
Il va servir à personnaliser les composants de Material UI pour `MuiThemeProvider`
- A quoi correspond `palette` ?
Palette va servir à créer des sortes de variables de couleur réutilisables en paramètre sur des éléments render (ex: color="red")
- Comment re-définir des propriétés ?
Dans `overrides: {}` on va pouvoir écraser les propriétés de button par exemple overrides: `{MuiButton: {root: {On customise ici}}}`
- A quoi vous fait penser `withStyle` ? Comment l'utiliser ?
C'est du css, on l'utilise avec les props
- Reproduire les deux boutons rouge et bleu présentées dans la vidéo.

`
import React, { Component } from "react";

import { MuiThemeProvider, createMuiTheme, withStyles } from"@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { blue } from "@material-ui/core/colors";

class App extends Component {
  render() {
    return(
      <MuiThemeProvider theme={theme}>
        <div>
          <Button className={this.props.classes.myLeftButton}>Bonjour</Button>
          <Button>Drop Database !!</Button>
        </div>
      </MuiThemeProvider>
    )
  }
}

const styles = {
  myLeftButton: {
    backgroundColor: "blue"
  }
}

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    fontSize: 15,
    fontFamily: "Arial"
  },
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: "red",
        "&:hover": { backgroundColor: "yellow" }
      }
    }
  }
});

export default withStyles(styles)(App)
`

## Styled Components

De la même manière, voici une [vidéo](https://www.youtube.com/watch?v=mS0UKNBh-Ig) pour introduire le sujet.

Quelques petites questions :

- Qu'est-ce que le CSS-in-JS ?
Le css in js permet de faciliter l'écriture du css, avec une syntaxe plus claire, l'utilisation de variables, des calculs, rien de plus n'est faisable.
Cela permet de gerer plus facilement les selecteurs via des classes dynamiques, d'utiliser des components, d'utiliser des scopes pour retourner les components.
Cela permet par la même d'éviter des problèmes comme l'effet de bord
- Qu'est-ce que sont les tagged templates (délimitées par des backticks) ?

C'est un bon moyen d'écrire des propriétés plus facilement

- Donner un exemple d'un bouton personnalisé avec et sans les tagged templates ?

- Je n'ai pas testé mais je donne l'idée globale

- Avec styled components
import styled from 'styled-components'

function customStyle(props) {
  return `
    background-color: ${props.disabled ? 'chartreuse' : 'blue'};
    cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
  `
}

const Button1 = styled.button`
  color: green;
  
  ${customStyle};
`

- Sans Style components
en css
.myButton{
    color:green;
}

.disabled{
    background-color:chartreuse;
    cursor:not-allowed;
}

.enabled{
    background-color:blue;
    cursor:pointer;
}

en js
function isEnabled(props) {
  return(
    props.disabled ? disabled : enabled;
  )
}

render(){
    return(
        <Button className={isEnabled()} />
    )
}

- Comment utilise-t-on les props dans cette librarie ?

Les props servent en quelque sorte de transporteurs du styledcomponent au DOM

- Reprendre l'exemple du Material UI avec styled-components; l'écrire avec la composition et avec l'héritage.

Fait avec la composition :

`
import React from 'react';
import styled from 'styled-components'

const style = \`
background-color:blue;
\`

const ButtonBlue = styled.button\`
  ${style}
\`

const ButtonRed = styled.button\`
${style}

background-color: red
\`

function App(props){
  return (
    <div>
      <ButtonBlue>Hello</ButtonBlue>
      <ButtonGreen>World !</ButtonGreen>
    </div>
  );
}

export default (App);
`


Fait avec l'héritage :

`
import React from 'react';
import styled from 'styled-components'

const ButtonBlue = styled.button\`
border:3px solid red;
border-radius:10px;

  background-color: blue;
\`

const ButtonGreen = styled(ButtonBlue)\`
background-color: green
\`

function App(props) {
  return (
    <div>
      <ButtonBlue>Hello</ButtonBlue>
      <ButtonGreen>World !</ButtonGreen>
    </div>
  );
}


export default (App);
`

- Quelles sont les fonctions du contexte de styled-components ?

Ce contexte permet de créer et gérer un thème (= ensemble de components)


## Mise en place du design

Pour mettre en pratique ces notions, je vous propose de designer une application reprenant le principe de jeu du loup garou.

Cette plateforme est entièrement numérique, ce qui permet de s'affranchir d'un maître du jeu, et donc d'avoir un joueur supplémentaire.

A l'initialisation de la partie, un joueur démarre une partie. Un court identifiant est alors communiqué aux autres joueurs, qui doivent rejoindre la partie.
Lorsque tous les joueurs ont rejoint la partie, la partie peut démarrer. Chaque joueur joue à tour de rôle depuis son téléphone.

Une contrainte importante est la synchronisation des joueurs : chaque joueur utilise son propre téléphone. Il reçoit un message lorsque c'est à son tour de jouer, ou attend autrement. Pour résoudre techniquement cette contrainte, tout en évitant d'écrire une application en backend, on utilise Firebase. Firebase permet d'utiliser des observateurs, qui réagissent lors d'un appel extérieur, ce qui donne une impression de temps réel.

Une partie du code vous est fournie, afin de faciliter la mise en place de Firebase et des context providers. Il vous est demandé d'explorer le code, d'y apporter un design responsive, et de compléter l'application pour ajouter les différentes étapes de jeu.

Copier .env dans .env.local et remplir de dernier à l'aide de ses identifiants Firebase.
Activer l'authentification anonyme dans la console de Firebase.

### Découverte du code

- Le code utilise des fonctions plutôt que des classes. Ecrire un bouton sous la forme d'une classe et d'une fonction. Retrouver les équivalences entre les méthodes des composants (telles que setState) et celles des fonctions ?

Le bouton sous forme de classe :
`
class Button extends React.component{
  render{
    const {onClick, children} = this.props;
    return(
      <button onClick={onClick}>{children}</button>
    );
  }
}
`

Le bouton sous forme de fonction :
const Button = (props) => {
  const {onClick, children} = props;
  return(
    <button onClick={onClick}>{children</button>
  );
}

- Comment récupérer les props dans une fonction ?

avec 'const ...= (props) => {}'

- Dans `App.js`, identifier les différents producteurs de données. Retrouver leur définition. Quelles données partagent-ils à l'ensemble de l'application ?

Producer :
CodePage -> Permet d'ajouter notre nom dans l'instance de la partie en cours (rejoindre une partie en gros)
CreatePage -> Permet de créer une instance de partie
SpellPage -> Permet d'envoyer une action de sorcière, tuer, ressuciter

Page classiques :
StartPage

Consumer :
Toutes les autres pages...


- Identifier les différentes pages de l'application. Décrire à l'aide d'une phrase le rôle de chacune d'entre elles.

La start page est la page permettant de choisir entre créer une partie(page CreatePage) ou en rejoindre une autre via le code du créateur (qui est sur createpage), on renseigne aussi notre pseudo (cette page est CodePage).

End page comme son nom l'indique est la page de fin de partie qui annonce le(s) vainqueur(s)

La nightpage informe du passage du jeu en mode nuit (avec les mécaniques de jeu qui en découlent)

AlivePage retourne notre role quand on est vivant et que ce n'est pas à nous d'agir

ResultsPage retourne le résultat du vote et le joueur mort (après avoir attendu le vote de tout le monde)

SpellPage retourne des boutons pour effectuer les sorts de la sorciere si notre personnage en est une

DeadPage retourne un message indiquant la mort de notre personnage

CastPage est la page pour voter pour la mort d'un joueur

- Pourquoi voit-on sur plusieurs pages "Chargement du master game en cours" ?

Tant que la partie n'est pas commencée, Game.js va afficher ce message pour indiquer qu'il n'y a pas d'erreurs mais que la partie n'est pas lancée ni crée par nous, une fois une partie crée on a plus qu'un message, en gros 1 message car on a pas rejoind et un autre car on a pas créé de partie.

Ca fonctionne comme une sorte de try catch...

- Avec les classes, nous utilisions `withMyContext` pour s'inscrire aux données d'un provider. Identifier dans services/Game.js la fonction qui joue désormais ce rôle.

La fonction qui remplace `withMyContext` est `useGame` désormais.

- Dans `CodePage`, rappeler comment un formulaire gère les champs de remplissage des données.o

A chaque changement dans le formulaire, des variables (state) se mettent à jour (via une fonction event), quand on envoie le formulaire on récupère juste la valeur de ces variables sans charger une nouvelle page (ce qui signifierait une perte des infomations)

### Reprise du design

- En utilisant styled-components, reprendre le design du composant Button.
- Votre nouveau bouton peut alors être utilisé pour améliorer l'affichage de la page `StartPage`.
- Ajouter un header et un footer sur toutes les pages de l'application. 
- Réaliser le design du formulaire de de `CodePage`, utilisé pour rejoindre l'application.
- Faire de même avec `CreatePage`.


### Utilisation de Firebase

- Dans 'User.js', comment fait-on pour garder une trace persistente de l'application, même lorsqu'on rafraichit la page ? Comment reconnait-on l'utilisateur lorsqu'il revient dans l'application ?

On place son pseudo dans un context pour la session actuelle, deux mécanismes sont mis en place pour stocker l'information de façon pérenne, firebase va stocker dès la connexion un identifiant tout en enregistrant ce même identifiant dans les cookies de l'utilisateur, ainsi a chaque tentative de connexion, l'app va vérifier si quelque chose existe dans les cookies et si ce quelque chose correspond à une entrée dans la BDD.

- Dans Firebase, nous ne pouvons pas ajouter des champs à un utilisateur. Par conséquent, nous devons créer une collection d'utilisateurs et synchroniser les utilisateurs avec cette table. Expliquer où est-ce que cette synchronisation a lieu.

Cette synchronisation à lieu dans useUser, on teste si l'id de l'utilisateur correspond à un fichier firebase.

- A votre avis, à quoi sert useEffect ?

useEffect sert à commencer à réaliser des actions en chargeant la page en avance pendant que la requête asynchrone se fait vers firebase, ainsi l'utilisateur sera "occupé" pendant cette requête.

- A quoi sert la fonction `unsubscribe` utilisée dans les `useEffect` de `User.js` ?

`unsubscribe` permet de couper la connexion avec firebase une fois les actions réalisées afin de ne pas surcharger le réseau.

- Décrire les trois valeurs de retour de `UseUser`.
On peut avoir `error` qui donne les informations sur une erreur (si il y en a une), `loading` qui indique si des données sont encore en attente (chargement) et `user`

- Combien de collections dans Firebase pouvez-vous identifier ? A quoi correspondent les `doc` ?
On a 2 collections dans firebase `users` (les utilisateurs) et `game` (les parties).
Les docs sont des entrées dans une collection, exemple `users` est une collection et `Thomas` est un doc, c'est comme une entrée dans une table SQL en très gros.




### Contribuer à l'application

- Lors du lancement du jeu, ajouter l'attribution des rôles à chaque joueur : loup-garou, villageois, petite fille ou sorcier. Le nombre de loup-garou est calculé en fonction du nombre de joueurs.
- Chaque joueur reçoit alors une image de son rôle. Partager cette information depuis /wait.
- Lorsque la nuit tombe, la liste des joueurs encore vivants est proposée aux  loups garous, qui doivent se mettre d'accord. Réaliser cette fonction.
- Lorsque le jour arrive, tous les joueurs reçoivent une notification indiquant la cible des loups garous. Cette dernière est redirigée vers DeadPage.
- Les joueurs vivant votent pour éliminer un joueur, suspecté d'être un loup garou. Réaliser cette fonction.

### Rapport

Rédiger un court rapport -- inférieur à une page, expliquant les modifications apportées au projet. Motiver ses choix. Expliquer les difficultés rencontrées.

