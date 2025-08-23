import { createSelector } from "@reduxjs/toolkit";

// Website selectors
export const selectWebsiteData = (state) => state.website.data;
export const selectWebsiteLoading = (state) => state.website.loading;
export const selectWebsiteError = (state) => state.website.error;
export const selectWebsiteUpdateLoading = (state) =>
  state.website.updateLoading;
export const selectWebsiteUpdateError = (state) => state.website.updateError;

// Services selectors
export const selectServices = (state) => state.services.services;
export const selectCurrentService = (state) => state.services.currentService;
export const selectServicesLoading = (state) => state.services.loading;
export const selectServicesError = (state) => state.services.error;
export const selectServicesPagination = (state) => state.services.pagination;
export const selectServicesFilters = (state) => state.services.filters;

// Projects selectors
export const selectProjects = (state) => state.projects.projects;
export const selectCurrentProject = (state) => state.projects.currentProject;
export const selectProjectsLoading = (state) => state.projects.loading;
export const selectProjectsError = (state) => state.projects.error;
export const selectProjectsPagination = (state) => state.projects.pagination;
export const selectProjectsFilters = (state) => state.projects.filters;

// Blogs selectors
export const selectBlogs = (state) => state.blogs.blogs;
export const selectCurrentBlog = (state) => state.blogs.currentBlog;
export const selectBlogsLoading = (state) => state.blogs.loading;
export const selectBlogsError = (state) => state.blogs.error;
export const selectBlogsPagination = (state) => state.blogs.pagination;
export const selectBlogsFilters = (state) => state.blogs.filters;

// Testimonials selectors
export const selectTestimonials = (state) => state.testimonials.testimonials;
export const selectTestimonialsLoading = (state) => state.testimonials.loading;
export const selectTestimonialsError = (state) => state.testimonials.error;
export const selectTestimonialsPagination = (state) =>
  state.testimonials.pagination;
export const selectTestimonialsFilters = (state) => state.testimonials.filters;

// Team selectors
export const selectTeam = (state) => state.team.team;
export const selectTeamLoading = (state) => state.team.loading;
export const selectTeamError = (state) => state.team.error;
export const selectTeamPagination = (state) => state.team.pagination;
export const selectTeamFilters = (state) => state.team.filters;

// FAQ selectors
export const selectFaqs = (state) => state.faq.faqs;
export const selectFaqsLoading = (state) => state.faq.loading;
export const selectFaqsError = (state) => state.faq.error;
export const selectFaqsPagination = (state) => state.faq.pagination;
export const selectFaqsFilters = (state) => state.faq.filters;

// Contact selectors
export const selectContactLoading = (state) => state.contact.loading;
export const selectContactError = (state) => state.contact.error;
export const selectContactSuccess = (state) => state.contact.success;
export const selectContactSubmittedData = (state) =>
  state.contact.submittedData;

// Memoized selectors for better performance
export const selectServicesByCategory = createSelector(
  [selectServices, (state, category) => category],
  (services, category) => {
    if (!category) return services;
    return services.filter(
      (service) =>
        service.category?.en?.toLowerCase().includes(category.toLowerCase()) ||
        service.category?.ar?.includes(category)
    );
  }
);

export const selectProjectsByService = createSelector(
  [selectProjects, (state, serviceId) => serviceId],
  (projects, serviceId) => {
    if (!serviceId) return projects;
    return projects.filter((project) => project.service?._id === serviceId);
  }
);

export const selectBlogsByTags = createSelector(
  [selectBlogs, (state, tags) => tags],
  (blogs, tags) => {
    if (!tags || tags.length === 0) return blogs;
    return blogs.filter(
      (blog) =>
        blog.tags &&
        blog.tags.some((tag) =>
          tags.some((searchTag) =>
            tag.toLowerCase().includes(searchTag.toLowerCase())
          )
        )
    );
  }
);

// Pagination helpers
export const selectHasNextPage = createSelector(
  [selectServicesPagination],
  (pagination) => pagination.currentPage < pagination.totalPages
);

export const selectHasPreviousPage = createSelector(
  [selectServicesPagination],
  (pagination) => pagination.currentPage > 1
);

export const selectPageInfo = createSelector(
  [selectServicesPagination],
  (pagination) => ({
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    totalCount: pagination.totalCount,
    hasNext: pagination.currentPage < pagination.totalPages,
    hasPrevious: pagination.currentPage > 1,
  })
);
