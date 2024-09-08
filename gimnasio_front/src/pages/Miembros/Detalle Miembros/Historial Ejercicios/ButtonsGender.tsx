import React, { Dispatch, FC, SetStateAction } from 'react';
import Button, { IButtonProps } from '../../../../components/ui/Button';
import useColorApp from '../../../../hooks/useColorApp';

export type TTabsGenders = {
	text: 'Masculino' | 'Femenino'
}

export type TTabsGender = {
	[key in 'MALE' | 'FEMALE']: TTabsGenders;
}

export const TABS_GENDER: TTabsGender = {
	MALE: {
		text: 'Masculino',
	},
	FEMALE: {
		text: 'Femenino',
	},
};

interface IBodysButtonProps {
	activeTab: TTabsGenders;
	setActiveTab: Dispatch<SetStateAction<TTabsGenders>>;
}

const GenderButtons: FC<IBodysButtonProps> = (props) => {
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
			{Object.values(TABS_GENDER).map((i) => (
				<Button
					key={i.text}
					className='w-full'
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

export default GenderButtons;
