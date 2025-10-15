export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('id')

    return Response.json({message:'ok'},{status:200})
}