import React, { Dispatch, FC, SetStateAction } from 'react';
import Button, { IButtonProps } from '../../../../components/ui/Button';
import useColorApp from '../../../../hooks/useColorApp';

export type TTabsBodys = {
	text: 'Frontal' | 'Posterior'
}

export type TTabsBody = {
	[key in 'FRONT' | 'BACK']: TTabsBodys;
}

export const TABS_BODYS: TTabsBody = {
	FRONT: {
		text: 'Frontal',
	},
	BACK: {
		text: 'Posterior',
	},
};

interface IBodysButtonProps {
	activeTab: TTabsBodys;
	setActiveTab: Dispatch<SetStateAction<TTabsBodys>>;
}

const BodyButtons: FC<IBodysButtonProps> = (props) => {
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
			{Object.values(TABS_BODYS).map((i) => (
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

export default BodyButtons;
