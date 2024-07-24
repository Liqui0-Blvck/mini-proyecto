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
import Validation from '../../components/form/Validation';
import SelectReact from '../../components/form/SelectReact';
import Configuracion from './Configuracion.component';
import Perfil from './Perfil.component';
import { actualizar_perfil } from '../../store/slices/auth/authSlices';
import Password from './Password.component';
import Personalizacion from './Personalizacion.compontent';

type TTab = {
	text:
		| 'Perfil'
		| 'Configuración'
		| 'Password'
		| 'Apariencia';
	icon: TIcons;
};
type TTabs = {
	[key in
		| 'EDIT'
		| 'CONFIGURATION'
		| 'PASSWORD'
		| 'APPEARANCE']: TTab;
};
const TAB: TTabs = {
	EDIT: {
		text: 'Perfil',
		icon: 'HeroPencil',
	},
	CONFIGURATION: {
		text: 'Configuración',
		icon: 'HeroKey',
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



	const { perfil } = useAppSelector((state: RootState) => state.auth.user)
	const { configuracion } = useAppSelector((state: RootState) => state.auth.user)
	const token = useAppSelector((state: RootState) => state.auth.session)

	const dispatch = useAppDispatch()



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

			// bio: (userData?.bio && (JSON.parse(userData.bio) as Descendant[])) || [],

		},
		onSubmit: (values: any) => {
		}
	});

	useEffect(() => {
		setDarkModeStatus(formik.values.theme as TDarkMode);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.theme]);




	const { saveBtnText, saveBtnColor, saveBtnDisable } = useSaveBtn({
		isNewItem: false,
		isSaving,
		isDirty: formik.dirty,
	});

	return (
		<PageWrapper name={formik.values.firstName}>
			<Subheader>
				<SubheaderLeft>
					{`${perfil?.usuario.first_name} ${perfil?.usuario.father_last_name}`}{' '}
					<Badge
						color='blue'
						variant='outline'
						rounded='rounded-full'
						className='border-transparent'>
						Perfil
					</Badge>
				</SubheaderLeft>
			</Subheader>
			<Container breakpoint={null} className='w-full h-full'>
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
									<Perfil /> 
								)}

								{activeTab === TAB.CONFIGURATION && (
									<>
										<Configuracion />
									</>
								)}
								
								{activeTab === TAB.PASSWORD && (
									<>
										<Password />
									</>
								)}
								
								{activeTab === TAB.APPEARANCE && (
									<Personalizacion />
								)}
							</div>
						</div>
					</CardBody>
				</Card>
			</Container>
		</PageWrapper>
	);
};

export default ProfilePage;
