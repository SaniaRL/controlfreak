export interface UpdatePayload {
    type: 'tasks' | 'events' | 'categories' | 'eventTemplates'
    CRUD: 'GET' | 'PUT' | 'POST' | 'DELETE'
    id?: string | number 
    updates?: { [key: string]: any }
    includePropertyInUrl?: boolean
}