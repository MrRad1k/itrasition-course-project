import { $host } from "./index";

export const fetchOneReview = async (id) => {
    const { data } = await $host.get('api/review/' + id, {
        mode: 'cors',
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
    return data
}