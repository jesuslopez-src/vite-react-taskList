import type { task,tasksJson } from "../types/tasks";


const http = async (url:RequestInfo,removeTask:boolean=false,body:tasksJson|task|undefined=undefined):Promise<tasksJson|Response> => {
    
    let response:Response = new Response;

    if(!body && !removeTask){
        response = await fetch(url,{
            headers:{
                "Accept":"application/json"
            }
        });

    }else if(body && !removeTask){
        response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(body)
        })
        return response;
    
    }else if(removeTask){
        response = await fetch(url,{
            method:"PUT", //es PUT por cuestiones de firebase
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(body)
        })
        return response
    }

    const datos = await response.json() as Promise<tasksJson>
    return datos
}

export default http;