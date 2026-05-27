import { CustomDataProvider } from '@dhis2/app-runtime'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const mockData = {
    me: {
        id: 'test-user',
        authorities: [],
    },
}

beforeAll(() => {
    Object.defineProperty(globalThis, 'fetch', {
        configurable: true,
        value: () =>
            Promise.resolve(
                new Response(JSON.stringify([]), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                })
            ),
    })
})

it('renders without crashing', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const root = createRoot(container)
    root.render(
        <CustomDataProvider data={mockData}>
            <App />
        </CustomDataProvider>
    )

    root.unmount()
    container.remove()
})
