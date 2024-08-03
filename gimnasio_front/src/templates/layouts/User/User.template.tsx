import React from 'react';
import Icon from '../../../components/icon/Icon';
import Badge from '../../../components/ui/Badge';
import { NavButton, NavItem, NavSeparator } from '../../../components/layouts/Navigation/Nav';
import { appPages, authPages, userPages } from '../../../config/pages.config';
import User from '../../../components/layouts/User/User';
import { useAuth } from '../../../context/authContext';
import { useAppSelector } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { CgGym } from "react-icons/cg";

const UserTemplate = () => {
	const { onLogout } = useAuth()
	const { perfil } = useAppSelector((state: RootState) => state.auth.user)

	return (
		<User
			name={`${perfil?.usuario.first_name} ${perfil?.usuario.second_name}`}
			nameSuffix={perfil?.usuario.is_staff && <Icon icon='HeroCheckBadge' color='blue' />}
			src={perfil?.imagen_perfil ? perfil.imagen_perfil : '/src/assets/avatar/no-image-account.avif'}>

			<NavSeparator />
			<NavItem {...userPages.profilePage} />
			<NavItem 
				to={userPages.gimnasiosPage.to} 
				text={userPages.gimnasiosPage.text} 
				icon={<CgGym className='text-3xl dark:text-white text-zinc-500 mr-3'/>}/>
			<NavItem text='Cerrar Sesión' icon='HeroArrowRightOnRectangle' onClick={() => onLogout()} />
		</User>
	);
};

export default UserTemplate;
