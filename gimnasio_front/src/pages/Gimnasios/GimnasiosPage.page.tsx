import { ReactNode, useEffect, useState } from 'react';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import Container from '../../components/layouts/Container/Container';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../components/layouts/Subheader/Subheader';
import Card, { CardBody } from '../../components/ui/Card';
import Button, { IButtonProps } from '../../components/ui/Button';
import { TIcons } from '../../types/icons.type';
import Badge from '../../components/ui/Badge';
import { useAppDispatch, useAppSelector } from '../../store';
import { RootState } from '../../store/rootReducer';
import GimnasioComponent from './Gimnasio.component';
import { CgGitBranch, CgGym } from 'react-icons/cg';
import Modal, { ModalBody, ModalHeader } from '../../components/ui/Modal';
import FormularioGimnasio from './FormularioGimnasio.form';
import SelectReact, { TSelectOptions } from '../../components/form/SelectReact';
import { TGimnasio } from '../../types/gimnasio/TGimnasio.type';
import GimnasioTabsButtons, { TAB_GYM, TTabGym } from './GimnasioButtons';
import { actualizar_gimnasio_activo, obtener_gimnasios } from '../../store/slices/gimnasio/gimnasioPeticiones';
import TablaGimnasios from './TablaGimnasios.table';

type TTab = {
	text:
		| 'Gimnasio'
		| 'Sucursal'
	icon: TIcons | ReactNode;
};
type TTabs = {
	[key in
		| 'GIMNASIO'
		| 'SUCURSALES']: TTab;
};
const TAB: TTabs = {
	GIMNASIO: {
		text: 'Gimnasio',
		icon: <CgGym className='text-3xl dark:text-white text-zinc-500 mr-3'/>,
	},
	SUCURSALES: {
		text: 'Sucursal',
		icon: <CgGitBranch className='text-3xl dark:text-white text-zinc-500 mr-3'/>,
	},
};



const GimnasiosPage = () => {
	const [activeTab, setActiveTab] = useState<TTab>(TAB.GIMNASIO);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { gimnasios } = useAppSelector((state: RootState) => state.gimnasio.gimnasio);
	const [activeTabsGym, setActiveTabsGym] = useState<TTabGym>(TAB_GYM.GIMNASIO)
	const token = useAppSelector((state: RootState) => state.auth.session)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(obtener_gimnasios({ token }))
	}, [])


	const defaultProps: IButtonProps = {
		color: 'zinc',
	};
	const activeProps: IButtonProps = {
		...defaultProps,
		isActive: true,
		color: 'blue',
		colorIntensity: '500',
	};

	const optionGimnasio: TSelectOptions = gimnasios?.map((gimnasio: TGimnasio) => ({
		value: String(gimnasio.id),
		label: gimnasio.nombre,
	})) || []

	return (
		<PageWrapper>
			<Subheader>
				<SubheaderLeft>
					<Badge
						color='blue'
						variant='outline'
						rounded='rounded-full'
						className='border-transparent'>
						{activeTab.text}
					</Badge>
				</SubheaderLeft>

				<SubheaderRight>
					{
						gimnasios?.length! > 0
							? (
								<SelectReact
									options={optionGimnasio}
									id='gimnasio'
									color='blue'
									name='gimnasio'
									className='!w-52'
									placeholder='Selecciona un gimnasio'
									onChange={(value: any) => {
										dispatch(actualizar_gimnasio_activo({ token, data: { gimnasio_id: value.value} }))
									}}
								/>
								)
							: null
					}

					<Button
						aria-details='Agregar Gimnasio'
						variant='outline'
						color='blue'
						isActive={true}
						colorIntensity='500'
						className='hover:bg-blue-500 hover:bg-opacity-90'
						icon='HeroPlus'
						onClick={() => setIsModalOpen(true)}
						>
						Agregar {activeTab.text}
					</Button>
				</SubheaderRight>
			</Subheader>
			<Container breakpoint={null} className='w-full h-full'>
				<Card className='h-full'>
					<Modal
						isOpen={isModalOpen}
						setIsOpen={() => setIsModalOpen(false)}
						>
						<ModalHeader>
							Agregar {activeTab.text}
						</ModalHeader>
						<ModalBody>
							<FormularioGimnasio setClose={setIsModalOpen}/>
						</ModalBody>
					</Modal>
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
								
							</div>

							<div className='col-span-12 flex flex-col gap-4 sm:col-span-8 md:col-span-10'>
								{gimnasios?.length! > 1 && activeTab.text === 'Gimnasio' && (
									<div className='flex'>
										<GimnasioTabsButtons activeTab={activeTabsGym} setActiveTab={setActiveTabsGym}/>
									</div>
								)}
								{
									activeTab.text === 'Gimnasio'
										&& gimnasios?.length! <= 1
											? <GimnasioComponent />
											: activeTabsGym.text === 'Gimnasio Activo' && activeTab.text === 'Gimnasio'
												? <GimnasioComponent />
												: activeTabsGym.text === 'Lista de Gimnasios' && activeTab.text === 'Gimnasio'
													? <TablaGimnasios />
													: null
								}

								{activeTab.text === 'Sucursal' && <div>Hola</div>}
								
							</div>
						</div>
					</CardBody>
				</Card>
			</Container>
		</PageWrapper>
	);
};

export default GimnasiosPage