import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types
interface Skill {
  id: string;
  name: string;
  icon?: string;
  order: number;
}

interface SkillCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
  order: number;
  skills: Skill[];
}

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageSrc: string;
  githubLink: string;
  liveLink?: string;
  youtubeDemoLink?: string;
  isTeamProject: boolean;
  isFeatured: boolean;
  technologies: string[];
  features: string[];
}

interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
  description: string;
  gpa?: string;
  order: number;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  year: string;
  description: string;
  order: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  order: number;
}

export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Skills", "Projects", "Education", "Experience", "Achievement"],
  endpoints: (builder) => ({
    // Public endpoints for fetching data
    getPublicSkills: builder.query<SkillCategory[], void>({
      query: () => "/skills",
      providesTags: ["Skills"],
    }),
    getPublicProjects: builder.query<Project[], void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
    getPublicEducation: builder.query<Education[], void>({
      query: () => "/education",
      providesTags: ["Education"],
    }),
    getPublicExperience: builder.query<Experience[], void>({
      query: () => "/experience",
      providesTags: ["Experience"],
    }),
    getPublicAchievements: builder.query<Achievement[], void>({
      query: () => "/achievements",
      providesTags: ["Achievement"],
    }),
  }),
});

export const {
  useGetPublicSkillsQuery,
  useGetPublicProjectsQuery,
  useGetPublicEducationQuery,
  useGetPublicExperienceQuery,
  useGetPublicAchievementsQuery,
} = publicApi;
