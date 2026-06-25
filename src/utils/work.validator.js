import {
  WORK_STATUS,
  WORK_TYPES,
  VALID_WORK_PROPERTIES
} from "./work.constants.js";

export function validateCreateWork(body) {
  if (!body) {
    return { validation: false, message: "Body is required" };
  }

  if (!body.title || typeof body.title !== "string") {
    return { validation: false, message: "Title is required and must be a string" };
  }

  if (!body.banner || typeof body.banner !== "string") {
    return { validation: false, message: "Banner is required and must be a string" };
  }

  if (!Array.isArray(body.genres) || body.genres.length === 0) {
    return { validation: false, message: "Work must have at least one genre" };
  }

  if (!body.type || !WORK_TYPES.includes(body.type)) {
    return { validation: false, message: "Type must be Manga, Manhwa or Manhua" };
  }

  if (body.status !== undefined && !WORK_STATUS.includes(body.status)) {
    return { validation: false, message: "Status is invalid" };
  }

  if (body.synopsis !== undefined && typeof body.synopsis !== "string") {
    return { validation: false, message: "Synopsis must be a string" };
  }

  return { validation: true, message: "Validation passed" };
}

export function validateUpdateWork(body) {
  if (!body) {
    return { validation: false, message: "Body is required" };
  }

  const propertiesInBody = Object.keys(body);

  if (propertiesInBody.length === 0) {
    return { validation: false, message: "Body must contain at least one property" };
  }

  for (const property of propertiesInBody) {
    if (!VALID_WORK_PROPERTIES.includes(property)) {
      return {
        validation: false,
        message: `Property '${property}' is not allowed for work updates`
      };
    }
  }

  if (body.title !== undefined && typeof body.title !== "string") {
    return { validation: false, message: "Title must be a string" };
  }

  if (body.banner !== undefined && typeof body.banner !== "string") {
    return { validation: false, message: "Banner must be a string" };
  }

  if (body.genres !== undefined) {
    if (!Array.isArray(body.genres) || body.genres.length === 0) {
      return { validation: false, message: "Work must have at least one genre" };
    }
  }

  if (body.type !== undefined && !WORK_TYPES.includes(body.type)) {
    return { validation: false, message: "Type must be Manga, Manhwa or Manhua" };
  }

  if (body.status !== undefined && !WORK_STATUS.includes(body.status)) {
    return { validation: false, message: "Status is invalid" };
  }

  if (body.synopsis !== undefined && typeof body.synopsis !== "string") {
    return { validation: false, message: "Synopsis must be a string" };
  }

  if (body.visits !== undefined && (typeof body.visits !== "number" || body.visits < 0)) {
    return { validation: false, message: "Visits must be a positive number" };
  }

  if (body.followers !== undefined && (typeof body.followers !== "number" || body.followers < 0)) {
    return { validation: false, message: "Followers must be a positive number" };
  }

  return { validation: true, message: "Validation passed" };
}

export function validateWorkQuery(query = {}) {
  if (query.status !== undefined && !WORK_STATUS.includes(query.status)) {
    return { validation: false, message: "Status filter is invalid" };
  }

  if (query.type !== undefined && !WORK_TYPES.includes(query.type)) {
    return { validation: false, message: "Type filter is invalid" };
  }

  if (query.genre !== undefined && typeof query.genre !== "string") {
    return { validation: false, message: "Genre filter must be a string" };
  }

  if (query.title !== undefined && typeof query.title !== "string") {
    return { validation: false, message: "Title filter must be a string" };
  }

  return { validation: true, message: "Validation passed" };
}
