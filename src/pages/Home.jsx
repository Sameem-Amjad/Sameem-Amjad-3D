import { PageTransition } from "../components/fx";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Works from "../components/Works";
import Stack from "../components/Stack";
import Process from "../components/Process";
import Experience from "../components/Experience";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
import Contact from "../components/Contact";

/* Order is deliberate: prove it (stats) → what I do → what I shipped →
   what I build it with → how it runs → where I've done it → who you'd
   actually be hiring → what clients said → objections → ask for the call. */
const Home = () => (
  <PageTransition>
    <Hero />
    <Marquee />
    <Stats />
    <Services />
    <Works />
    <Stack />
    <Process />
    <Experience />
    <Team />
    <Testimonials />
    <Faq />
    <Contact />
  </PageTransition>
);

export default Home;
