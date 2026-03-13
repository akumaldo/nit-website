import Header from './components/Header';
import ScrollVideo from './components/ScrollVideo';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Clients from './sections/Clients';
import Contact from './sections/Contact';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ScrollVideo />
        <About />
        <Services />
        <Clients />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}

export default App;
