import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { useTheme } from "./ThemeContext";
const Hero = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[180px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div
            className={`w-5 h-5 rounded-full  ${
              theme === "light" ? "bg-[#3c1f7b]" : " bg-[#915EFF]"
            }`}
          />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1
            className={`${styles.heroHeadText} ${
              theme === "light" ? "text-text-light" : "text-text-dark"
            }`}
          >
            Hi, I'm{" "}
            <span
              className={` ${
                theme === "light" ? "text-[#3c1f7b]" : " text-[#915EFF]"
              }`}
            >
              Sameem
            </span>
          </h1>
          <p
            className={`${styles.heroSubText} mt-2 ${
              theme === "light" ? "text-text-light" : "text-text-dark"
            }  `}
          >
            I develop 3D visuals, user <br className="sm:block hidden" />
            interfaces and web applications
          </p>
        </div>
      </div>
      <div className="hidden md:block lg:w-full lg:flex lg:justify-end">
        <div className="md:w-[50%] md:h-[80vh] hidden md:block">
          <ComputersCanvas />
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
