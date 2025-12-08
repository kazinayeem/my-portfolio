import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types
interface Skill {
  id: string;
  name: string;
  icon?: string;
  categoryId: string;
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
  order: number;
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

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin" }),
  tagTypes: ["Skills", "Projects", "Education", "Experience", "Achievement"],
  endpoints: (builder) => ({
    // Skills
    getSkillCategories: builder.query<SkillCategory[], void>({
      query: () => "/skills",
      providesTags: ["Skills"],
    }),
    createSkillCategory: builder.mutation({
      query: (data) => ({
        url: "/skills",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Skills"],
    }),
    updateSkillCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/skills`,
        method: "PUT",
        body: { id, ...data },
      }),
      invalidatesTags: ["Skills"],
    }),
    deleteSkillCategory: builder.mutation({
      query: (id) => ({
        url: `/skills?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),

    createSkill: builder.mutation({
      query: ({ categoryId, ...data }) => ({
        url: `/skills/${categoryId}/skills`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Skills"],
    }),
    updateSkill: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/skills/skill/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Skills"],
    }),
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skills/skill/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),

    // Projects
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),

    // Education
    getEducation: builder.query<Education[], void>({
      query: () => "/education",
      providesTags: ["Education"],
    }),
    createEducation: builder.mutation({
      query: (data) => ({
        url: "/education",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Education"],
    }),
    updateEducation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/education`,
        method: "PUT",
        body: { id, ...data },
      }),
      invalidatesTags: ["Education"],
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/education?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Education"],
    }),

    // Experience
    getExperience: builder.query<Experience[], void>({
      query: () => "/experience",
      providesTags: ["Experience"],
    }),
    createExperience: builder.mutation({
      query: (data) => ({
        url: "/experience",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Experience"],
    }),
    updateExperience: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/experience`,
        method: "PUT",
        body: { id, ...data },
      }),
      invalidatesTags: ["Experience"],
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/experience?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experience"],
    }),

    // Achievement
    getAchievements: builder.query<Achievement[], void>({
      query: () => "/achievement",
      providesTags: ["Achievement"],
    }),
    createAchievement: builder.mutation({
      query: (data) => ({
        url: "/achievement",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Achievement"],
    }),
    updateAchievement: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/achievement`,
        method: "PUT",
        body: { id, ...data },
      }),
      invalidatesTags: ["Achievement"],
    }),
    deleteAchievement: builder.mutation({
      query: (id) => ({
        url: `/achievement?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Achievement"],
    }),
  }),
});

export const {
  useGetSkillCategoriesQuery,
  useCreateSkillCategoryMutation,
  useUpdateSkillCategoryMutation,
  useDeleteSkillCategoryMutation,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetEducationQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useGetExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useGetAchievementsQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
} = adminApi;
