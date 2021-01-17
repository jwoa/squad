import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import UserListPage from './pages/UserListPage'
import UserEditPage from './pages/UserEditPage'
import ProjectListPage from './pages/ProjectListPage'
import ProjectEditPage from './pages/ProjectEditPage'

const App = () => {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/project/:id' component={ProjectPage} />
          <Route path='/admin/userlist' component={UserListPage} />
          <Route path='/admin/user/:id/edit' component={UserEditPage} />
          <Route path='/admin/projectlist' component={ProjectListPage} exact />
          <Route path='/admin/projectlist/:pageNumber' component={ProjectListPage}  exact/>
          <Route path='/admin/project/:id/edit' component={ProjectEditPage} />
          <Route path='/admin/orderlist' component={OrderListPage} />
          <Route path='/search/:keyword' component={HomePage} exact/>
          <Route path='/page/:pageNumber' component={HomePage} />
          <Route path='/search/:keyword/page/:pageNumber' component={HomePage} />
          <Route path='/' component={HomePage} exact />
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
