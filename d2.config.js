/** @type {import('@dhis2/cli-app-scripts').D2Config} */
const config = {
    type: 'app',
    name: 'neoipc-app',
    title: 'NeoIPC',
    description: 'NeoIPC report generation and administration',
    entryPoints: {
        app: './src/App.tsx',
    },
    minDHIS2Version: '2.40',
    customAuthorities: ['NEOIPC_ADMIN', 'NEOIPC_REPORT'],
    dataStoreNamespace: 'neoipc-app',
    shortcuts: [
        { name: 'Partner Report', url: '#/reports/partner' },
        { name: 'Reference Report', url: '#/reports/reference' },
        { name: 'Reference data', url: '#/admin/reference-data' },
        { name: 'Validation exceptions', url: '#/admin/validation-exceptions' },
    ],
    // Vite's default chunkSizeWarningLimit is 500 kB; most of our
    // baseline bundle is @dhis2/ui (the design system — ~hundreds of
    // components) which we can't meaningfully shrink. Bumping to
    // 1000 kB keeps the warning useful as a signal for *unexpected*
    // growth (a stray heavy dep landing in the shared bundle) without
    // crying wolf on every build.
    viteConfigExtensions: {
        build: {
            chunkSizeWarningLimit: 1000,
        },
    },
}

module.exports = config
