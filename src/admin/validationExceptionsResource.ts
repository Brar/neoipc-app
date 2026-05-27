import type { AdminResourceMetadata } from '../api/admin'
import type { AdminResourceType } from './AdminResourceType'

/**
 * Backend wire shape from
 * {@link NeoIPC.Reporting.Resources.AdminValidationExceptionMetadata}.
 */
export type AdminValidationExceptionMetadata = AdminResourceMetadata

export const validationExceptionsResource: AdminResourceType<AdminValidationExceptionMetadata> =
    {
        segment: 'validation-exceptions',
        title: 'Validation exceptions',
        singular: 'validation exception file',
        plural: 'Validation exception files',
        // Backend accepts any Content-Type and records it on the sidecar
        // (validation-exception pipeline only consumes CSV today, but the
        // server-side type bookkeeping is content-agnostic). Browser-detected
        // MIME is forwarded as-is.
        accept: 'text/csv,application/json,application/octet-stream',
        uploadContentType: null,
        displayNameHelp:
            'Operator-facing label. Partners reference this file by ID when generating a report.',
        extraColumns: [],
    }
