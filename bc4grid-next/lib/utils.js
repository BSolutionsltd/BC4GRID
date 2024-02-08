import validator from 'validator';

const validateEmail = (email) => {
    return validator.isEmail(email);
}

export default validateEmail;