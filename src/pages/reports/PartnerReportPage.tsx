import i18n from '@dhis2/d2-i18n'
import React, { FC } from 'react'
import { renderPartnerReport } from '../../api/reports'
import PartnerReportForm, {
    PartnerReportFormValues,
} from '../../forms/PartnerReportForm'
import ReportResultPanel from '../../render/ReportResultPanel'
import { useReportRender } from '../../render/useReportRender'

const PartnerReportPage: FC = () => {
    const render = useReportRender<PartnerReportFormValues>(renderPartnerReport)
    return (
        <>
            <h1>{i18n.t('Partner Report')}</h1>
            <PartnerReportForm
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

export default PartnerReportPage
