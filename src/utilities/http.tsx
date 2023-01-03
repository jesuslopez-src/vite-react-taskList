import type { task,tasksJson } from "../types/tasks";


const http = async (url:RequestInfo,removeTask:boolean=false,body:task|undefined=undefined):Promise<tasksJson|Response> => {
    
    let response:Response = new Response;

    if(!body && !removeTask){
        response = await fetch(url,{
            headers:{
                "Accept":"application/json"
            }
        });

    }else if(body){
        response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(body)
        })
        return response;
    
    }else if(removeTask){
        //esto por los momentos no funciona
        // lanza error CORS
        response = await fetch(url,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173/"
                
            }
        })
        return response
    }

    const datos = await response.json() as Promise<tasksJson>
    return datos
}

export default http;