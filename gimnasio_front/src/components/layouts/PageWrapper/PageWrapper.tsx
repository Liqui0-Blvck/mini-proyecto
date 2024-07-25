import React, { FC, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { extractRoutes } from '../../../utils/getRoutesPath.util';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { appPages, authPages } from '../../../config/pages.config';

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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const session = useAppSelector((state: RootState) => state.auth.session);
  const { configuracion } = useAppSelector((state: RootState) => state.auth.user)

  const fontMap: Record<string, string> = {
    'Arial, sans-serif': 'font-arial',
    'Helvetica, sans-serif': 'font-helvetica',
    'Verdana, sans-serif': 'font-verdana',
    'Tahoma, sans-serif': 'font-tahoma',
    'Georgia, serif': 'font-georgia',
    'Times New Roman, serif': 'font-times',
    'Courier New, monospace': 'font-courier',
    'Lucida Console, monospace': 'font-lucida',
    'Roboto, sans-serif': 'font-roboto',
    'Open Sans, sans-serif': 'font-opensans',
    'Lato, sans-serif': 'font-lato',
    'Montserrat, sans-serif': 'font-montserrat',
    'Poppins, sans-serif': 'font-sans',
    'Raleway, sans-serif': 'font-raleway',
    'Oswald, sans-serif': 'font-oswald',
    'Roboto Slab, serif': 'font-robotoslab',
    'Merriweather, serif': 'font-merriweather',
    'Playfair Display, serif': 'font-playfair',
  };

  const fontClass = fontMap[configuracion?.fuente_aplicacion!] || 'font-sans';





  const [loading, setLoading] = useState(true); // Estado de carga

  const appPagesRoutes = extractRoutes(appPages);
  const authPagesRoutes = extractRoutes(authPages);

  const isAuthorizedPage = appPagesRoutes.includes(pathname);
  const isAuthorizedAuthPage = authPagesRoutes.includes(pathname);

  useEffect(() => {
    const checkAuthorization = () => {
      if (!session.signedIn) {
        // Si el usuario no está autenticado
        if (isProtectedRoute || (!isAuthorizedAuthPage && !isAuthorizedPage)) {
          // Si está en una ruta protegida o no está en una página autorizada para no autenticados
          navigate(authPages.loginPage.to);
        }
      } else {
				if (!isAuthorizedPage && !isAuthorizedAuthPage){
					navigate('/404', { replace: true });
				} else {
					navigate(pathname, { replace: true })
				}
			}
    };

    checkAuthorization(); // Verificar autorización
    setLoading(false); // Finalizar estado de carga

  }, [session.signedIn, isProtectedRoute, isAuthorizedPage, isAuthorizedAuthPage, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Mostrar un indicador de carga mientras se verifica la sesión
  }

  return (
    <main
      data-component-name='PageWrapper'
      className={classNames(`flex shrink-0 grow flex-col `, fontClass, className)}
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
