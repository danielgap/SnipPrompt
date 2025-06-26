import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navigation/Navbar';
import { Editor, Home, Snippet, Snippets, Login, Register, AdminUsers } from './containers';
import { SnippetsContextProvider } from './store';
import { AuthProvider } from './store/AuthContext';
import { AuthGuard } from './components/Auth/AuthGuard';
import AdminGuard from './components/Auth/AdminGuard';

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
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />

            <AuthGuard path='/editor/:id' component={Editor} />
            <AuthGuard path='/editor' component={Editor} />

            <Route path="/admin/users">
              <AdminGuard>
                <AdminUsers />
              </AdminGuard>
            </Route>
          </Switch>
        </SnippetsContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
