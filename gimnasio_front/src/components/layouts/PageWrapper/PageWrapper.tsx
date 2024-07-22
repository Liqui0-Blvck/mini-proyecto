import React, { FC, ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { appPages, authPages } from '../../../config/pages.config';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { useAppSelector } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { extractRoutes } from '../../../utils/getRoutesPath.util';

interface IPageWrapperProps {
	children: ReactNode;
	className?: string;
	isProtectedRoute?: boolean;
	title?: string;
	name?: string;
}

const PageWrapper: FC<IPageWrapperProps> = (props) => {
	const { children, className, isProtectedRoute = true, title, name, ...rest } = props;

	useDocumentTitle({ title, name });
	const navigate = useNavigate()

	const { pathname } = useLocation();
	const session = useAppSelector((state: RootState) => state.auth.session);

	const appPagesRoutes = extractRoutes(appPages);
	const authPagesRoutes = extractRoutes(authPages);

	const isAuthorizedPage = appPagesRoutes.includes(pathname);
	const isAuthorizedAuthPage = authPagesRoutes.includes(pathname);

	useEffect(() => {
		if (!session.signedIn && isProtectedRoute) {
			// Redirigir al login si no está autenticado y la ruta es protegida
			navigate(authPages.loginPage.to, { replace: true });
		} else if (session.signedIn && !isAuthorizedPage && !isAuthorizedAuthPage) {
			// Mostrar página de "No Encontrada" si está autenticado pero la ruta no es válida
			navigate('/404', { replace: true });
		} else {
			navigate(authPages.loginPage.to, { replace: true })
		}
	}, [session, isProtectedRoute, pathname, isAuthorizedPage, isAuthorizedAuthPage, navigate]);


	return (
		<main
			data-component-name='PageWrapper'
			className={classNames('flex shrink-0 grow flex-col', className)}
			{...rest}>
			{children}
		</main>
	);
};

PageWrapper.defaultProps = {
	className: undefined,
	isProtectedRoute: true,
	title: undefined,
	name: undefined,
};

export default PageWrapper;
