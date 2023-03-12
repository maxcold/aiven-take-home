import React, { useEffect, useState } from 'react'
import {
    Box,
    Heading,
    SimpleGrid
} from '@chakra-ui/react'

import { useGeolocation } from './useGeolocation'
import { ProviderSelect } from './components/ProviderSelect/ProviderSelect'
import { SortSelect } from './components/SortSelect/SortSelect'
import { CloudsList } from './components/CloudsList/CloudsList'

const baseUrl = 'http://localhost:8000'

function App() {
    const [clouds, setClouds] = useState([])
    const [providers, setProviders] = useState([])
    const [sort, setSort] = useState('')
    const [provider, setProvider] = useState('')
    const { latitude, longitude, error: geolocationError } = useGeolocation()
    const showSortControl = latitude && longitude && !geolocationError

    useEffect( () => {
        const queryParams = []
        let queryParamsString = ''

        if (sort) {
            queryParams.push(`sort=${sort}`)
            queryParams.push(`lat=${latitude}`)
            queryParams.push(`lon=${longitude}`)
        }

        if (provider) {
            queryParams.push(`provider=${provider}`)
        }

        queryParamsString = `?${queryParams.join('&')}`
        async function fetchClouds() {
            const response = await fetch(`${baseUrl}/clouds${queryParamsString}`)
            const data = await response.json()
            setClouds(data)
        }
        fetchClouds()
    }, [sort, provider])

    useEffect(() => {
        async function fetchProviders() {
            const response = await fetch(`${baseUrl}/clouds/providers`)
            const data = await response.json()
            setProviders(data)
        }
        fetchProviders()
    }, [])

    const selectProvider = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target) {
            setProvider(event.target.value)
        }
    }

    const selectSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target) {
            setSort(event.target.value)
        }
    }

    return (
        <Box margin={5}>
            <Heading size="md" as="h2" mb={5}>Available Aiven Clouds</Heading>
            <SimpleGrid columns={2} spacing={10} mb={5} w="50%">
                <ProviderSelect providers={providers} selectProvider={selectProvider} />
                {showSortControl && <SortSelect selectSort={selectSort} />}
            </SimpleGrid>
            <Box>
                <CloudsList clouds={clouds} />
            </Box>
        </Box>
    )
}

export default App
