import {$authHost, $host} from "./index";

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    
    return data
}