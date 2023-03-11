import { useState } from 'react'
import {
    Box,
    Container,
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
} from "@chakra-ui/react";

import reactLogo from './assets/react.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <Box margin={5}>
            <Heading size="md" as="h2" mb={5}>Available Aiven Clouds</Heading>
            <SimpleGrid columns={2} spacing={10} mb={5} w="50%">
                <Select placeholder="Provider">
                    <option value="aws">Amazon Web Services</option>
                    <option value="azure">Microsoft Azure</option>
                    <option value="google">Google Cloud Platform</option>
                </Select>
                <Select placeholder="Sort">
                    <option value="geo-asc">Closest</option>
                    <option value="geo-desc">Farthest</option>
                </Select>
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
                            <Tr>
                                <Td>aws-af-south-1</Td>
                                <Td>Amazon Web Services</Td>
                                <Td>Africa, South Africa - Amazon Web Services: Cape Town</Td>
                            </Tr>
                            <Tr>
                                <Td>azure-south-africa-north</Td>
                                <Td>Microsoft Azure</Td>
                                <Td>Africa, South Africa - Azure: South Africa North</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default App
