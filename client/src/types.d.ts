type Providers = Provider[]

interface Provider {
    key: string,
    name: string
}

type Clouds = Cloud[]

interface Cloud {
    cloud_name: string,
    provider: string,
    cloud_description: string
}