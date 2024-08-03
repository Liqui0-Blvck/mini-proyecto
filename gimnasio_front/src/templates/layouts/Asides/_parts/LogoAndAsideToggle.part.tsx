import React from 'react';
import { Link } from 'react-router-dom';
import Visible from '../../../../components/utils/Visible';
import Icon from '../../../../components/icon/Icon';
import useAsideStatus from '../../../../hooks/useAsideStatus';
import LogoTemplate from '../../Logo/Logo.template';
import Avatar from '../../../../components/Avatar';
import { useAppSelector } from '../../../../store';
import { RootState } from '../../../../store/rootReducer';

const LogoAndAsideTogglePart = () => {
	const { asideStatus, setAsideStatus } = useAsideStatus();
	const { gimnasio } = useAppSelector((state: RootState) => state.gimnasio.gimnasio);
	return (
		<>
			<Visible is={asideStatus}>
				<Link to='/' aria-label='Logo'>
					<Avatar 
						rounded='rounded'
						className='w-14 h-14'
						src={gimnasio?.logo ? gimnasio.logo : '/src/assets/avatar/DefaultLogo.png'}
						/>
				</Link>
			</Visible>
			<button
				type='button'
				aria-label='Toggle Aside Menu'
				onClick={() => setAsideStatus(!asideStatus)}
				className='flex h-12 w-12 items-center justify-center'>
				<Icon
					icon={asideStatus ? 'HeroBars3BottomLeft' : 'HeroBars3'}
					className='text-2xl'
				/>
			</button>
		</>
	);
};

export default LogoAndAsideTogglePart;
