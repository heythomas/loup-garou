import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import StartPage from './pages/StartPage'
import EndPage from './pages/EndPage'
import CreatePage from './pages/CreatePage'
import NightPage from './pages/NightPage'
import ResultsPage from './pages/ResultsPage'
import CodePage from './pages/CodePage'
import CastPage from './pages/CastPage'
import AlivePage from './pages/AlivePage'
import SpellPage from './pages/SpellPage'
import DeadPage from './pages/DeadPage'
import { MasterGameProvider } from './services/MasterGame';
import { GameProvider } from './services/Game';
import { UserProvider } from './services/User';
import Header from './components/Header';
import Footer from './components/Footer'
//sass --watch style.scss:style.css
//encapsulation possible nav{li{}a{}} au lieu de nav li {} nav a{}


function App() {
  return (
    <div>
    <Header></Header>
    <div className="body">
      <BrowserRouter>
        <UserProvider>
          <Route exact path="/" component={ StartPage } />
          <Route path="/end" component={ EndPage } />
          <Route path="/join" component={ CodePage } />

          <MasterGameProvider>
            <Route path="/create" component={ CreatePage } />
            <Route path="/night" component={ NightPage } />
            <Route path="/vote/results" component={ ResultsPage } />
          </MasterGameProvider>

          <GameProvider>
            <Route path="/vote/cast" component={ CastPage } />
            <Route path="/alive" component={ AlivePage } />
            <Route path="/dead" component={ DeadPage } />
            <Route path="/spell" component={ SpellPage } />
          </GameProvider>
        </UserProvider>
      </BrowserRouter>
      </div>
      <Footer></Footer>
      </div>
  );
}

export default App;