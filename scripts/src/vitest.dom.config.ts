import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['**/*.dom.test.ts', '**/*.dom.test.tsx', '**\\*.dom.test.ts', '**\\*.dom.test.tsx'],
		exclude: [...configDefaults.exclude, '__bun-tests__/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
	},
})
