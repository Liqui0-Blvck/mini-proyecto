import React, { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage, { ISetValue } from '../hooks/useCookieStorage';
import { authPages } from '../config/pages.config';
import useFakeUserAPI from '../mocks/hooks/useFakeUserAPI';
import { TUser } from '../mocks/db/users.db';
import useCookiesStorage from '../hooks/useCookieStorage';

export interface IAuthContextProps {
	tokens:  string | ISetValue | null
	onLogout: () => void;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthProviderProps {
	children: ReactNode;
}
export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
	const [tokens, setTokens] = useCookiesStorage('user', null);
	const navigate = useNavigate();

	// call this function to sign out logged-in user
	const onLogout = async () => {
		if (typeof setTokens === 'function') await setTokens(null);
		navigate(`../${authPages.loginPage.to}`, { replace: true });
	};

	const value: IAuthContextProps = useMemo(
		() => ({
			tokens,
			onLogout,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
