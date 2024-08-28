import React, { Dispatch, FC, SetStateAction } from 'react';
import Button, { IButtonProps } from '../../../components/ui/Button';
import useColorApp from '../../../hooks/useColorApp';

export type TTabSucursal = {
	text: 'Sucursal Activo' | 'Lista de Sucursales';
}

export type TTabsSucursal = {
	[key in 'SUCURSAL' | 'LISTA']: TTabSucursal;
}

export const TAB_SUCURSAL: TTabsSucursal = {
	SUCURSAL: {
		text: 'Sucursal Activo',
	},
	LISTA: {
		text: 'Lista de Sucursales',
	},
};

interface ISucursalButtonProps {
	activeTab: TTabSucursal;
	setActiveTab: Dispatch<SetStateAction<TTabSucursal>>;
}

const SucursalesTabsButtons: FC<ISucursalButtonProps> = (props) => {
	const { activeTab, setActiveTab } = props;
	const { colorApp } = useColorApp();

	const defaultProps: IButtonProps = {
		size: 'sm',
		color: 'zinc',
		rounded: 'rounded-full',
	};
	const activeProps: IButtonProps = {
		...defaultProps,
		isActive: true,
		color: colorApp,
		colorIntensity: '500',
		variant: 'solid',
	};

	return (
		<div className='w-auto flex rounded-full border-2 border-zinc-500/20 p-1 drop-shadow-xl dark:border-zinc-800'>
			{Object.values(TAB_SUCURSAL).map((i) => (
				<Button
					key={i.text}
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...(activeTab.text === i.text ? { ...activeProps } : { ...defaultProps })}
					onClick={() => {
						setActiveTab(i);
					}}>
					{i.text}
				</Button>
			))}
		</div>
	);
};

export default SucursalesTabsButtons;
