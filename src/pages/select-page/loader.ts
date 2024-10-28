import { API } from '../../shared/api/api.ts';
import { CertificateResponse } from '../../shared/api/settings.ts';

export async function loader(): Promise<CertificateResponse> {
	try {
		return await API.getGoodsList();
	} catch (e: any) {
		throw Error('Произошла ошибка при загрузке');
	}
}
