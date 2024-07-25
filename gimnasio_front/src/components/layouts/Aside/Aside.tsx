import React, { FC, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import useAsideStatus from '../../../hooks/useAsideStatus';
import themeConfig from '../../../config/theme.config';
import { useAppSelector } from '../../../store';
import { RootState } from '../../../store/rootReducer';

interface IAsideHeadProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
	className?: string;
}
export const AsideHead: FC<IAsideHeadProps> = (props) => {
	const { children, className, ...rest } = props;

	return (
		<div
			data-component-name='Aside/AsideHead'
			className={classNames(
				'flex items-center justify-between px-6 pb-6 max-md:flex-row-reverse',
				className,
			)}
			{...rest}>
			{children}
		</div>
	);
};
AsideHead.defaultProps = {
	className: undefined,
};

interface IAsideBodyProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
	className?: string;
}
export const AsideBody: FC<IAsideBodyProps> = (props) => {
	const { children, className, ...rest } = props;

	return (
		<div
			data-component-name='Aside/AsideBody'
			className={classNames('h-full overflow-x-scroll px-6', 'no-scrollbar', className)}
			{...rest}>
			{children}
		</div>
	);
};
AsideBody.defaultProps = {
	className: undefined,
};

interface IAsideFooterProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
	className?: string;
}
export const AsideFooter: FC<IAsideFooterProps> = (props) => {
	const { children, className, ...rest } = props;

	return (
		<div
			data-component-name='Aside/AsideFooter'
			className={classNames('px-6', className)}
			{...rest}>
			{children}
		</div>
	);
};
AsideFooter.defaultProps = {
	className: undefined,
};

interface IAsideProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
	className?: string;
}
const Aside: FC<IAsideProps> = (props) => {
	const { children, className, ...rest } = props;

	const { asideStatus } = useAsideStatus()
	const { configuracion } = useAppSelector((state: RootState) => state.auth.user)
	const { colorApp } = useAppSelector((state: RootState) => state.auth.user)
	

	const colorMap: Record<string, string> = {
		cyan: 'dark:bg-cyan-900',
		red: 'dark:bg-red-900',
		violet: 'dark:bg-violet-900',
		amber: 'dark:bg-amber-900',
		emerald: 'dark:bg-emerald-900',
		default: 'dark:bg-zinc-900'
	};
	const bgClass = colorMap[colorApp!] || colorMap[configuracion?.color_aplicacion!];


	return (
		<aside
			data-component-name='Aside'
			className={classNames(
				'peer',
				'fixed bottom-0 top-0 z-30 md:z-20',
				'flex flex-col',
				'border-zinc-300/25 bg-white',
				'py-6',
				'ltr:border-r rtl:border-l',
				`dark:border-zinc-800/50 ${bgClass} dark:text-white`,
				themeConfig.transition,
				className,
				// Mobile Design
				'max-md:w-[20rem] max-md:shadow-2xl ltr:max-md:-left-[20rem] rtl:max-md:-right-[20rem]',
				{
					'md:w-[20rem]': asideStatus,
					'md:w-[6.225em]': !asideStatus,
					'ltr:max-md:-left-[20rem] rtl:max-md:-right-[20rem]': !asideStatus,
					'ltr:max-md:left-0 rtl:max-md:right-0': asideStatus,
				},
			)}
			{...rest}>
			{children}
		</aside>
	);
};
Aside.defaultProps = {
	className: undefined,
};

export default Aside;
