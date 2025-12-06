import {z } from 'zod';

export const signUpSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    firstName:z.string(),
    lastName:z.string()
})
export const signInSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})
export const promptSchema=z.object({
    prompt:z.string().min(1),
    title:z.string().min(1).max(200),
    desc:z.string().optional(),
    tags:z.array(z.string()).optional(),
    model:z.enum(['gemini','chatGPT','perplexity','claude','deepseek','midjourney','other'])
})