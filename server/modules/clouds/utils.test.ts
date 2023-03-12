import { haversineDistance, sortCloudsByDistance, getUniqueProviders } from './utils'

const cloudsMock = [
    {
        'cloud_description': 'Australia, New South Wales - Azure: Australia East',
        'cloud_name': 'azure-australiaeast',
        'geo_latitude': -33.86,
        'geo_longitude': 151.2094,
        'geo_region': 'australia',
        'provider': 'azure',
        'provider_description': 'Microsoft Azure'
    },
    {
        'cloud_description': 'Europe, Germany - Azure: Germany North',
        'cloud_name': 'azure-germany-north',
        'geo_latitude': 53.073635,
        'geo_longitude': 8.806422,
        'geo_region': 'europe',
        'provider': 'azure',
        'provider_description': 'Microsoft Azure'
    },
    {
        'cloud_description': 'United States, New York - UpCloud: New York',
        'cloud_name': 'upcloud-us-nyc',
        'geo_latitude': 40.73,
        'geo_longitude': -73.94,
        'geo_region': 'north america',
        'provider': 'upcloud',
        'provider_description': 'UpCloud'
    }
]

describe('utils', () => {
    describe('haversineDistance', () => {
        it('should return the correct distance between Berlin and Moscow', () => {
            const distance = haversineDistance(52.520008, 13.404954, 55.751244, 37.618423)
            expect(distance).toBeCloseTo(1.6e6, -5)
        })
    })

    describe('sortCloudsByDistance', () => {
        it('should sort clouds closest to Berlin', () => {
            const clouds = [...cloudsMock]

            const sortedClouds = clouds.sort(sortCloudsByDistance('asc', 52.520008, 13.404954))

            expect(sortedClouds[0].cloud_name).toBe('azure-germany-north')
            expect(sortedClouds[1].cloud_name).toBe('upcloud-us-nyc')
            expect(sortedClouds[2].cloud_name).toBe('azure-australiaeast')
        })
    })

    describe('getUniqueProviders', () => {
        it('should return the correct unique list of cloud providers', () => {
            const clouds = [...cloudsMock]

            const uniqueProviders = getUniqueProviders(clouds)

            expect(uniqueProviders).toEqual([
                { key: 'azure', name: 'Microsoft Azure' },
                { key: 'upcloud', name: 'UpCloud' }
            ])
        })
    })
})