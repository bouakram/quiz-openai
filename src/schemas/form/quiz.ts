import { z } from 'zod'

export const CreateQuizSchema = z.object({
    topic: z.string().min(4, { message: "topic must be at least 4 characters long" }),
    type: z.enum(["mcq"]),
    amount: z.number().min(1).max(10)
})