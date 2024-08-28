// PageWrapper.tsx
import React, { FC, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { extractRoutes } from '../../../utils/getRoutesPath.util';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { appPages, authPages, userPages } from '../../../config/pages.config';
import useColorApp from '../../../hooks/useColorApp';

// Función para verificar si la ruta coincide con algún patrón de rutas dinámicas
const isRouteAuthorized = (pathname: any, routes: any) => {
  return routes.some((route: any) => {
    const routePattern = route.replace(/:[^\s/]+/g, '([^/]+)');
    const regex = new RegExp(`^${routePattern}$`);
    return regex.test(pathname);
  });
};

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
  const { configuracion } = useAppSelector((state: RootState) => state.auth.user);

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
  const userPagesRoutes = extractRoutes(userPages);

  console.log(appPagesRoutes)


  console.log(pathname)

  const isAuthorizedPage = isRouteAuthorized(pathname, appPagesRoutes);
  const isAuthorizedAuthPage = isRouteAuthorized(pathname, authPagesRoutes);
  const isAuthorizedUserPage = isRouteAuthorized(pathname, userPagesRoutes);

  console.log(isAuthorizedPage)

  useEffect(() => {
    const checkAuthorization = () => {
      // Verifica si la ruta actual es la ruta de confirmación
      const isConfirmPage = pathname.startsWith('/activate/');
  
      if (!session.signedIn) {
        // Si el usuario no está autenticado
        if ((!isAuthorizedAuthPage && !isAuthorizedPage && !isAuthorizedUserPage) || isProtectedRoute) {
          if (!isConfirmPage) {
            // Si no es la página de confirmación
            navigate(authPages.loginPage.to);
          }
        }
      } else {
        if (!isAuthorizedPage && !isAuthorizedAuthPage && !isAuthorizedUserPage) {
          navigate('/404', { replace: true });
        } else {
          navigate(pathname, { replace: true });
        }
      }
    };
  
    checkAuthorization(); // Verificar autorización
    setLoading(false); // Finalizar estado de carga
  
  }, [session.signedIn, isProtectedRoute, isAuthorizedPage, isAuthorizedAuthPage, isAuthorizedUserPage, pathname, navigate]);


  const { setColorAppTheme } = useColorApp()

  useEffect(() => {
    if (pathname == 'login'){
      setColorAppTheme('blue')
    }
  }, [pathname])
  
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
