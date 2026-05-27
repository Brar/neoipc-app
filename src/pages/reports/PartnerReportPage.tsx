import i18n from '@dhis2/d2-i18n'
import React, { FC } from 'react'
import PartnerReportForm from '../../forms/PartnerReportForm'

const PartnerReportPage: FC = () => (
    <>
        <h1>{i18n.t('Partner Report')}</h1>
        <PartnerReportForm />
    </>
)

export default PartnerReportPage
