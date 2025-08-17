"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header
        tagline="Our Work"
        title="Projects that Inspire"
        description="Explore a collection of apps and websites we've built with passion, creativity, and cutting-edge technologies."
      />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="max-w-[1400px] mx-auto px-8 "
      >
        {/* First Row */}
        <motion.div className="flex justify-center mb-20 gap-12 ">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>

        {/* Second Row */}
        <motion.div className="flex justify-center mb-20 gap-12">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>

        {/* Third Row */}
        <motion.div className="flex justify-center gap-12">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
interface ProjectHeaderProps {
  title: string;
  tagline?: string;
  description: string;
}
export const Header: React.FC<ProjectHeaderProps> = ({
  title,
  tagline,
  description,
}) => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-32 px-4 w-full left-0 top-0 text-center">
      {tagline && (
        <span className="text-sm md:text-base font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {tagline}
        </span>
      )}
      <h1 className="text-3xl md:text-6xl font-bold dark:text-white mt-4">
        {title}
      </h1>
      <p className="max-w-2xl mx-auto text-base md:text-xl mt-6 text-neutral-700 dark:text-neutral-200">
        {description}
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
    githubLink?: string;
    demoLink?: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[40rem] relative shrink-0"
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group-hover/product:shadow-2xl"
      >
        <Image
          src={product.thumbnail}
          height="700"
          width="600"
          className="object-cover hover:rounded-2xl object-left-top absolute rounded-2xl h-full w-full inset-0"
          alt={product.title || "NOT FOUND"}
        />
      </a>

      {/* dark overlay */}
      <div className="absolute inset-0 h-full w-full opacity-0 rounded-2xl group-hover/product:opacity-70 bg-black transition-opacity"></div>

      {/* title + buttons */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 opacity-0 group-hover/product:opacity-100 transition-opacity">
        <h2 className="text-white text-xl font-semibold">{product.title}</h2>
        <div className="flex gap-2">
          {product.githubLink && (
            <a
              href={product.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-white/20 hover:bg-white/40 text-white px-3 py-1 rounded-lg text-sm"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          )}
          {product.demoLink && (
            <a
              href={product.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-green-500/70 hover:bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
            >
              <ExternalLink className="w-4 h-4" /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
