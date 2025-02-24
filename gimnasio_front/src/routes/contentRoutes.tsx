import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { appPages, authPages, componentsPages, examplePages, userPages } from '../config/pages.config';
import NotFoundPage from '../pages/NotFound.page';
import LoginPage from '../pages/Auth/Login.page';
import SignUpPage from '../pages/Auth/SignUp.page';
import PasswordReset from '../pages/PasswordReset.page';


//Autenticacion principal
const DashboardPage = lazy(() => import('../pages/Dashboard'));

const ListaMiembros = lazy(() => import('../pages/Miembros/TablaMiembros'));
const DetalleMiembro = lazy(() => import('../pages/Miembros/Detalle Miembros/DetalleMiembro'));






const ListaEjercicios = lazy(() => import('../pages/Ejercicios/TablaEjercicios'));
const ListaMaquinas = lazy(() => import('../pages/Maquinas/TablaMaquinas'));
const ListaRutinas = lazy(() => import('../pages/Rutinas/TablaRutinas'));


const ProfilePage = lazy(() => import('../pages/Perfil/Profile.page'));
const GimnasiosPage = lazy(() => import('../pages/Gimnasios/GimnasiosPage.page'));





/**
 * Other
 */
const UnderConstructionPage = lazy(() => import('../pages/UnderConstruction.page'));

const ConfirmPages = lazy(() => import('../pages/Confirm.page'));

const contentRoutes: RouteProps[] = [
	{
		path: appPages.miembros.subPages.miembros_lista.to,
		element: <ListaMiembros />,
	},

	{
		path: appPages.miembros.subPages.detalle_miembro.to,
		element: <DetalleMiembro />
	},







	{
		path: appPages.ejercicios.subPages.ejercicios_lista.to,
		element: <ListaEjercicios />,
	},
	{
		path: appPages.maquinas.subPages.maquinas_lista.to,
		element: <ListaMaquinas />,
	},
	{
		path: appPages.rutinas.subPages.rutinas_lista.to,
		element: <ListaRutinas />,
	},


	{ path: appPages.dashboard.to, element: <DashboardPage /> },
	{ path: authPages.loginPage.to, element: <LoginPage /> },
	{ path: authPages.signUp.to, element: <SignUpPage /> },
	{ path: authPages.confirmPage.to, element: <ConfirmPages /> },
	{ path: authPages.resetPasswordPage.to, element: <PasswordReset /> },

	

	{ path: userPages.profilePage.to, element: <ProfilePage /> },
	{ path: userPages.gimnasiosPage.to, element: <GimnasiosPage /> },


	{ path: '*', element: <NotFoundPage /> },
];

export default contentRoutes;
