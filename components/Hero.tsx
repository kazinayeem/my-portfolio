"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";

// Orbiting Circles Demo with icons
export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={40}>
        <Icons.whatsapp />
        <Icons.notion />
        <Icons.openai />
        <Icons.googleDrive />
        <Icons.gitHub />
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        <Icons.whatsapp />
        <Icons.notion />
        <Icons.openai />
        <Icons.googleDrive />
      </OrbitingCircles>
    </div>
  );
}

// Hero section
const Hero: React.FC = () => {
  const emailAddress = "nayeem2305341022@diu.edu.bd";

  return (
    <section className="min-h-[92vh] container flex flex-col md:flex-row items-center justify-center p-20">
      {/* Left → Terminal About Me */}
      <motion.div
        className="flex-1 mt-10 md:mt-0 md:mr-10 px-4 md:px-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-lg self-center m-auto">
          <Terminal>
            <TypingAnimation>&gt; whoami</TypingAnimation>
            <AnimatedSpan className="text-green-500">
              👋 Hey, I&apos;m Nayeem
            </AnimatedSpan>

            <TypingAnimation>&gt; cat about-me.txt</TypingAnimation>
            <AnimatedSpan className="text-green-500">
              🚀 Full Stack Engineer | MERN Developer
            </AnimatedSpan>
            <AnimatedSpan className="text-green-500">
              🤖 AI & ML Enthusiast
            </AnimatedSpan>
            <AnimatedSpan className="text-green-500">
              🎓 SWE Student @ DIU
            </AnimatedSpan>

            <TypingAnimation>&gt; skills --list</TypingAnimation>
            <AnimatedSpan className="text-blue-400">
              ✔ JavaScript / TypeScript
            </AnimatedSpan>
            <AnimatedSpan className="text-blue-400">
              ✔ React / Next.js
            </AnimatedSpan>
            <AnimatedSpan className="text-blue-400">
              ✔ Node.js / Express
            </AnimatedSpan>
            <AnimatedSpan className="text-blue-400">
              ✔ MongoDB / SQL
            </AnimatedSpan>
            <AnimatedSpan className="text-blue-400">
              ✔ Docker / AWS (learning DevOps)
            </AnimatedSpan>

            <TypingAnimation className="text-muted-foreground">
              ✅ Always learning. Always building.
            </TypingAnimation>
          </Terminal>

          {/* Social buttons under terminal */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#contact"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-full flex items-center gap-2 transition transform hover:scale-105"
            >
              Let&apos;s Connect <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${emailAddress}`}
              className="p-3 rounded-full border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-green-500 hover:border-green-500 transition"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/kazinayeem"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-green-500 hover:border-green-500 transition"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/mohammad-alinayeem"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-green-500 hover:border-green-500 transition"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Right → OrbitingCircles */}
      {/* <motion.div
        className="flex-1 mt-10 md:mt-0 md:ml-10 px-4 md:px-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <OrbitingCirclesDemo />
      </motion.div> */}
    </section>
  );
};

export default function App() {
  return <Hero />;
}

// Your icons (I kept them short for clarity)
const Icons = {
  gitHub: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <linearGradient
        id="SVGID_1__D5XsEXNbhkMI_gr1"
        x1="37.087"
        x2="10.76"
        y1="10.967"
        y2="37.294"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#6560fe"></stop>
        <stop offset=".033" stop-color="#6f6afe"></stop>
        <stop offset=".197" stop-color="#9a97fe"></stop>
        <stop offset=".362" stop-color="#bfbdff"></stop>
        <stop offset=".525" stop-color="#dbdaff"></stop>
        <stop offset=".687" stop-color="#efeeff"></stop>
        <stop offset=".846" stop-color="#fbfbff"></stop>
        <stop offset="1" stop-color="#fff"></stop>
      </linearGradient>
      <circle
        cx="23.924"
        cy="24.13"
        r="18.615"
        fill="url(#SVGID_1__D5XsEXNbhkMI_gr1)"
      ></circle>
      <path
        fill="none"
        stroke="#8251fe"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M35.054,38.836C31.97,41.137,28.144,42.5,24,42.5C13.783,42.5,5.5,34.217,5.5,24	c0-2.917,0.675-5.676,1.878-8.13"
      ></path>
      <path
        fill="none"
        stroke="#8251fe"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M13.869,8.518C16.779,6.61,20.26,5.5,24,5.5c10.217,0,18.5,8.283,18.5,18.5c0,2.941-0.686,5.721-1.907,8.19"
      ></path>
      <path
        fill="#8251fe"
        d="M34,23c0-1.574-0.576-3.038-1.558-4.275c0.442-1.368,0.93-3.771-0.242-5.648c-2.251,0-3.73,1.545-4.436,2.514	C26.602,15.213,25.333,15,24,15s-2.602,0.213-3.764,0.591c-0.706-0.969-2.184-2.514-4.436-2.514c-1.328,2.126-0.526,4.45-0.073,5.43	C14.638,19.788,14,21.334,14,23c0,3.78,3.281,6.94,7.686,7.776c-1.309,0.673-2.287,1.896-2.587,3.38h-1.315	c-1.297,0-1.801-0.526-2.502-1.415c-0.692-0.889-1.437-1.488-2.331-1.736c-0.482-0.051-0.806,0.316-0.386,0.641	c1.419,0.966,1.516,2.548,2.085,3.583C15.168,36.161,16.229,37,17.429,37H19v5.942h10v-7.806c0-1.908-1.098-3.544-2.686-4.36	C30.719,29.94,34,26.78,34,23z"
      ></path>
    </svg>
  ),
  notion: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 64 64"
    >
      <linearGradient
        id="BVfSkcHaucNDvMxtSzwJza_uLDrtp8o8zTG_gr1"
        x1="27"
        x2="27"
        y1="11.043"
        y2="14.639"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#6dc7ff"></stop>
        <stop offset="1" stop-color="#e6abff"></stop>
      </linearGradient>
      <circle
        cx="27"
        cy="13"
        r="2"
        fill="url(#BVfSkcHaucNDvMxtSzwJza_uLDrtp8o8zTG_gr1)"
      ></circle>
      <linearGradient
        id="BVfSkcHaucNDvMxtSzwJzb_uLDrtp8o8zTG_gr2"
        x1="37"
        x2="37"
        y1="49.128"
        y2="52.83"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#6dc7ff"></stop>
        <stop offset="1" stop-color="#e6abff"></stop>
      </linearGradient>
      <circle
        cx="37"
        cy="51"
        r="2"
        fill="url(#BVfSkcHaucNDvMxtSzwJzb_uLDrtp8o8zTG_gr2)"
      ></circle>
      <linearGradient
        id="BVfSkcHaucNDvMxtSzwJzc_uLDrtp8o8zTG_gr3"
        x1="32"
        x2="32"
        y1="6.66"
        y2="56.873"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#1a6dff"></stop>
        <stop offset="1" stop-color="#c822ff"></stop>
      </linearGradient>
      <path
        fill="url(#BVfSkcHaucNDvMxtSzwJzc_uLDrtp8o8zTG_gr3)"
        d="M51,21h-7v-8c0-3.859-3.14-7-7-7H27c-3.86,0-7,3.141-7,7v8h-7c-3.86,0-7,3.141-7,7v8	c0,3.859,3.14,7,7,7h7v8c0,3.859,3.14,7,7,7h10c3.86,0,7-3.141,7-7v-8h7c3.86,0,7-3.141,7-7v-8C58,24.141,54.86,21,51,21z M13,41	c-2.757,0-5-2.243-5-5v-5h7v-2H8v-1c0-0.342,0.035-0.677,0.101-1H23v-2H9.026c0.914-1.207,2.348-2,3.974-2h16v-2h-7v-8	c0-2.757,2.243-5,5-5h10c2.757,0,5,2.243,5,5v15c0,1.654-1.346,3-3,3h-5.489h-3.021H25c-2.757,0-5,2.243-5,5v5H13z M51,41H35v2h7v8	c0,2.757-2.243,5-5,5H27c-2.757,0-5-2.243-5-5V36c0-1.654,1.346-3,3-3h5.489h3.021H39c2.757,0,5-2.243,5-5v-5h7c2.757,0,5,2.243,5,5	v5h-7v2h7v1c0,0.342-0.035,0.677-0.101,1H41v2h13.974C54.061,40.207,52.627,41,51,41z"
      ></path>
    </svg>
  ),
  openai: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 64 64"
    >
      <linearGradient
        id="LQd3PK_1N6yKkSdj1YnVda_laVIsJnTtYoj_gr1"
        x1="31.937"
        x2="31.937"
        y1="61"
        y2="7.125"
        gradientTransform="matrix(1 0 0 -1 0 66)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#1a6dff"></stop>
        <stop offset="1" stop-color="#c822ff"></stop>
      </linearGradient>
      <path
        fill="url(#LQd3PK_1N6yKkSdj1YnVda_laVIsJnTtYoj_gr1)"
        d="M31.875,58.875c-0.092,0-0.183-0.013-0.271-0.037l-18.625-5.25 c-0.398-0.113-0.687-0.46-0.725-0.872L8.004,6.091c-0.025-0.28,0.068-0.558,0.258-0.765C8.451,5.118,8.719,5,9,5h45.875 c0.28,0,0.547,0.117,0.736,0.324c0.189,0.206,0.284,0.482,0.26,0.762l-4,46.625c-0.035,0.416-0.327,0.767-0.729,0.878l-19,5.25 C32.054,58.863,31.965,58.875,31.875,58.875z M14.184,51.85l17.694,4.987l18.061-4.99L53.785,7H10.096L14.184,51.85z"
      ></path>
      <linearGradient
        id="LQd3PK_1N6yKkSdj1YnVdb_laVIsJnTtYoj_gr2"
        x1="41.5"
        x2="41.5"
        y1="56"
        y2="12"
        gradientTransform="matrix(1 0 0 -1 0 66)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#6dc7ff"></stop>
        <stop offset="1" stop-color="#e6abff"></stop>
      </linearGradient>
      <path
        fill="url(#LQd3PK_1N6yKkSdj1YnVdb_laVIsJnTtYoj_gr2)"
        d="M32,10v44l15.25-4L51,10H32z M47.375,28.625l-1.125,14.75L33.75,46.5v-5.25l9-2.5l0.125-4.375l-9.25,1.375V16H48.25l-0.375,5.375L38.25,21.5v8.125 L47.375,28.625z"
      ></path>
      <linearGradient
        id="LQd3PK_1N6yKkSdj1YnVdc_laVIsJnTtYoj_gr3"
        x1="23.313"
        x2="23.313"
        y1="50"
        y2="19.375"
        gradientTransform="matrix(1 0 0 -1 0 66)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#6dc7ff"></stop>
        <stop offset="1" stop-color="#e6abff"></stop>
      </linearGradient>
      <polygon
        fill="url(#LQd3PK_1N6yKkSdj1YnVdc_laVIsJnTtYoj_gr3)"
        points="16.625,42.875 16.625,37.375 25.625,39.875 25.625,16 30,16 30,46.625"
      ></polygon>
    </svg>
  ),
  googleDrive: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 64 64"
    >
      <linearGradient
        id="7v9jIz6DZNXGp18nfnOPra_ouWtcsgDBiwO_gr1"
        x1="32"
        x2="32"
        y1="57.81"
        y2="6.19"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#e6abff"></stop>
        <stop offset="1" stop-color="#6dc7ff"></stop>
      </linearGradient>
      <path
        fill="url(#7v9jIz6DZNXGp18nfnOPra_ouWtcsgDBiwO_gr1)"
        d="M29.12,33.97h-2.6c-0.2,0-0.4,0.04-0.58,0.11l0.02-5.32c1.31,4.13,6.05,4.98,10.53,5.42	c7.02,0.69,7.02,1.62,7.02,2.23c0,0.9,0,2.56-5.73,2.56c-5.3,0-6.27-1.08-6.65-3.32C30.97,34.68,30.11,33.97,29.12,33.97z M32,6.19	L10,19.01v25.98l7.04,4.1c0.85,0.5,1.62,0.11,1.9-0.06c0.29-0.16,0.96-0.65,0.96-1.64l0.09-27.9c0.01-0.83,0.68-1.5,1.51-1.5l3,0.02	c0.83,0,1.5,0.67,1.49,1.5l-0.01,4.3C27.17,20.17,31.12,18,36.87,18c7.74,0,11.75,2.88,12.25,8.81c0.04,0.46-0.12,0.93-0.44,1.28	c-0.33,0.35-0.78,0.54-1.24,0.54h-2.58c-0.95,0-1.8-0.62-2.03-1.54c-0.49-2.01-1.44-3.08-5.97-3.08c-4.76,0-4.76,1.5-4.76,2.13	c0,0.82,0,1.26,10.79,2.52c4.01,0.47,7.23,3.85,7.11,7.89C49.84,41.85,45.29,45,37.75,45v-0.03c-4.86,0-8.41-1.09-10.56-3.24	c-0.51-0.51-0.94-1.08-1.27-1.69L25.9,47.4c0,2.12-0.82,4.08-2.27,5.53L32,57.81l22-12.82V19.01L32,6.19z"
      ></path>
      <linearGradient
        id="7v9jIz6DZNXGp18nfnOPrb_ouWtcsgDBiwO_gr2"
        x1="32"
        x2="32"
        y1="61.97"
        y2="2.027"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#c822ff"></stop>
        <stop offset="1" stop-color="#1a6dff"></stop>
      </linearGradient>
      <path
        fill="url(#7v9jIz6DZNXGp18nfnOPrb_ouWtcsgDBiwO_gr2)"
        d="M26.904,36.014c0.072,1.75,0.655,3.184,1.735,4.267c1.754,1.756,4.831,2.646,9.147,2.646	v0.026c3.813-0.005,10.168-0.885,10.168-6.689c0-3.789-2.003-5.091-9.315-6.062c-6.379-0.844-8.585-1.278-8.585-4.058	c0-4.178,5.122-4.178,6.804-4.178c4.962,0,7.089,1.187,7.96,4.62h2.219c-0.547-4.521-3.703-6.539-10.168-6.539	c-5.862,0-9.224,2.267-9.224,6.222c0,3.727,2.283,5.209,9.049,5.877c6.795,0.665,8.867,1.661,8.867,4.264	c0,4.087-4.16,4.611-7.784,4.611c-6.276,0-8.077-1.752-8.66-5.007H26.904z M58,18.44v27.12c0,1.07-0.57,2.06-1.49,2.6l-23,13.4	c-0.47,0.27-0.99,0.41-1.51,0.41s-1.04-0.14-1.51-0.41l-10.99-6.4c0.83-0.17,1.64-0.47,2.41-0.91h0.01l9.58,5.58	c0.31,0.19,0.69,0.19,1,0l23-13.4c0.31-0.18,0.5-0.51,0.5-0.87V18.44c0-0.36-0.19-0.69-0.5-0.87l-23-13.4c-0.31-0.19-0.69-0.19-1,0	l-23,13.4C8.19,17.75,8,18.08,8,18.44v27.12c0,0.36,0.19,0.69,0.5,0.87l3.682,2.15l3.784,2.203c1.224,0.713,2.699,0.711,3.946-0.005	c1.242-0.714,1.984-1.982,1.984-3.393L22,19.996l2,0.008l-0.104,27.385c0,2.131-1.117,4.048-2.987,5.123	c-0.938,0.539-1.962,0.808-2.983,0.808c-1.022,0-2.042-0.27-2.968-0.81l-3.78-2.202L7.49,48.16C6.57,47.62,6,46.63,6,45.56V18.44	c0-1.07,0.57-2.06,1.49-2.6l23-13.4c0.93-0.55,2.09-0.55,3.02,0l23,13.4C57.43,16.38,58,17.37,58,18.44z"
      ></path>
    </svg>
  ),
  whatsapp: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  ),
};
