interface Cloud {
    cloud_name: string;
    cloud_description: string;
    geo_longitude: number;
    geo_latitude: number;
    geo_region: string;
    provider: string;
    provider_description: string;
}
interface Clouds {
    clouds: Array<Cloud>;
}

type SortDirection = 'asc' | 'desc';