type task = {
    id: string,
    title: string,
    description: string,
    owner: string,
    priority: string,
    deadline: string
}

type tasksJson = {
    [key:string]:task
}

export type { task,tasksJson };