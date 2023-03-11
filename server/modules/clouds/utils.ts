// Haversine Distance formula to calculate distance between two points on a perfect sphere
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth radius in metres
    const f1 = lat1 * Math.PI / 180;
    const f2 = lat2 * Math.PI / 180;
    const df = (lat2 - lat1) * Math.PI / 180;
    const dl = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(df / 2) * Math.sin(df / 2) +
        Math.cos(f1) * Math.cos(f2) *
        Math.sin(dl / 2) * Math.sin(dl / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // distance in metres
    return d;
}

export const sortCloudsByDistance = (direction: SortDirection, lat: number, lon: number) => {
    return (cloudA: Cloud, cloudB: Cloud) => {
        const cloudADistance = haversineDistance(cloudA.geo_latitude, cloudA.geo_longitude, lat, lon)
        const cloudBDistance = haversineDistance(cloudB.geo_latitude, cloudB.geo_longitude, lat, lon)

        if (direction === 'asc') {
            return cloudADistance - cloudBDistance;
        } else if (direction === 'desc') {
            return cloudBDistance - cloudADistance;
        } else {
            return 0;
        }
    }
}