import * as Yup from 'yup';

export const SignUpValidation = Yup.object({
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/\d/, 'Debe contener al menos un número')
    .matches(/[!@#$%^&*()_+{}\[\]:;"\'<>,.?~`]/, 'Debe contener al menos un carácter especial')
    .required('La contraseña es obligatoria'),
  re_password: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas deben coincidir')
    .required('La confirmación de contraseña es obligatoria'),
})
