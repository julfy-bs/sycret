import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	coverageReporters: ['text', 'cobertura', 'html'],
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	verbose: true,
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'\\.(woff2|png|svg|jpg)$': 'jest-transform-stub',
	},
	collectCoverageFrom: [
		'src/shared/ui/**/*.(js|ts|jsx|tsx)',
		'!src/shared/ui/**/*.stories.(js|ts|jsx|tsx)',
		'!src/components/**/*test-usemobile/.(js|ts|jsx|tsx)',
		'!src/assets/**',
		'!src/pages/**',
		'!src/shared/sass/**',
		'!src/shared/fonts/**',
		'!src/stories/**',
		'!src/app/App.tsx',
		'!src/app/main.tsx',
		'!src/vite-end.d.ts',
		'!src/**/styles.(js|ts|jsx|tsx)',
		'!src/**/styles/*.(js|ts|jsx|tsx)',
	],
	testPathIgnorePatterns: [
		'<rootDir>/src/components/ui-kit/test-usemobile/',
		'<rootDir>/dist/',
	],
};

export default config;
