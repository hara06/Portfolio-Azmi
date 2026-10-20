import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Competence from "./components/Competence";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Competence />
      </main>
    </>
  );
}