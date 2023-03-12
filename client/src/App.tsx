import React, { useEffect, useState } from 'react'
import {
    Box,
    Heading,
    Select,
    SimpleGrid,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react'

import { useGeolocation } from './useGeolocation'

interface Provider {
    key: string,
    name: string
}

interface Cloud {
    cloud_name: string,
    provider: string,
    cloud_description: string
}

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
                <Select placeholder="Provider" onChange={selectProvider}>
                    {
                        providers.map((provider: Provider) => {
                            return <option key={provider.key} value={provider.key}>{provider.name}</option>
                        })
                    }
                </Select>
                {showSortControl && (
                    <Select placeholder="Sort" onChange={selectSort}>
                        <option value="geo_asc">Closest</option>
                        <option value="geo_desc">Farthest</option>
                    </Select>
                )}
            </SimpleGrid>
            <Box>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Provider</Th>
                                <Th>Description</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                clouds.map((cloud: Cloud) => (
                                    <Tr key={cloud.cloud_name}>
                                        <Td>{cloud.cloud_name}</Td>
                                        <Td>{cloud.provider}</Td>
                                        <Td>{cloud.cloud_description}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default App
