interface Cloud {
    cloud_name: string;
    cloud_description: string;
    geo_longitude: number;
    geo_latitude: number;
    geo_region: string;
    provider: string;
    provider_description: string;
}

type Clouds = Array<Cloud>;
interface CloudsResponse {
    clouds: Array<Cloud>;
}

interface Provider {
    key: string;
    name: string;
}

type Providers = Array<Provider>;

type SortDirection = 'asc' | 'desc';