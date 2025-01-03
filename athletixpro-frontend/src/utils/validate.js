// src/utils/validate.js
export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 6; // minimo 6 caratteri
  };
  