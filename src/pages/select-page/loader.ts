import { API } from '../../shared/api/api.ts';
import { CertificateResponse } from '../../shared/api/settings.ts';
import { Certificate } from '../../shared/types/certificate.ts';

export async function loader(): Promise<CertificateResponse<Certificate[]>> {
	try {
		return await API.getGoodsList();
	} catch (e: any) {
		throw Error('Произошла ошибка при загрузке');
	}
}
