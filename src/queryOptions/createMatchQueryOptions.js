import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export default function createMatchQueryOptions(id){
    
    return queryOptions({
        queryKey : ['foryou', id],
        queryFn : () => getMatchdata(id*6)
    })
}

export function createMatchInfiniteQueryOptions(){
    return infiniteQueryOptions({
        queryKey : ['foryou'],
        queryFn : ({pageParam}) => getMatchdata({page:pageParam,limit:6}),
        initialPageParam : 1,
        getNextPageParam : (lastPage)=>{
           if (!lastPage || !lastPage.resp) {
                // Defensive fallback: no more pages
                return undefined;
            }

            const { limit, total, skip } = lastPage.resp;

            // Defensive validation of numbers
            if (typeof limit !== "number" || typeof total !== "number" || typeof skip !== "number") {
                return undefined;
            }

            // Calculate next page index
            const nextPage = (skip / limit) + 1;

            // Stop if nextPage exceeds total pages
            const totalPages = Math.ceil(total / limit);
            if (nextPage >= totalPages) {
                return undefined; // No next page
            }

            return nextPage; // Load next page
            },
    })
}

const getMatchdata = async(param)=>{
    const {page,limit} = param
    const req = await fetch(`/api/match?skip=${page*6}&limit=${limit}`)
    if(!req.ok) {
        toast('fetch error')
        return undefined
    }
    return await req.json()
}