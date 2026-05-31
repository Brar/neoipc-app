import { Center, CircularLoader } from '@dhis2/ui'
import React, { FC, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import type { MenuCategory } from '../menu/categories'

interface ContentAreaProps {
    visibleCategories: MenuCategory[]
}

/**
 * Route outlet for the shell's main pane. Renders the matched
 * category's lazy-loaded `Page`. Routes a user lacks authority for
 * are not declared at all — visiting one redirects to the first
 * visible category.
 */
const ContentArea: FC<ContentAreaProps> = ({ visibleCategories }) => {
    const fallbackId = visibleCategories[0]?.id ?? ''

    return (
        <Suspense
            fallback={
                <Center>
                    <CircularLoader />
                </Center>
            }
        >
            <Routes>
                {visibleCategories.map(({ id, Page }) => (
                    <Route key={id} path={id} element={<Page />} />
                ))}
                <Route
                    path="*"
                    element={<Navigate to={`/${fallbackId}`} replace />}
                />
            </Routes>
        </Suspense>
    )
}

export default ContentArea
