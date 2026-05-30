import i18n from '@dhis2/d2-i18n'

/**
 * Vendored copies of the backend's report-parameter enums. Kept in
 * sync with the corresponding C# enums in
 * `repos/NeoIPC-Reporting/src/NeoIPC.Reporting/`:
 *
 *   - {@link PartnerReportElementValues}: `PartnerReportElement.cs`
 *   - {@link ReferenceReportElementValues}: `ReferenceReportElement.cs`
 *   - {@link ReferenceReportSectionTextValues}: `ReferenceReportElement.cs`
 *   - {@link ConfidenceIntervalModeValues}: `ConfidenceIntervalMode.cs`
 *
 * The schema-as-contract drift check (`scripts/check-schema-drift.mjs`)
 * verifies these lists against the vendored
 * `src/schemas/*-report.json` snapshots and against the backend's
 * compiled `<Report>ApiParameters.Schema` arrays. Backend rename or
 * insert: schema-drift check fails, this file gets updated, form
 * spec updated, all in the same change.
 */

export const PartnerReportElementValues = [
    'BirthWeightFigure',
    'GestationalAgeFigure',
    'IncidenceDensityTable',
    'DeviceAssociatedIncidenceDensityTable',
    'AgentPerInfectionRateTable',
    'InfectiousAgentDetectionRateTable',
    'RiskDensityRateTable',
    'AntibioticUtilisationTable',
    'SurgicalProcedureRateTable',
    'ResistantPathogenInfectionRateTable',
    'OrganismResistanceRateTable',
    'AntibioticResistanceTestRateTable',
    'SecondaryBsiRateTable',
] as const

export type PartnerReportElement = (typeof PartnerReportElementValues)[number]

export const ReferenceReportElementValues = [
    'BirthWeightFigure',
    'GestationalAgeFigure',
    'IncidenceDensityTable',
    'DeviceAssociatedIncidenceDensityTable',
    'AgentPerInfectionRateTable',
    'ResistantPathogenInfectionRateTable',
    'OrganismResistanceRateTable',
    'InfectiousAgentDetectionRateTable',
    'AntibioticResistanceTestRateTable',
    'RiskDensityRateTable',
    'AntibioticUtilisationTable',
    'SurgicalProcedureRateTable',
    'SecondaryBsiRateTable',
] as const

export type ReferenceReportElement = (typeof ReferenceReportElementValues)[number]

export const ReferenceReportSectionTextValues = [
    'PatientPopulation',
    'Nosocomial',
    'InfectiousAgents',
    'RiskFactors',
    'Surgery',
] as const

export type ReferenceReportSectionText =
    (typeof ReferenceReportSectionTextValues)[number]

/**
 * Wire values for the `confidenceIntervals` query parameter. The backend
 * (`ConfidenceIntervalMode.cs` and the vendored `partner-report.json` /
 * `reference-report.json` schemas) declares the accepted values as
 * lowercase tokens, so these strings go directly onto the wire.
 *
 * Use {@link confidenceIntervalModeLabel} to render a localised
 * title-cased label for UI display.
 */
export const ConfidenceIntervalModeValues = ['all', 'rate', 'none'] as const

export type ConfidenceIntervalMode = (typeof ConfidenceIntervalModeValues)[number]

/**
 * Localised display label for a {@link ConfidenceIntervalMode}. Uses a
 * switch with literal `i18n.t('...')` calls so the d2-i18n extractor
 * picks the strings up into `i18n/en.pot`; passing `mode` directly to
 * `i18n.t` would be a dynamic argument that the extractor skips.
 */
export const confidenceIntervalModeLabel = (
    mode: ConfidenceIntervalMode
): string => {
    switch (mode) {
        case 'all':
            return i18n.t('All')
        case 'rate':
            return i18n.t('Rate')
        case 'none':
            return i18n.t('None')
    }
}
