import React, { cloneElement, FC, ReactElement } from 'react';

export interface IValidationBaseProps {
	isValidMessage?: boolean;
	isValid?: boolean;
	isTouched?: boolean | undefined;
	invalidFeedback?: string | undefined;
	validFeedback?: string;
}

interface IValidationProps extends IValidationBaseProps {
	children: ReactElement;
}
const Validation: FC<IValidationProps> = (props) => {
	const { children, isValidMessage, isValid, isTouched, invalidFeedback, validFeedback } = props;

	const touched = Boolean(isTouched); // Asegúrate de que sea un booleano

	return (
		<>
			{cloneElement(children, {
				isValid,
				isTouched: touched,
				invalidFeedback,
			})}
			{isValidMessage && !isValid && touched && (
				<>
					{invalidFeedback && (
						<div
							data-component-name='Validation'
							className='mt-2 text-xs text-red-500/70'>
							{invalidFeedback
								.split('.')
								.filter((i) => i !== '')
								.map((i) => (
									<p key={i}>{i}.</p>
								))}
						</div>
					)}
					{!invalidFeedback && validFeedback && (
						<div
							data-component-name='Validation'
							className='mt-2 text-xs text-green-500/70'>
							{validFeedback
								.split('.')
								.filter((i) => i !== '')
								.map((i) => (
									<p key={i}>{i}.</p>
								))}
						</div>
					)}
				</>
			)}
		</>
	);
};

Validation.defaultProps = {
	isValidMessage: true,
	validFeedback: undefined,
};

export default Validation;
