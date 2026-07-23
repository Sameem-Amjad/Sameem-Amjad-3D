import { PageTransition } from "../components/fx";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Stats from "../components/Stats";
import About from "../components/About";
import Works from "../components/Works";
import Process from "../components/Process";
import Contact from "../components/Contact";

const Home = () => (
  <PageTransition>
    <Hero />
    <Marquee />
    <Stats />
    <About />
    <Works />
    <Process />
    <Contact />
  </PageTransition>
);

export default Home;
