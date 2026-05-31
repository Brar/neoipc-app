import i18n from '@dhis2/d2-i18n'
import {
    Button,
    Card,
    CheckboxField,
    FileInput,
    InputField,
    MultiSelectField,
    MultiSelectOption,
    Radio,
    SingleSelectField,
    SingleSelectOption,
} from '@dhis2/ui'
import React, { FC, useState } from 'react'
import { DEPARTMENT_LEVEL } from '../config/dhis2Constants'
import DateField from './fields/DateField'
import NumberRangeField from './fields/NumberRangeField'
import OrganisationUnitMultiSelect from './fields/OrganisationUnitMultiSelect'
import {
    ConfidenceIntervalMode,
    ConfidenceIntervalModeValues,
    confidenceIntervalModeLabel,
    PartnerReportElement,
    PartnerReportElementValues,
    reportElementLabel,
} from './enums'

type PartnerReportMode = 'online' | 'dataFile'

/**
 * Mirrors the on-the-wire shape the Partner-Report endpoints accept,
 * minus the file body (carried separately in `dataFile` mode) and the
 * locale override (lives in {@link PartnerReportFormValues.locale}).
 *
 * Drift-checked against
 * `repos/NeoIPC-Reporting/src/NeoIPC.Reporting/PartnerReportApiParameters.cs`
 * by `scripts/check-schema-drift.mjs`.
 */
export interface PartnerReportFormValues {
    mode: PartnerReportMode
    /** dataFile mode only: JSON file body. `null` until the user picks one. */
    dataFile: File | null
    referenceDataFile: string
    profile: string
    validationExceptionFile: string
    enabledElements: PartnerReportElement[]
    disabledElements: PartnerReportElement[]
    /** online mode only: department orgUnit codes to aggregate. */
    unitCodes: string[]
    reportingPeriodFrom: string
    reportingPeriodTo: string
    birthWeightFrom: number | null
    birthWeightTo: number | null
    gestationalAgeFrom: number | null
    gestationalAgeTo: number | null
    includeNonCorePatients: boolean
    includeTestData: boolean
    sparseDataThreshold: number | null
    confidenceIntervals: ConfidenceIntervalMode | ''
    includeIntroductionTexts: boolean
    includeMethodsTexts: boolean
    includeOutlierInterpretation: boolean
    locale: string
    outputFormat: 'html' | 'pdf'
}

const defaultValues: PartnerReportFormValues = {
    mode: 'online',
    dataFile: null,
    referenceDataFile: '',
    profile: '',
    validationExceptionFile: '',
    enabledElements: [],
    disabledElements: [],
    unitCodes: [],
    reportingPeriodFrom: '',
    reportingPeriodTo: '',
    birthWeightFrom: null,
    birthWeightTo: null,
    gestationalAgeFrom: null,
    gestationalAgeTo: null,
    includeNonCorePatients: false,
    includeTestData: false,
    sparseDataThreshold: null,
    confidenceIntervals: '',
    includeIntroductionTexts: true,
    includeMethodsTexts: true,
    includeOutlierInterpretation: true,
    locale: '',
    outputFormat: 'html',
}

const LOCALE_OPTIONS = ['', 'en', 'de'] as const

interface PartnerReportFormProps {
    onSubmit?: (values: PartnerReportFormValues) => void
    /** Disable the submit button and show a loading spinner on it. */
    submitting?: boolean
}

const PartnerReportForm: FC<PartnerReportFormProps> = ({
    onSubmit,
    submitting = false,
}) => {
    const [values, setValues] = useState<PartnerReportFormValues>(defaultValues)

    const setField = <K extends keyof PartnerReportFormValues>(key: K) =>
        (value: PartnerReportFormValues[K]) =>
            setValues((prev) => ({ ...prev, [key]: value }))

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                onSubmit?.(values)
            }}
        >
            <Card>
                <fieldset>
                    <legend>{i18n.t('Output format')}</legend>
                    <Radio
                        name="outputFormat"
                        label={i18n.t('View as HTML')}
                        value="html"
                        checked={values.outputFormat === 'html'}
                        onChange={() => setField('outputFormat')('html')}
                    />
                    <Radio
                        name="outputFormat"
                        label={i18n.t('Download as PDF')}
                        value="pdf"
                        checked={values.outputFormat === 'pdf'}
                        onChange={() => setField('outputFormat')('pdf')}
                    />
                </fieldset>
                <fieldset>
                    <legend>{i18n.t('Data source')}</legend>
                    <Radio
                        name="mode"
                        label={i18n.t('Online — pull current DHIS2 data')}
                        value="online"
                        checked={values.mode === 'online'}
                        onChange={() => setField('mode')('online')}
                    />
                    <Radio
                        name="mode"
                        label={i18n.t('Upload partner data file (JSON)')}
                        value="dataFile"
                        checked={values.mode === 'dataFile'}
                        onChange={() => setField('mode')('dataFile')}
                    />
                    {values.mode === 'dataFile' && (
                        <FileInput
                            name="dataFile"
                            accept="application/json"
                            onChange={({ files }) =>
                                setField('dataFile')(files?.[0] ?? null)
                            }
                        />
                    )}
                </fieldset>
            </Card>

            {values.mode === 'online' && (
                <Card>
                    <h2>{i18n.t('Scope')}</h2>
                    <OrganisationUnitMultiSelect
                        name="unitCodes"
                        label={i18n.t('Departments')}
                        helpText={i18n.t(
                            'Pick one or more departments. The report ' +
                                'aggregates across the selected set.'
                        )}
                        level={DEPARTMENT_LEVEL}
                        showParentInLabel
                        selectedCodes={values.unitCodes}
                        onChange={setField('unitCodes')}
                    />
                    <CheckboxField
                        name="includeNonCorePatients"
                        label={i18n.t('Include non-core patients')}
                        checked={values.includeNonCorePatients}
                        onChange={({ checked }) =>
                            setField('includeNonCorePatients')(checked)
                        }
                    />
                    <CheckboxField
                        name="includeTestData"
                        label={i18n.t('Include test data')}
                        checked={values.includeTestData}
                        onChange={({ checked }) =>
                            setField('includeTestData')(checked)
                        }
                    />
                </Card>
            )}

            <Card>
                <h2>{i18n.t('Reporting period')}</h2>
                <DateField
                    name="reportingPeriodFrom"
                    label={i18n.t('From')}
                    value={values.reportingPeriodFrom}
                    onChange={setField('reportingPeriodFrom')}
                />
                <DateField
                    name="reportingPeriodTo"
                    label={i18n.t('To')}
                    value={values.reportingPeriodTo}
                    onChange={setField('reportingPeriodTo')}
                />
            </Card>

            <Card>
                <h2>{i18n.t('Patient population filters')}</h2>
                <NumberRangeField
                    name="birthWeight"
                    label={i18n.t('Birth weight (g)')}
                    fromValue={values.birthWeightFrom}
                    toValue={values.birthWeightTo}
                    onFromChange={setField('birthWeightFrom')}
                    onToChange={setField('birthWeightTo')}
                    min={0}
                    max={65535}
                />
                <NumberRangeField
                    name="gestationalAge"
                    label={i18n.t('Gestational age (weeks)')}
                    fromValue={values.gestationalAgeFrom}
                    toValue={values.gestationalAgeTo}
                    onFromChange={setField('gestationalAgeFrom')}
                    onToChange={setField('gestationalAgeTo')}
                    min={0}
                    max={52}
                />
            </Card>

            <Card>
                <h2>{i18n.t('Output options')}</h2>
                <InputField
                    label={i18n.t('Quarto profile')}
                    name="profile"
                    helpText={i18n.t(
                        'Optional. Leave blank for the default profile.'
                    )}
                    value={values.profile}
                    onChange={({ value }) =>
                        setField('profile')(value ?? '')
                    }
                />
                <InputField
                    label={i18n.t('Validation exception file ID')}
                    name="validationExceptionFile"
                    helpText={i18n.t(
                        'Optional. Pick from the admin-managed list ' +
                            '(picker UI lands in a later commit).'
                    )}
                    value={values.validationExceptionFile}
                    onChange={({ value }) =>
                        setField('validationExceptionFile')(value ?? '')
                    }
                />
                <SingleSelectField
                    label={i18n.t('Confidence intervals')}
                    helpText={i18n.t(
                        'Backend default if unset.'
                    )}
                    selected={values.confidenceIntervals}
                    onChange={({ selected }) =>
                        setField('confidenceIntervals')(
                            selected as ConfidenceIntervalMode | ''
                        )
                    }
                >
                    <SingleSelectOption
                        value=""
                        label={i18n.t('(backend default)')}
                    />
                    {ConfidenceIntervalModeValues.map((mode) => (
                        <SingleSelectOption
                            key={mode}
                            value={mode}
                            label={confidenceIntervalModeLabel(mode)}
                        />
                    ))}
                </SingleSelectField>
                <InputField
                    label={i18n.t('Sparse data threshold')}
                    name="sparseDataThreshold"
                    type="number"
                    value={
                        values.sparseDataThreshold === null
                            ? ''
                            : String(values.sparseDataThreshold)
                    }
                    onChange={({ value }) =>
                        setField('sparseDataThreshold')(
                            value === '' || value === undefined
                                ? null
                                : Number(value)
                        )
                    }
                />
                <CheckboxField
                    name="includeIntroductionTexts"
                    label={i18n.t('Include introduction texts')}
                    checked={values.includeIntroductionTexts}
                    onChange={({ checked }) =>
                        setField('includeIntroductionTexts')(checked)
                    }
                />
                <CheckboxField
                    name="includeMethodsTexts"
                    label={i18n.t('Include methods texts')}
                    checked={values.includeMethodsTexts}
                    onChange={({ checked }) =>
                        setField('includeMethodsTexts')(checked)
                    }
                />
                <CheckboxField
                    name="includeOutlierInterpretation"
                    label={i18n.t('Include outlier interpretation')}
                    checked={values.includeOutlierInterpretation}
                    onChange={({ checked }) =>
                        setField('includeOutlierInterpretation')(checked)
                    }
                />
            </Card>

            <Card>
                <h2>{i18n.t('Element toggles')}</h2>
                <MultiSelectField
                    label={i18n.t('Enabled elements (override defaults)')}
                    helpText={i18n.t(
                        'Leave empty to use the backend defaults.'
                    )}
                    selected={values.enabledElements}
                    onChange={({ selected }) =>
                        setField('enabledElements')(
                            selected as PartnerReportElement[]
                        )
                    }
                >
                    {PartnerReportElementValues.map((element) => (
                        <MultiSelectOption
                            key={element}
                            value={element}
                            label={reportElementLabel(element)}
                        />
                    ))}
                </MultiSelectField>
                <MultiSelectField
                    label={i18n.t('Disabled elements (override defaults)')}
                    selected={values.disabledElements}
                    onChange={({ selected }) =>
                        setField('disabledElements')(
                            selected as PartnerReportElement[]
                        )
                    }
                >
                    {PartnerReportElementValues.map((element) => (
                        <MultiSelectOption
                            key={element}
                            value={element}
                            label={reportElementLabel(element)}
                        />
                    ))}
                </MultiSelectField>
            </Card>

            <Card>
                <h2>{i18n.t('Locale')}</h2>
                <SingleSelectField
                    label={i18n.t('Report locale')}
                    helpText={i18n.t(
                        'Leave blank to use the locale from your DHIS2 user setting.'
                    )}
                    selected={values.locale}
                    onChange={({ selected }) =>
                        setField('locale')(selected ?? '')
                    }
                >
                    <SingleSelectOption
                        value=""
                        label={i18n.t('(use DHIS2 user setting)')}
                    />
                    {LOCALE_OPTIONS.slice(1).map((loc) => (
                        <SingleSelectOption
                            key={loc}
                            value={loc}
                            label={loc}
                        />
                    ))}
                </SingleSelectField>
            </Card>

            <Button primary type="submit" disabled={submitting} loading={submitting}>
                {i18n.t('Generate')}
            </Button>
        </form>
    )
}

export default PartnerReportForm
