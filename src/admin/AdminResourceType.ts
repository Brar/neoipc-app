import type { ReactNode } from 'react'
import type { AdminResourceMetadata } from '../api/admin'

/**
 * Configuration for one admin-managed resource family. Drives the
 * generic {@link AdminListPage} component so a new resource family
 * (e.g. signature images, certificate templates) can be added by
 * dropping in another config — no per-resource page component
 * needed.
 */
export interface AdminResourceType<
    T extends AdminResourceMetadata = AdminResourceMetadata,
> {
    /** URL segment under `/neoipc/api/admin/` (e.g. `reference-data`). */
    segment: string
    /** Page heading. */
    title: string
    /** Singular label for snackbars: "reference dataset", "validation exception file". */
    singular: string
    /** Plural label for headings / counts: "reference datasets". */
    plural: string
    /** `accept` attribute on the file input (`application/json`, `text/csv`, …). */
    accept: string
    /**
     * `Content-Type` to send on upload. `null` uses the File's own MIME
     * — appropriate when the backend records and replays the type
     * (validation-exceptions). Reference-data **requires** an explicit
     * `application/json` per the backend.
     */
    uploadContentType: string | null
    /** Help text for the displayName input, if any. */
    displayNameHelp?: string
    /** Resource-specific columns rendered after the standard ones. */
    extraColumns: ReadonlyArray<AdminResourceColumn<T>>
}

export interface AdminResourceColumn<T extends AdminResourceMetadata> {
    /** Column header. */
    label: string
    /** Cell renderer; returns React-renderable content. */
    render: (item: T) => ReactNode
}
