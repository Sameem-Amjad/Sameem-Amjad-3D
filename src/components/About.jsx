import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";


const ServiceCard = ({ index, title, icon,theme }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className={`${theme==='light'?'bg-tertiary':''} rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col`}
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const { theme } = useTheme();
  return (
    <>
      <motion.div variants={textVariant()}>
        <p
          className={`${styles.sectionSubText} 
        ${theme === "light" ? "text-[#3c1f7b]" : " text-[#915EFF]"}`}
        >
          Introduction
        </p>
        <h2
          className={`${styles.sectionHeadText} ${
            theme === "light" ? "text-text-light" : " text-white"
          }`}
        >
          Overview.
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className={`mt-4 text-[17px] max-w-3xl leading-[30px]
          ${theme === "light" ? "text-[#3c1f7b]" : " text-secondary"}`}
      >
        I am an accomplished software developer with extensive experience in
        TypeScript and JavaScript, and a strong proficiency in frameworks such
        as React, Node.js, and Three.js. With a track record of successfully
        completing over 100 projects, I excel in delivering efficient, scalable,
        and user-centric solutions. My rapid learning ability and collaborative
        approach enable me to work closely with clients to effectively address
        real-world challenges and bring their ideas to fruition.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            {...service}
            theme={theme}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
