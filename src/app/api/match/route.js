
const fetchUrl = 'https://dummyjson.com/users'
export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const skip = searchParams.get('skip')
    const limit = searchParams.get('limit')

    try{
        const req = await fetch(`${fetchUrl}?limit=${limit}&skip=${skip}`)

        if(!req.ok) return Response.json({message:`Server connection failed`}, {status:500})
        const resp = await req.json()
        return Response.json({resp}, {status:200})
    } catch(e){
        return Response.json({message:`error: ${e}`}, {status:500})
    }
}