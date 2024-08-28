import React, { Dispatch, FC, SetStateAction } from 'react';
import Button, { IButtonProps } from '../../../components/ui/Button';
import useColorApp from '../../../hooks/useColorApp';

export type TTabMiembros = {
	text: 'Información Personal' | 'Historial Ejercicios' | 'Historial Pagos'
}

export type TTabsMiembro = {
	[key in 'INFO_PERSONAL' | 'HISTO_EJERCICIOS' | 'HISTO_PAGOS']: TTabMiembros;
}

export const TAB_MIEMBROS_GYM: TTabsMiembro = {
	INFO_PERSONAL: {
		text: 'Información Personal',
	},
	HISTO_EJERCICIOS: {
		text: 'Historial Ejercicios',
	},
  HISTO_PAGOS: {
    text: 'Historial Pagos',
  }
};

interface IGimnasioMiembrosButtonProps {
	activeTab: TTabMiembros;
	setActiveTab: Dispatch<SetStateAction<TTabMiembros>>;
}

const MiembrosGimnasioButtons: FC<IGimnasioMiembrosButtonProps> = (props) => {
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
			{Object.values(TAB_MIEMBROS_GYM).map((i) => (
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

export default MiembrosGimnasioButtons;
