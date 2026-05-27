import React, { FC } from 'react'
import AdminListPage from '../../admin/AdminListPage'
import { referenceDataResource } from '../../admin/referenceDataResource'

const ReferenceDataPage: FC = () => (
    <AdminListPage resource={referenceDataResource} />
)

export default ReferenceDataPage
