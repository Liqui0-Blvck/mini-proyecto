import { useState } from 'react';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import Container from '../../components/layouts/Container/Container';
import Subheader, {
	SubheaderLeft,
} from '../../components/layouts/Subheader/Subheader';
import Card, { CardBody } from '../../components/ui/Card';
import Button, { IButtonProps } from '../../components/ui/Button';
import { TIcons } from '../../types/icons.type';
import Badge from '../../components/ui/Badge';
import { useAppSelector } from '../../store';
import { RootState } from '../../store/rootReducer';
import Configuracion from './Configuracion.component';
import Perfil from './Perfil.component';
import Password from './Password.component';

type TTab = {
	text:
		| 'Perfil'
		| 'Configuración'
		| 'Password'
	icon: TIcons;
};
type TTabs = {
	[key in
		| 'EDIT'
		| 'CONFIGURATION'
		| 'PASSWORD']: TTab;
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
};

const ProfilePage = () => {
	const { perfil } = useAppSelector((state: RootState) => state.auth.user)

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

	return (
		<PageWrapper>
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
								{activeTab === TAB.EDIT && <Perfil /> }

								{activeTab === TAB.CONFIGURATION && <Configuracion />}
								
								{activeTab === TAB.PASSWORD && <Password />}
							</div>
						</div>
					</CardBody>
				</Card>
			</Container>
		</PageWrapper>
	);
};

export default ProfilePage;
