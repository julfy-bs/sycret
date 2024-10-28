import { Path, RegisterOptions } from 'react-hook-form';
import { Inputs } from '../types/inputs.ts';

type Schema<T> = {
	[key: string]: {
		ariaName: string;
		placeholder: string;
		fieldName: keyof T;
		options: RegisterOptions<Partial<T>, Path<Partial<T>>>;
	};
};

export const VALIDATION_SCHEMA: Schema<Inputs> = {
	name: {
		ariaName: 'ФИО *',
		placeholder: 'Введите сообщение.',
		fieldName: 'name',
		options: {
			required: 'Это поле нужно заполнить.',
			minLength: {
				value: 4,
				message: 'Нужно ввести как минимум 4 символа',
			},
			shouldUnregister: true,
		},
	},
	phone: {
		ariaName: 'Телефон *',
		placeholder: 'Введите номер телефона без +',
		fieldName: 'phone',
		options: {
			required: 'Это поле нужно заполнить.',
			minLength: {
				value: 11,
				message: 'Номер мобильного состоит из 11 цифр.',
			},
			shouldUnregister: true,
			pattern: {
				value:
					/^[0-9]{0,3}\W?.[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
				message: 'Нужно ввести существующий номер телефона.',
			},
		},
	},
	message: {
		ariaName: 'Сообщение',
		placeholder: 'Введите сообщение.',
		fieldName: 'message',
		options: {
			shouldUnregister: true,
			maxLength: {
				value: 2000,
				message: 'Длина сообщения должна быть менее 2000 символов.',
			},
		},
	},
	email: {
		ariaName: 'Почта *',
		placeholder: 'Введите сообщение.',
		fieldName: 'email',
		options: {
			required: 'Это поле нужно заполнить.',
			shouldUnregister: true,
			pattern: {
				value:
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				message: 'Нужно ввести существующий email.',
			},
		},
	},
};
