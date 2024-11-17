
export interface SMenuItemUISoulProps {
    // 唯一key
    itemKey: string;
    // 层级
    level: number
    // 携带的数据
    itemDta?: any;
    // 是否禁用
    disabled?: boolean;
    // 是否激活
    isActivated: boolean;
}
