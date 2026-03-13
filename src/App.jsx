import Header from './components/Header';
import CityBackground from './components/CityBackground';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import Hero from './sections/Hero';
import AIPFBanner from './sections/AIPFBanner';
import About from './sections/About';
import Services from './sections/Services';
import Clients from './sections/Clients';
import Contact from './sections/Contact';
import useGsapReveal from './hooks/useGsapReveal';

function App() {
  useGsapReveal();

  return (
    <>
      <CityBackground />
      <Header />
      <main>
        <Hero />
        <AIPFBanner />
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
