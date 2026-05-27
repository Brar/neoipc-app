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
}

module.exports = config
