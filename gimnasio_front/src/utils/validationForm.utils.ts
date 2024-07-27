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

export const PerfilSchema = Yup.object().shape({
	first_name: Yup.string()
		.required('El primer nombre es requerido')
		.max(50, 'El primer nombre no debe exceder 50 caracteres'),
	father_last_name: Yup.string()
		.required('El apellido paterno es requerido')
		.max(50, 'El apellido paterno no debe exceder 50 caracteres'),
	fecha_nacimiento: Yup.date()
		.required('La fecha de nacimiento es requerida')
		.max(new Date(), 'La fecha de nacimiento no puede ser en el futuro'),
	genero: Yup.string()
		.required('El género es requerido')
		.oneOf(['Masculino', 'Femenino', 'Otro'], 'El género debe ser Masculino, Femenino u Otro'),
	numero_telefono: Yup.string()
		.required('El número de teléfono es requerido')
});
