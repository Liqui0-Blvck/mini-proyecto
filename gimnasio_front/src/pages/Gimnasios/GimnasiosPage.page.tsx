import { ReactNode, useState } from 'react';
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
import GimnasioComponent from './Gimnasio.component';
import { CgGitBranch, CgGym } from 'react-icons/cg';

type TTab = {
	text:
		| 'Gimansio'
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
		text: 'Gimansio',
		icon: <CgGym className='text-3xl dark:text-white text-zinc-500 mr-3'/>,
	},
	SUCURSALES: {
		text: 'Sucursal',
		icon: <CgGitBranch className='text-3xl dark:text-white text-zinc-500 mr-3'/>,
	},
};

const GimnasiosPage = () => {
	const [activeTab, setActiveTab] = useState<TTab>(TAB.GIMNASIO);

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
					<Badge
						color='blue'
						variant='outline'
						rounded='rounded-full'
						className='border-transparent'>
						Gimnasio
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
								
							</div>
							<div className='col-span-12 flex flex-col gap-4 sm:col-span-8 md:col-span-10'>
								{activeTab.text === 'Gimansio' && <GimnasioComponent />}
							</div>
						</div>
					</CardBody>
				</Card>
			</Container>
		</PageWrapper>
	);
};

export default GimnasiosPage