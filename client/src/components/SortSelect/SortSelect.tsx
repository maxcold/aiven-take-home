import { Select } from '@chakra-ui/react'
import React from 'react'

export const SortSelect = ({ selectSort }: { selectSort: React.ChangeEventHandler<HTMLSelectElement> }) => {
    return (
        <Select placeholder="Sort" onChange={selectSort} data-cy="sort-selector">
            <option value="geo_asc">Closest</option>
            <option value="geo_desc">Farthest</option>
        </Select>
    )
}