import { Redis } from '@upstash/redis';

// Initialize Upstash Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Cache key prefixes
const CACHE_KEYS = {
    PROMPTS_LIST: 'prompts:list',
    PROMPT_DETAIL: 'prompts:detail',
} as const;

// Cache TTL in seconds
const CACHE_TTL = {
    PROMPTS_LIST: 300, // 5 minutes
    PROMPT_DETAIL: 600, // 10 minutes
} as const;

/**
 * Get cached data from Redis
 */
export async function getCached<T>(key: string): Promise<T | null> {
    try {
        const data = await redis.get<T>(key);
        return data;
    } catch (error) {
        console.error('Redis GET error:', error);
        return null; // Fallback to database on error
    }
}

/**
 * Set data in Redis cache with TTL
 */
export async function setCached<T>(
    key: string,
    data: T,
    ttl: number
): Promise<void> {
    try {
        await redis.set(key, data, { ex: ttl });
    } catch (error) {
        console.error('Redis SET error:', error);
        // Don't throw - caching is optional
    }
}

/**
 * Delete a specific cache key
 */
export async function deleteCached(key: string): Promise<void> {
    try {
        await redis.del(key);
    } catch (error) {
        console.error('Redis DEL error:', error);
    }
}

/**
 * Delete all keys matching a pattern
 */
export async function deleteCachedPattern(pattern: string): Promise<void> {
    try {
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
            await redis.del(...keys);
        }
    } catch (error) {
        console.error('Redis pattern DELETE error:', error);
    }
}

/**
 * Generate cache key for prompts list
 */
export function getPromptsListCacheKey(
    cursor: number,
    limit: number,
    query: string
): string {
    return `${CACHE_KEYS.PROMPTS_LIST}:cursor:${cursor}:limit:${limit}:q:${query}`;
}

/**
 * Generate cache key for individual prompt
 */
export function getPromptDetailCacheKey(id: number): string {
    return `${CACHE_KEYS.PROMPT_DETAIL}:${id}`;
}

export { CACHE_TTL, CACHE_KEYS };
