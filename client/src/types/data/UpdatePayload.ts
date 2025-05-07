export interface UpdatePayload {
    type: 'tasks' | 'events' | 'categories'
    CRUD: 'GET' | 'PUT' | 'POST' | 'DELETE'
    id?: string | number 
    updates?: { [key: string]: any }
    includePropertyInUrl?: boolean
}