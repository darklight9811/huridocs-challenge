import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		projects: [
			{
				test: {
					name: 'node',
					globals: true,
					environment: 'node',
					setupFiles: ['scripts/src/vitest.setup.ts'],
					include: [
						'packages/**/*.test.ts',
						'packages/**/*.test.tsx',
						'apps/**/*.test.ts',
						'apps/**/*.test.tsx',
						'scripts/**/*.test.ts',
						'scripts/**/*.test.tsx',
					],
					exclude: [
						...configDefaults.exclude,
						'__bun-tests__/**',
						'**/sql.test.ts',
						'**/*.sql.test.ts',
						'**\\sql.test.ts',
						'**\\*.sql.test.ts',
						'**/*.dom.test.ts',
						'**/*.dom.test.tsx',
						'**\\*.dom.test.ts',
						'**\\*.dom.test.tsx',
					],
				},
			},
			{
				test: {
					name: 'dom',
					globals: true,
					environment: 'jsdom',
					setupFiles: ['scripts/src/vitest.setup.ts'],
					include: [
						'packages/**/*.dom.test.ts',
						'packages/**/*.dom.test.tsx',
						'apps/**/*.dom.test.ts',
						'apps/**/*.dom.test.tsx',
						'scripts/**/*.dom.test.ts',
						'scripts/**/*.dom.test.tsx',
					],
					exclude: [...configDefaults.exclude, '__bun-tests__/**'],
				},
			},
		],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
	},
})
