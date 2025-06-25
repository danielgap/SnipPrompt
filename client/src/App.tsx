import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navigation/Navbar';
import { Editor, Home, Snippet, Snippets, Login, Register } from './containers';
import { SnippetsContextProvider } from './store';
import { AuthProvider } from './store/AuthContext';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SnippetsContextProvider>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/snippets' component={Snippets} />
            <Route path='/snippet/:id' component={Snippet} />
            <Route path='/editor/:id?' component={Editor} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </SnippetsContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
