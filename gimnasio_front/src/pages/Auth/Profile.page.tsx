import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Descendant } from 'slate';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import { useAuth } from '../../context/authContext';
import Container from '../../components/layouts/Container/Container';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../components/layouts/Subheader/Subheader';
import Card, { CardBody, CardFooter, CardFooterChild } from '../../components/ui/Card';
import Button, { IButtonProps } from '../../components/ui/Button';
import { TIcons } from '../../types/icons.type';
import Label from '../../components/form/Label';
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import rolesDb from '../../mocks/db/roles.db';
import Avatar from '../../components/Avatar';
import useSaveBtn from '../../hooks/useSaveBtn';
import FieldWrap from '../../components/form/FieldWrap';
import Icon from '../../components/icon/Icon';
import Checkbox from '../../components/form/Checkbox';
import Badge from '../../components/ui/Badge';
import RichText from '../../components/RichText';
import Radio, { RadioGroup } from '../../components/form/Radio';
import useDarkMode from '../../hooks/useDarkMode';
import { TDarkMode } from '../../types/darkMode.type';
import { useAppDispatch, useAppSelector } from '../../store';
import { RootState } from '../../store/rootReducer';

type TTab = {
	text:
		| 'Perfil'
		| 'Password'
		| 'Apariencia';
	icon: TIcons;
};
type TTabs = {
	[key in
		| 'EDIT'
		| 'PASSWORD'
		| 'APPEARANCE']: TTab;
};
const TAB: TTabs = {
	EDIT: {
		text: 'Perfil',
		icon: 'HeroPencil',
	},
	PASSWORD: {
		text: 'Password',
		icon: 'HeroKey',
	},
	APPEARANCE: {
		text: 'Apariencia',
		icon: 'HeroSwatch',
	},
};

const ProfilePage = () => {
	const { i18n } = useTranslation();

	const { setDarkModeStatus } = useDarkMode();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { userData, isLoading } = useAuth();


	const user = useAppSelector((state: RootState) => state.auth.user)

	console.log(user)


	const [activeTab, setActiveTab] = useState<TTab>(TAB.EDIT);

	const defaultProps: IButtonProps = {
		color: 'zinc',
	};
	const activeProps: IButtonProps = {
		...defaultProps,
		isActive: true,
		color: 'blue',
		colorIntensity: '500',
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			fileUpload: '',
			email: user?.perfil?.usuario.email,
			firstName: user.perfil?.usuario.first_name,
			secondName: user.perfil?.usuario.first_name,
			lastName: user.perfil?.usuario.first_name,
			secondLastName: user.perfil?.usuario.first_name,
			fecha_nacimiento: user.perfil?.fecha_nacimiento,
			direccion: user.perfil?.direccion,
			numero_telefono: user.perfil?.numero_telefono,
			position: userData?.position,
			role: userData?.role,
			oldPassword: '',
			newPassword: '',
			newPasswordConfirmation: '',
			bio: (userData?.bio && (JSON.parse(userData.bio) as Descendant[])) || [],
			gender: user.perfil?.genero,
			theme: user.configuracion ? user.configuracion.estilo_aplicacion : 'dark',
			color: user.configuracion ? user.configuracion.color_aplicacion : 'zinc-800 zinc-200/30'
		},
		onSubmit: () => {},
	});

	useEffect(() => {
		setDarkModeStatus(formik.values.theme as TDarkMode);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.theme]);



	const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);
	const [passwordNewShowStatus, setPasswordNewShowStatus] = useState<boolean>(false);
	const [passwordNewConfShowStatus, setPasswordNewConfShowStatus] = useState<boolean>(false);

	const { saveBtnText, saveBtnColor, saveBtnDisable } = useSaveBtn({
		isNewItem: false,
		isSaving,
		isDirty: formik.dirty,
	});

	return (
		<PageWrapper name={formik.values.firstName}>
			<Subheader>
				<SubheaderLeft>
					{`${user?.perfil?.usuario.first_name} ${user?.perfil?.usuario.father_last_name}`}{' '}
					<Badge
						color='blue'
						variant='outline'
						rounded='rounded-full'
						className='border-transparent'>
						Perfil
					</Badge>
				</SubheaderLeft>
				<SubheaderRight>
					<Button
						icon='HeroServer'
						variant='solid'
						color={saveBtnColor}
						isDisable={saveBtnDisable}
						onClick={() => formik.handleSubmit()}>
						{saveBtnText}
					</Button>
				</SubheaderRight>
			</Subheader>
			<Container className='h-full'>
				<Card className='h-full'>
					<CardBody>
						<div className='grid grid-cols-12 gap-4'>
							<div className='col-span-12 flex gap-4 max-sm:flex-wrap sm:col-span-4 sm:flex-col md:col-span-2'>
								{Object.values(TAB).map((i) => (
									<div key={i.text}>
										<Button
											icon={i.icon}
											// eslint-disable-next-line react/jsx-props-no-spreading
											{...(activeTab.text === i.text
												? {
														...activeProps,
												  }
												: {
														...defaultProps,
												  })}
											onClick={() => {
												setActiveTab(i);
											}}>
											{i.text}
										</Button>
									</div>
								))}
								<div className='border-zinc-500/25 dark:border-zinc-500/50 max-sm:border-s sm:border-t sm:pt-4'>
									<Button icon='HeroTrash' color='red'>
										Delete Account
									</Button>
								</div>
							</div>
							<div className='col-span-12 flex flex-col gap-4 sm:col-span-8 md:col-span-10'>
								{activeTab === TAB.EDIT && (
									<>
										<div className='text-4xl font-semibold'>Perfil</div>
										<div className='flex w-full gap-4'>
											<div className='flex-shrink-0'>
												<Avatar
													src={userData?.image?.thumb}
													className='!w-24'
													// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
													name={`${userData?.firstName} ${userData?.lastName}`}
												/>
											</div>
											<div className='flex grow items-center'>
												<div>
													<div className='w-full'>
														<Label
															htmlFor='fileUpload'
															className=''
															description='At least 800x800 px recommended. JPG or PNG and GIF is allowed'>
															Upload new image
														</Label>
														<Input
															id='fileUpload'
															name='fileUpload'
															type='file'
															onChange={formik.handleChange}
															value={formik.values.fileUpload}
														/>
													</div>
												</div>
											</div>
										</div>
										<div className='grid grid-cols-12 gap-4'>
											<div className='col-span-12 lg:col-span-6'>
												<Label htmlFor='email'>Email</Label>
												<FieldWrap
													firstSuffix={
														<Icon
															icon='HeroEnvelope'
															className='mx-2'
														/>
													}>
													<Input
														id='email'
														name='email'
														onChange={formik.handleChange}
														value={formik.values.email}
														autoComplete='email'
													/>
												</FieldWrap>
											</div>
											<div className='col-span-12 lg:col-span-6'>
												<Label htmlFor='firstName'>Nombre</Label>
												<Input
													id='firstName'
													name='firstName'
													onChange={formik.handleChange}
													value={formik.values.firstName}
													autoComplete='given-name'
													autoCapitalize='words'
												/>
											</div>

											<div className='col-span-12 lg:col-span-6'>
												<Label htmlFor='secondName'>Segundo Nombre</Label>
												<Input
													id='secondName'
													name='secondName'
													onChange={formik.handleChange}
													value={formik.values.secondName}
													autoComplete='given-name'
													autoCapitalize='words'
												/>
											</div>

											<div className='col-span-12 lg:col-span-6'>
												<Label htmlFor='lastName'>Apellido Paterno</Label>
												<Input
													id='lastName'
													name='lastName'
													onChange={formik.handleChange}
													value={formik.values.lastName}
													autoComplete='family-name'
													autoCapitalize='words'
												/>
											</div>

											<div className='col-span-12 lg:col-span-6'>
												<Label htmlFor='secondLastName'>Apellido Materno</Label>
												<Input
													type='text'
													id='secondLastName'
													name='secondLastName'
													onChange={formik.handleChange}
													value={formik.values.secondLastName}
												/>
											</div>

											<div className='col-span-12 lg:col-span-6'>
												<Label htmlFor='gender'>Gender</Label>
												<RadioGroup isInline>
													{['Masculino', 'Femenino', 'Otro'].map((i) => (
														<Radio
															key={i}
															label={i}
															name='gender'
															value={i}
															selectedValue={formik.values.gender}
															onChange={formik.handleChange}
														/>
													))}
												</RadioGroup>
											</div>

											<div className='col-span-12 lg:col-span-6'>
												<Label htmlFor='fecha_nacimiento'>Fecha Nacimiento </Label>
												<Input
													type='date'
													id='fecha_nacimiento'
													name='fecha_nacimiento'
													onChange={formik.handleChange}
													value={formik.values.fecha_nacimiento}
												/>
											</div>

											<div className='col-span-12 lg:col-span-6'>
												<Label htmlFor='direccion'>Dirección </Label>
												<FieldWrap
													firstSuffix={
														<Icon
															icon='HeroMapPin'
															className='mx-2'
														/>
													}
												>
													<Input
														type='text'
														id='direccion'
														name='direccion'
														onChange={formik.handleChange}
														value={formik.values.direccion}
													/>
												</FieldWrap>
											</div>

											<div className='col-span-12 lg:col-span-6'>
												<Label htmlFor='numero_telefono'>N° Telefono </Label>
												<FieldWrap
													firstSuffix={
														<Icon
															icon='HeroPhone'
															className='mx-2'
														/>
													}
													>
													<Input
														type='text'
														id='numero_telefono'
														name='numero_telefono'
														onChange={formik.handleChange}
														value={formik.values.numero_telefono}
													/>
												</FieldWrap>
											</div>

											<div className='col-span-12'>
												<Label htmlFor='position'>Role</Label>
												<FieldWrap
													firstSuffix={
														<Icon
															icon='HeroShieldCheck'
															className='mx-2'
														/>
													}
													lastSuffix={
														<Icon
															icon='HeroChevronDown'
															className='mx-2'
														/>
													}>
													<Select
														name='role'
														onChange={formik.handleChange}
														value={formik.values.role}
														placeholder='Select role'>
														{rolesDb.map((role) => (
															<option key={role.id} value={role.id}>
																{role.name}
															</option>
														))}
													</Select>
												</FieldWrap>
											</div>
											<div className='col-span-12'>
												<Label htmlFor='position'>Position</Label>

												<FieldWrap
													firstSuffix={
														<Icon
															icon='HeroBriefcase'
															className='mx-2'
														/>
													}>
													<Input
														id='position'
														name='position'
														onChange={formik.handleChange}
														value={formik.values.position}
													/>
												</FieldWrap>
											</div>
											<div className='col-span-12'>
												<Label htmlFor='bio'>Bio</Label>
												<RichText
													id='bio'
													value={formik.values.bio}
													handleChange={(event) => {
														formik
															.setFieldValue('bio', event)
															.then(() => {})
															.catch(() => {});
													}}
												/>
											</div>
										</div>
									</>
								)}
								
								{activeTab === TAB.PASSWORD && (
									<>
										<div className='text-4xl font-semibold'>Password</div>
										<div className='grid grid-cols-12 gap-4'>
											<div className='col-span-12'>
												<Label htmlFor='oldPassword'>Old Password</Label>
												<FieldWrap
													lastSuffix={
														<Icon
															className='mx-2'
															icon={
																passwordShowStatus
																	? 'HeroEyeSlash'
																	: 'HeroEye'
															}
															onClick={() => {
																setPasswordShowStatus(
																	!passwordShowStatus,
																);
															}}
														/>
													}>
													<Input
														type={
															passwordShowStatus ? 'text' : 'password'
														}
														id='oldPassword'
														name='oldPassword'
														onChange={formik.handleChange}
														value={formik.values.oldPassword}
													/>
												</FieldWrap>
											</div>
											<div className='col-span-12'>
												<Label htmlFor='newPassword'>New Password</Label>
												<FieldWrap
													lastSuffix={
														<Icon
															className='mx-2'
															icon={
																passwordNewShowStatus
																	? 'HeroEyeSlash'
																	: 'HeroEye'
															}
															onClick={() => {
																setPasswordNewShowStatus(
																	!passwordNewShowStatus,
																);
															}}
														/>
													}>
													<Input
														type={
															passwordNewShowStatus
																? 'text'
																: 'password'
														}
														id='newPassword'
														name='newPassword'
														onChange={formik.handleChange}
														value={formik.values.newPassword}
														autoComplete='new-password'
													/>
												</FieldWrap>
											</div>
											<div className='col-span-12'>
												<Label htmlFor='newPasswordConfirmation'>
													New Password Confirmation
												</Label>
												<FieldWrap
													lastSuffix={
														<Icon
															className='mx-2'
															icon={
																passwordNewConfShowStatus
																	? 'HeroEyeSlash'
																	: 'HeroEye'
															}
															onClick={() => {
																setPasswordNewConfShowStatus(
																	!passwordNewConfShowStatus,
																);
															}}
														/>
													}>
													<Input
														type={
															passwordNewConfShowStatus
																? 'text'
																: 'password'
														}
														id='newPasswordConfirmation'
														name='newPasswordConfirmation'
														onChange={formik.handleChange}
														value={
															formik.values.newPasswordConfirmation
														}
														autoComplete='new-password'
													/>
												</FieldWrap>
											</div>
										</div>
									</>
								)}
								
								{activeTab === TAB.APPEARANCE && (
									<Card>
										<CardBody>
											<div className='border border-black p-2'>
												<div className='text-4xl font-semibold'>Apariencia</div>
												<div className='grid grid-cols-12 gap-4'>
													<div className='col-span-12'>
														<Label htmlFor='theme'>Tema</Label>
														<RadioGroup isInline>
															<Radio
																name='theme'
																value='dark'
																selectedValue={formik.values.theme}
																onChange={formik.handleChange}>
																<div className='relative'>
																	<div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
																		<div className='h-1 w-1 rounded-full bg-red-500' />
																		<div className='h-1 w-1 rounded-full bg-amber-500' />
																		<div className='h-1 w-1 rounded-full bg-emerald-500' />
																	</div>
																	<div className='flex aspect-video w-56 bg-zinc-950'>
																		<div className='h-full w-1/4 border-e border-zinc-800/50 bg-zinc-900/75' />
																		<div className='h-full w-3/4'>
																			<div className='h-4 w-full border-b border-zinc-800/50 bg-zinc-900/75' />
																			<div />
																		</div>
																	</div>
																</div>
															</Radio>
															<Radio
																name='theme'
																value='light'
																selectedValue={formik.values.theme}
																onChange={formik.handleChange}>
																<div className='relative'>
																	<div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
																		<div className='h-1 w-1 rounded-full bg-red-500' />
																		<div className='h-1 w-1 rounded-full bg-amber-500' />
																		<div className='h-1 w-1 rounded-full bg-emerald-500' />
																	</div>
																	<div className='flex aspect-video w-56 bg-zinc-100'>
																		<div className='h-full w-1/4 border-e border-emerald-500/25 bg-white' />
																		<div className='h-full w-3/4'>
																			<div className='h-4 w-full border-b border-zinc-300/25 bg-white' />
																			<div />
																		</div>
																	</div>
																</div>
															</Radio>
														</RadioGroup>
													</div>
												</div>
											</div>

											<div className='border border-black p-2 mt-5'>
												<div className='text-4xl font-semibold'>Colores</div>
												<div className='grid grid-cols-12 gap-4'>
													<div className='col-span-12'>
														<Label htmlFor='color'>Colores</Label>
														<RadioGroup isInline>
															<Radio
																name='color'
																value='cyan'
																selectedValue={formik.values.color}
																onChange={formik.handleChange}>
																<div className='relative'>
																	<div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
																		<div className='h-1 w-1 rounded-full bg-red-500' />
																		<div className='h-1 w-1 rounded-full bg-amber-500' />
																		<div className='h-1 w-1 rounded-full bg-emerald-500' />
																	</div>
																	<div className='flex aspect-video w-56 bg-zinc-950'>
																		<div className='h-full w-1/4 border-e border-zinc-800/50 bg-cyan-900/75' />
																		<div className='h-full w-3/4'>
																			<div className='h-4 w-full border-b border-zinc-800/50 bg-cyan-900/75' />
																			<div />
																		</div>
																	</div>
																</div>
															</Radio>

															<Radio
																name='color'
																value='red'
																selectedValue={formik.values.color}
																onChange={formik.handleChange}>
																<div className='relative'>
																	<div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
																		<div className='h-1 w-1 rounded-full bg-red-500' />
																		<div className='h-1 w-1 rounded-full bg-amber-500' />
																		<div className='h-1 w-1 rounded-full bg-emerald-500' />
																	</div>
																	<div className='flex aspect-video w-56 bg-zinc-950'>
																		<div className='h-full w-1/4 border-e border-zinc-800/50 bg-red-800/75' />
																		<div className='h-full w-3/4'>
																			<div className='h-4 w-full border-b border-zinc-800/50 bg-red-800/75' />
																			<div />
																		</div>
																	</div>
																</div>
															</Radio>

															<Radio
																name='color'
																value='violet'
																selectedValue={formik.values.color}
																onChange={formik.handleChange}>
																<div className='relative'>
																	<div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
																		<div className='h-1 w-1 rounded-full bg-red-500' />
																		<div className='h-1 w-1 rounded-full bg-amber-500' />
																		<div className='h-1 w-1 rounded-full bg-emerald-500' />
																	</div>
																	<div className='flex aspect-video w-56 bg-zinc-800'>
																		<div className='h-full w-1/4 border-e border-zinc-800/50 bg-violet-800/60' />
																		<div className='h-full w-3/4'>
																			<div className='h-4 w-full border-b border-zinc-800/50 bg-violet-800/60' />
																			<div />
																		</div>
																	</div>
																</div>
															</Radio>

															<Radio
																name='color'
																value='amber'
																selectedValue={formik.values.color}
																onChange={formik.handleChange}>
																<div className='relative'>
																	<div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
																		<div className='h-1 w-1 rounded-full bg-red-500' />
																		<div className='h-1 w-1 rounded-full bg-amber-500' />
																		<div className='h-1 w-1 rounded-full bg-emerald-500' />
																	</div>
																	<div className='flex aspect-video w-56 bg-zinc-950'>
																		<div className='h-full w-1/4 border-e border-zinc-800/50 bg-amber-900/75' />
																		<div className='h-full w-3/4'>
																			<div className='h-4 w-full border-b border-zinc-800/50 bg-amber-900/75' />
																			<div />
																		</div>
																	</div>
																</div>
															</Radio>

															<Radio
																name='color'
																value='emerald'
																selectedValue={formik.values.color}
																onChange={formik.handleChange}>
																<div className='relative'>
																	<div className='flex h-2 w-full items-center gap-1 bg-zinc-500 p-1'>
																		<div className='h-1 w-1 rounded-full bg-red-500' />
																		<div className='h-1 w-1 rounded-full bg-amber-500' />
																		<div className='h-1 w-1 rounded-full bg-emerald-500' />
																	</div>
																	<div className='flex aspect-video w-56 bg-zinc-950'>
																		<div className='h-full w-1/4 border-e border-zinc-500/50 bg-emerald-900/75' />
																		<div className='h-full w-3/4'>
																			<div className='h-4 w-full border-b border-zinc-500/50 bg-emerald-900/75' />
																			<div />
																		</div>
																	</div>
																</div>
															</Radio>
															
														</RadioGroup>
													</div>
												</div>
											</div>
										</CardBody>
									</Card>
								)}
							</div>
						</div>
					</CardBody>
					<CardFooter>
						<CardFooterChild>
							<div className='flex items-center gap-2'>
								<Icon icon='HeroDocumentCheck' size='text-2xl' />
								<span className='text-zinc-500'>Last saved:</span>
								<b>{dayjs().locale(i18n.language).format('LLL')}</b>
							</div>
						</CardFooterChild>
						<CardFooterChild>
							<Button
								icon='HeroServer'
								variant='solid'
								color={saveBtnColor}
								isDisable={saveBtnDisable}
								onClick={() => formik.handleSubmit()}>
								{saveBtnText}
							</Button>
						</CardFooterChild>
					</CardFooter>
				</Card>
			</Container>
		</PageWrapper>
	);
};

export default ProfilePage;
