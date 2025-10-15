

export async function GET(request){
    const searchParams = request.nextUrl.searchParams
    const postId = searchParams.get('postId')
    try{
        const req = await fetch(`https://dummyjson.com/posts/${1}/comments`)

        if(!req.ok) return Response.json({resp : 'resource not found'},{status:400})

        const resp = await req.json()
    console.log(resp)
        return Response.json({...resp},{status:200})

    } catch(e){
        return Response.json({resp:e},{status:500})
    }
}