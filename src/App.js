import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Gallery from './pages/Gallery';
import { Guide } from './pages/Guide';
import Collections from './pages/Collections';
import ArtSticker from './pages/admin/ArtSticker';
import Profile from './pages/Profile';
import { Home } from './pages/Home';
import {Terms} from './pages/Terms';

 function App() {
  return (
      <main>
          <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/marketplace" component={Gallery} exact />
              <Route path="/doc/guide" component={Guide} />
              <Route path="/collections" component={Collections} />              
              <Route path="/admin/artstickers" component={ArtSticker} />
              <Route path="/profile" component={Profile} />
              <Route path="/doc/terms" component={Terms} />
              <Route component={Error} />
          </Switch>
      </main>
  )
}export default App;