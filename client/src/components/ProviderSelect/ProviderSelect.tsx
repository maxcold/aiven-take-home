import { Select } from '@chakra-ui/react'
import React from 'react'

export const ProviderSelect = ({ providers, selectProvider }: { providers: Providers, selectProvider: React.ChangeEventHandler<HTMLSelectElement> }) => {
    return (
        <Select placeholder="Provider" onChange={selectProvider} data-cy="provider-selector">
            {
                providers.map((provider: Provider) => {
                    return <option key={provider.key} value={provider.key}>{provider.name}</option>
                })
            }
        </Select>
    )
}