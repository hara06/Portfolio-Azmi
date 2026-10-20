import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Competence from "./components/Competence";
import Experience from "./components/Experience";
import Organization from "./components/Organization";
import Education from "./components/Education";

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
      </main>
    </>
  );
}