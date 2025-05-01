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
    if (!(input instanceof Date) || isNaN(input.getTime())) {
      return false;
    }
  }
  return true;
};
