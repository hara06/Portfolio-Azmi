import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Competence from "./components/Competence";
import Experience from "./components/Experience";
import Organization from "./components/Organization";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Competence />
        <Experience />
        <Organization />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}