import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import BasicSelect, { SelectChangeEvent } from '@mui/material/Select';
import { ReactElement, useCallback } from 'react';
import { Certificate } from '../../types/certificate.ts';

type SelectProps = {
	id: string;
	label: string;
	labelId: string;
	items: Certificate[];
	current: Certificate | null;
	onChange: (currentCertificate: Certificate) => void;
	boxStyles?: SxProps;
};

export function UISelect({
	id,
	label,
	labelId,
	items,
	boxStyles,
	current,
	onChange,
}: SelectProps): ReactElement {
	const handleChange = useCallback(
		(event: SelectChangeEvent) => {
			const currentCertificate =
				items.find((item) => item.ID === event.target.value) ?? null;
			if (!currentCertificate || !onChange) {
				return;
			} else {
				onChange(currentCertificate);
			}
		},
		[items, onChange]
	);

	return (
		<Box sx={{ minWidth: 120, ...boxStyles }}>
			<FormControl fullWidth>
				<InputLabel id={labelId}>{label}</InputLabel>
				<BasicSelect
					labelId={labelId}
					id={id}
					value={current?.ID ? current.ID : ''}
					label={label}
					onChange={handleChange}
					required={true}
					disabled={items.length === 0}
				>
					{items.map((menuItem) => (
						<MenuItem key={menuItem.ID} value={menuItem.ID}>
							{menuItem.NAME}
						</MenuItem>
					))}
				</BasicSelect>
			</FormControl>
		</Box>
	);
}
