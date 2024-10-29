import Footer from './Footer/Footer';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';


function LayoutDefaultClient() {
  return (
    <>
      <div id="app">
        <header>
           <Header/>
        </header>


        <main>
            <Outlet/>         
        </main>

        <footer>
          <Footer/>
        </footer>
      </div>
    </>
  );
}

export default LayoutDefaultClient;
