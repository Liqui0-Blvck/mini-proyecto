import React, { Dispatch, FC, SetStateAction } from 'react';
import Button, { IButtonProps } from '../../components/ui/Button';
import useColorApp from '../../hooks/useColorApp';

export type TTabGym = {
	text: 'Gimnasio Activo' | 'Lista de Gimnasios';
}

export type TTabsGym = {
	[key in 'GIMNASIO' | 'LISTA']: TTabGym;
}

export const TAB_GYM: TTabsGym = {
	GIMNASIO: {
		text: 'Gimnasio Activo',
	},
	LISTA: {
		text: 'Lista de Gimnasios',
	},
};

interface IGimnasioButtonProps {
	activeTab: TTabGym;
	setActiveTab: Dispatch<SetStateAction<TTabGym>>;
}

const GimnasioTabsButtons: FC<IGimnasioButtonProps> = (props) => {
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
			{Object.values(TAB_GYM).map((i) => (
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

export default GimnasioTabsButtons;
