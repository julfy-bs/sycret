import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Certificate } from '../../../../shared/types/certificate.ts';
import { CertificatesState } from '../../../../shared/types/state.ts';

const initialState: CertificatesState = {
	certificates: null,
	current: null,
	orderId: null,
};

const certificatesSlice = createSlice({
	name: 'certificates',
	initialState: initialState,
	reducers: {
		loadCertificates(state, action: PayloadAction<Certificate[]>) {
			state.certificates = action.payload;
		},
		setCurrentCertificate(state, action: PayloadAction<Certificate>) {
			state.current = action.payload;
		},
		setOrderId(state, action: PayloadAction<string>) {
			state.orderId = action.payload;
		},
	},
});

export const { loadCertificates, setCurrentCertificate, setOrderId } =
	certificatesSlice.actions;
export default certificatesSlice.reducer;
