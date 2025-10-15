
export async function GET(request) {
    // const searchParams = request.nextUrl.searchParams
    // const param = searchParams.get('searchterm')

    try{
        const req = await fetch(`https://dummyjson.com/posts?limit=5`)
        if(!req.ok) return Response.json({message : 'search error'}, {status:400})
        const resp = await req.json()
        return Response.json({...resp},{status:200})

    } catch(e){
        return Response.json({error:e},{status:500})
    }
}