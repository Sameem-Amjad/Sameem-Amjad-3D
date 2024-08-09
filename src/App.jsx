import { BrowserRouter } from "react-router-dom";
import {  useTheme } from "./components/ThemeContext";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import { useEffect } from "react";

const App = () => {
  const { theme } = useTheme(); // Extract the theme from the context

  return (
    
      <BrowserRouter>
        <div
          className={`relative z-0 ${
            theme === "light" ? "bg-primary-light" : "bg-primary-dark"
          }`}
        >
          <div>
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      </BrowserRouter>
  );
};

export default App;
