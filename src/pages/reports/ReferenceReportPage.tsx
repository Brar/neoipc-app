import i18n from '@dhis2/d2-i18n'
import React, { FC } from 'react'
import ReferenceReportForm from '../../forms/ReferenceReportForm'

const ReferenceReportPage: FC = () => (
    <>
        <h1>{i18n.t('Reference Report')}</h1>
        <ReferenceReportForm />
    </>
)

export default ReferenceReportPage
