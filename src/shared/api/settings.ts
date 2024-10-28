export type CertificateResponse<T> = {
	data: T[];
	result: number;
	resultdescription: string;
};

export type CertNumber = {
	CERTNUMBER: string;
};

export type OSaleRequestData = {
	ID: string;
	TABLENAME: string;
	PRIMARYKEY: string;
	SUMMA: string;
	PRICE: string;
	name: string;
	email: string;
	phone: string;
	message?: string;
};
