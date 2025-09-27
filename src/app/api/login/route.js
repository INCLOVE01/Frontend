
export async function POST(request) {
    const data = await request.formData()
    const email = data.get("email");
    const password = data.get("password"); 

    if(!email || !password){
        return Response.json(
            { message: 'Invalid Credentials', status: 400 },
            { status: 400 }
        )
    }       
    try{
        const payload ={
            email, rawPassword : password
        }
        const response = await fetch(`${process.env.NEXT_BACKENED_URL}/auth/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json', // Corrected header key
            },
            body: JSON.stringify(payload),
            redirect: 'follow',
        });

        const data = await response.json();
        
        if(data.status == 200) {
            return Response.json({message : 'success', status : 200},{status:200})   
        } else{
            return Response.json({message : 'account does not exists', status : 400}, {status:400})   
        }

    } catch(e){
        return Response.json(
            { message: 'Server Error', status: 500 },
            { status: 500 }
        );
    }
}