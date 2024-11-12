
/**
 * 是否包含权限
 * @param pool 权限池
 * @param checkTarget 需要检查的目标
 */
export const isIncludesPermissions  = (pool: Array<string>, checkTarget: Array<string>): boolean => {
    if( !pool || !checkTarget ) return false;
    return checkTarget.every(element => pool.includes(element))
}
