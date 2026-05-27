import type { PublicReferenceDataMetadata } from '../AppContext'
import { fetchNeoipcReporting } from './neoipcReporting'

/**
 * Fetch the public reference-data listing — the set of saved reference
 * datasets a partner can pick when rendering the Reference Report.
 * Maps to `GET /neoipc/api/reference-data` on the deployed instance.
 */
export const loadReferenceDataSets = async (
    baseUrl: string
): Promise<PublicReferenceDataMetadata[]> => {
    const response = await fetchNeoipcReporting(baseUrl, '/reference-data')
    return (await response.json()) as PublicReferenceDataMetadata[]
}
