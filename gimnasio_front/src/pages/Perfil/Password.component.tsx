import Label from '../../components/form/Label';
import FieldWrap from '../../components/form/FieldWrap';
import Icon from '../../components/icon/Icon';
import Input from '../../components/form/Input';
import { useState } from 'react';
import { Field, useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../store';
import { actualizar_contraseña } from '../../store/slices/auth/authSlices';
import { RootState } from '../../store/rootReducer';
import Container from '../../components/layouts/Container/Container';
import Card, { CardBody, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import useSaveBtn from '../../hooks/useSaveBtn';

interface PasswordProps {
	current_password: string
	new_password: string
	re_new_password: string
}

const Password = () => {
	const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);
	const [passwordNewShowStatus, setPasswordNewShowStatus] = useState<boolean>(false);
	const [passwordNewConfShowStatus, setPasswordNewConfShowStatus] = useState<boolean>(false);
	const [isSaving, setIsSaving] = useState<boolean>(false);


	const dispatch = useAppDispatch()
	const token = useAppSelector((state: RootState) => state.auth.session)

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			current_password: '',
			new_password: '',
			re_new_password: '',
		},
		onSubmit: (values: PasswordProps) => {
			setIsSaving(true);
			dispatch(actualizar_contraseña({ 
				params: {
					setPasswordShowStatus: setPasswordShowStatus,
					setPasswordNewShowStatus: setPasswordNewShowStatus,
					setPasswordNewConfShowStatus: setPasswordNewConfShowStatus
				}, 
				data: { ...values }, 
				token }))
			setTimeout(() => {
				setIsSaving(false)
			}, 1200)
		},
	})

	const { saveBtnText, saveBtnColor, saveBtnDisable } = useSaveBtn({
		isNewItem: false,
		isSaving,
		isDirty: formik.dirty,
	})

	return (
		<Container breakpoint={null} className='w-full h-ful'>
			<Card>
				<CardHeader>
					<CardTitle className='text-4xl'>Contraseña</CardTitle>
				</CardHeader>
				<CardBody>
					<div className='grid grid-cols-12 gap-4'>
						<div className='col-span-12'>
							<Label htmlFor='current_password'>Contraseña Actual</Label>
							<FieldWrap
								lastSuffix={
									<Icon
										className='mx-2'
										icon={passwordShowStatus ? 'HeroEyeSlash' : 'HeroEye'}
										onClick={() => {
											setPasswordShowStatus(!passwordShowStatus);
										}}
									/>
								}>
								<Input
									type={passwordShowStatus ? 'text' : 'password'}
									id='current_password'
									name='current_password'
									onChange={formik.handleChange}
									value={formik.values.current_password}
								/>
							</FieldWrap>
						</div>
						<div className='col-span-12'>
							<Label htmlFor='new_password'>Nueva Contraseña</Label>
							<FieldWrap
								lastSuffix={
									<Icon
										className='mx-2'
										icon={passwordNewShowStatus ? 'HeroEyeSlash' : 'HeroEye'}
										onClick={() => {
											setPasswordNewShowStatus(!passwordNewShowStatus);
										}}
									/>
								}>
								<Input
									type={passwordNewShowStatus ? 'text' : 'password'}
									id='new_password'
									name='new_password'
									onChange={formik.handleChange}
									value={formik.values.new_password}
									autoComplete='new-password'
								/>
							</FieldWrap>
						</div>
						<div className='col-span-12'>
							<Label htmlFor='re_new_password'>Confirmación Nueva Contraseña</Label>
							<FieldWrap
								lastSuffix={
									<Icon
										className='mx-2'
										icon={passwordNewConfShowStatus ? 'HeroEyeSlash' : 'HeroEye'}
										onClick={() => {
											setPasswordNewConfShowStatus(!passwordNewConfShowStatus);
										}}
									/>
								}>
								<Input
									type={passwordNewConfShowStatus ? 'text' : 'password'}
									id='re_new_password'
									name='re_new_password'
									onChange={formik.handleChange}
									value={formik.values.re_new_password}
									autoComplete='new-password'
								/>
							</FieldWrap>
						</div>
					</div>
				</CardBody>
				<CardFooter>
					<FieldWrap>
						<Button
							icon='HeroServer'
							variant='solid'
							color={saveBtnColor}
							isDisable={saveBtnDisable}
							onClick={() => formik.handleSubmit()}>
							{saveBtnText}
						</Button>
					</FieldWrap>
				</CardFooter>
			</Card>
		</Container>
	);
};

export default Password;
