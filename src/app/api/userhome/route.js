import { sleep } from "@/lib/utils"

const community = [{id:1,name:'millenialZ',src:'',alt:'img'},{id:2,name:'dating101',src:'',alt:'img'},{id:3,name:'meetup',src:'',alt:'img'},{id:4,name:'confessions',src:'',alt:'img'}]
const places = [{id:1,name:'sunrise cafe',src:'',alt:'img'}, {id:2,name:'bazaar',src:'',alt:'img'},{id:3,name:'tokyo castle',src:'',alt:'img'}]
const match = [{id:1,name:'dia kapoor',src:'',alt:'img',match:'85%'}, {id:2,name:'jennie kim',src:'',alt:'img',match:'88%'}, {id:3,name:'debra morgan',src:'',alt:'img',match:'95%'},{id:4,name:'emily croft',src:'',alt:'img',match:'85%'}]

export async function GET(){
    sleep(2000)
    return Response.json({community,places,match},{status:200})
}