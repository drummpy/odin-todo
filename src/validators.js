import { parseISO } from "date-fns";

export const validateStringInputs = (...inputs) => {
  for (const input of inputs) {
    if (typeof input !== "string" || input.trim() === "") {
      return false;
    }
  }
  return true;
};

export const validateNumberInputs = (...inputs) => {
  for (const input of inputs) {
    if (typeof input !== "number" || isNaN(input)) {
      return false;
    }
  }
  return true;
};

export const validateBooleanInputs = (...inputs) => {
  for (const input of inputs) {
    if (typeof input !== "boolean") {
      return false;
    }
  }
  return true;
};

export const validateDateInputs = (...inputs) => {
  for (const input of inputs) {
    if (typeof input === "string") {
      const parsedDate = parseISO(input);
      if (!isValid(parsedDate)) {
        return false; // Invalid string date
      }
    } else if (!(input instanceof Date) || isNaN(input.getTime())) {
      return false; // Invalid Date object
    }
  }
  return true; // All inputs are valid
};
