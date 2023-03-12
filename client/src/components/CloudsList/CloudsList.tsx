import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

export const CloudsList = ({ clouds }: { clouds: Clouds }) => {
    return (
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
    )
}