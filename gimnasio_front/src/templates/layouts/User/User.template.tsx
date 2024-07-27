import React from 'react';
import Icon from '../../../components/icon/Icon';
import Badge from '../../../components/ui/Badge';
import { NavButton, NavItem, NavSeparator } from '../../../components/layouts/Navigation/Nav';
import { appPages, authPages } from '../../../config/pages.config';
import User from '../../../components/layouts/User/User';
import { useAuth } from '../../../context/authContext';
import { useAppSelector } from '../../../store';
import { RootState } from '../../../store/rootReducer';

const UserTemplate = () => {
	const { onLogout } = useAuth()
	const { perfil } = useAppSelector((state: RootState) => state.auth.user)

	return (
		<User
			name={`${perfil?.usuario.first_name} ${perfil?.usuario.second_name}`}
			nameSuffix={perfil?.usuario.is_staff && <Icon icon='HeroCheckBadge' color='blue' />}
			//@ts-ignore
			src={`${import.meta.env.VITE_URL_DEV}${perfil?.imagen_perfil!}`}>

			<NavSeparator />
			<NavItem {...authPages.profilePage} />
			<NavItem text='Logout' icon='HeroArrowRightOnRectangle' onClick={() => onLogout()} />
		</User>
	);
};

export default UserTemplate;
