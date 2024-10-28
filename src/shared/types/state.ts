import { Certificate } from './certificate.ts';

export interface CertificatesState {
	certificates: Certificate[] | null;
	current: Certificate | null;
	orderId: string | null;
}
