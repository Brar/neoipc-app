import React, { FC } from 'react'
import AdminListPage from '../../admin/AdminListPage'
import { validationExceptionsResource } from '../../admin/validationExceptionsResource'

const ValidationExceptionsPage: FC = () => (
    <AdminListPage resource={validationExceptionsResource} />
)

export default ValidationExceptionsPage
