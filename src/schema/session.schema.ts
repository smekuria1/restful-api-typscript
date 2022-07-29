import {object, string} from 'zod'

export const createSessionSchema = object({
    body:object({
        email: string({
            required_error:'Email must be provided',
        }),
        password: string({
            required_error:'Password must be provided',
        }),
    })
})

