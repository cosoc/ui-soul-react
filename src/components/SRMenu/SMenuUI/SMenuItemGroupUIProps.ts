
export interface SMenuItemGroupUIProps {
    // 唯一key
    itemKey: string;
    // 层级
    level: number;
    // 携带的数据
    itemDta?: any;
    // 是否禁用
    disabled?: boolean;
    // 用户自定义的属性
    [key: string]: any;
}
