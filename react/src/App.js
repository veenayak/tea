import { Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import NotFound from './components/shared/NotFound';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

function App() {

  return (

    <div>
      <Navbar></Navbar>
      <Switch>
          <Route path="/" component={Home} exact />
          <Route component={NotFound} />
      </Switch>
      <Footer></Footer>

    </div>
  );
}

export default App;
