import { NextRequest, NextResponse } from "next/server"

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const searchterm = searchParams.get('searchterm')

    if(searchterm == ''){
        return Response.json({message : 'enter search term'}, {status:400})
    }
    try{
        if(searchterm == 'hot'){
            const req = await fetch(`https://dummyjson.com/posts?limit=10`)
            if(!req.ok) return Response.json({message : 'search error'}, {status:400})
            const resp = await req.json()
            // console.log(resp)
            return Response.json({...resp},{status:200})
        }
        const req = await fetch(`https://dummyjson.com/posts/search?q=${searchterm}&limit=2`)
        if(!req.ok) return Response.json({message : 'search error'}, {status:400})
        const resp = await req.json()
        return Response.json({...resp},{status:200})

    } catch(e){
        return Response.json({error:e},{status:500})
    }
}