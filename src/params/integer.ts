export function match(param: unknown): boolean {
    return /^\d+$/.test(param as string);
}