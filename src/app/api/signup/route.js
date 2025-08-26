
export async function POST(request) {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  const userId = data.get("userId");

    
    if (!email || !password || !userId) {
        return Response.json(
            { message: 'Invalid Credentials', status: 400 },
            { status: 400 }
        );
    }

    try {
    const payload = {
        email,
        rawPassword: password,
        userId,
    };

    const response = await fetch(`${process.env.NEXT_BACKENED_URL}/auth/register`, {
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
        return Response.json({message : 'username or email exists', status : 400}, {status:400})   
    }
    
    } catch (error) {
        return Response.json(
            { message: 'Server Error', status: 500 },
            { status: 500 }
        );
    }


}
