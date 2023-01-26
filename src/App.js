import './App.css'

import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/HomePage'
import Search from './pages/Search/SearchPage'
import Contact from './pages/Contact/ContactPage'
import Login from './pages/Login/LoginPage'
import Footer from './components/Footer/Footer'



function App() {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    let component
    switch (window.location.pathname) {
      case '/':
        component = <Home />
        break
      case '/search':
        component = <Search />
        break
      case '/contact':
        component = <Contact />
        break
      case '/login':
        component = <Login />
        break
      default:
        component = <Home />
        break
    }
    return (
      <>
      <Navbar />
      {component}
      <Footer />
      </>
    );
  }


  // return (
  //   <>
  //   <Navbar2 />
  //   </>
  // );

}

export default App;
