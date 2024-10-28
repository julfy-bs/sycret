import { Certificate } from '../types/certificate.ts';
import {
	CertificateResponse,
	CertNumber,
	OSaleRequestData,
} from './settings.ts';

interface IApi {
	url: string;
	getGoodsList(): Promise<CertificateResponse<Certificate[]>>;
	postCustomerInfo(
		data: OSaleRequestData
	): Promise<CertificateResponse<CertNumber>>;
}

type ApiConstructorProps = {
	url: string;
	apiKey: string;
};

class Api implements IApi {
	url: string;
	apiKey: string;
	ismob: number;

	constructor({ url, apiKey }: ApiConstructorProps) {
		this.url = url;
		this.apiKey = apiKey;
		this.ismob = 0;
	}

	async getGoodsList() {
		const url = this.concatUrlString('OSGetGoodList');
		const response = await fetch(url);
		return this.isResponse<CertificateResponse<Certificate[]>>(response);
	}

	async postCustomerInfo({
		ID,
		TABLENAME,
		SUMMA,
		PRIMARYKEY,
		PRICE,
		name,
		email,
		phone,
		message,
	}: OSaleRequestData) {
		const url = this.concatUrlString('OSSale');
		const generatedUrl = url.concat(
			`&Id=${ID}&TableName=${TABLENAME}&PrimaryKey=${PRIMARYKEY}&Price=${PRICE}&Summa=${SUMMA}&ClientName=${name}&Phone=${phone}&Email=${email}&PaymentTypeId=2&UseDelivery=0&Message=${message}`
		);
		const response = await fetch(generatedUrl);
		return this.isResponse<CertificateResponse<CertNumber>>(response);
	}

	private async isResponse<T>(res: Response): Promise<T> {
		return res.ok
			? ((await res.json()) as Promise<T>)
			: await res.json().then((err) => Promise.reject(err as Error));
	}

	private concatUrlString(methodName: string): string {
		return `${this.url}?ApiKey=${this.apiKey}&MethodName=${methodName}&ismob=${this.ismob}`;
	}
}

export const API = new Api({
	url: process.env.API!,
	apiKey: process.env.API_KEY!,
});
