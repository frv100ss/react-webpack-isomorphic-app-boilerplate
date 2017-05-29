const express = require('express');
const validator = require('validator');
const router = new express.Router();
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
const checkSignUpForm = (payload) => {
  const errors = {};
  let isFormValid = true;
  let message = '';
  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Veullez renseigner un adresse email correcte';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Le mot de passe doit avoir au moins 8 caractères';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Veuillez renseigner votre nom';
  }

  if (!isFormValid) {
    message = 'Le formulaire comporte des erreurs';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};
/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
const checkLoginForm = (payload) => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Veuillez renseigner votre adresse email';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Veuillez renseigner votre mot de passe';
  }

  if (!isFormValid) {
    message = 'Le formulaire comporte des erreurs';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

router.post('/signup', (req, res) => {
  const validationResult = checkSignUpForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  return res.status(200).end();
});

router.post('/login', (req, res) => {
  const validationResult = checkLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  return res.status(200).end();
});

module.exports = router;