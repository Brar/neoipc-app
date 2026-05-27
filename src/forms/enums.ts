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

export const ConfidenceIntervalModeValues = ['All', 'Rate', 'None'] as const

export type ConfidenceIntervalMode = (typeof ConfidenceIntervalModeValues)[number]
