import i18n from '@dhis2/d2-i18n'
import React, { FC } from 'react'
import { renderReferenceReport } from '../../api/reports'
import ReferenceReportForm, {
    ReferenceReportFormValues,
} from '../../forms/ReferenceReportForm'
import ReportResultPanel from '../../render/ReportResultPanel'
import { useReportRender } from '../../render/useReportRender'

const ReferenceReportPage: FC = () => {
    const render = useReportRender<ReferenceReportFormValues>(
        renderReferenceReport
    )
    return (
        <>
            <h1>{i18n.t('Reference Report')}</h1>
            <ReferenceReportForm
                onSubmit={render.submit}
                submitting={render.loading}
            />
            <ReportResultPanel
                loading={render.loading}
                elapsedSeconds={render.elapsedSeconds}
                fragmentHtml={render.result?.fragmentHtml ?? null}
                error={render.error}
            />
        </>
    )
}

export default ReferenceReportPage
