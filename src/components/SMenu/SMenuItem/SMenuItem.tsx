import { SMenuItemProps } from "@/components/SMenu/SMenuItem/SMenuItemProps.ts";
import React, { useContext } from "react";
import { SMenuContext } from "@/components/SMenu/SMenuProvider";
import { SMenuItemType } from "@/components/SMenu/SMenuModel/SMenuItemType.ts";
import { SMenuNodeStatus } from "@/components/SMenu/SMenuModel/SMenuNodeStatus.ts";

export const SMenuItem = (props: SMenuItemProps) => {
    const { itemKey,level, nodePath, disabled, itemDta, ui } = props;

    const {
        currentlyActiveNodePath,
        setCurrentlyActiveNodePath,
        multipleSelect } = useContext(SMenuContext);

    const onClickHandle = () => {
        // 禁用不做响应
        if (disabled === true) return;

        let nodeStatus: SMenuNodeStatus;

        if (isSelected()) {
            // 从链路中删除自身
            let updatePath = new Set<string>();
            let updateExpandSet = new Set<string>();
            updatePath.forEach(key => {
                if (itemKey !== key) {
                    updateExpandSet.add(itemKey)
                }
            });
            setCurrentlyActiveNodePath(updatePath);
            // 设置自身状态是没有选择
            nodeStatus = SMenuNodeStatus.UnSelected;
        } else {
            let updatePath = new Set<string>();
            if (multipleSelect) {
                currentlyActiveNodePath.forEach(key => {updatePath.add(key)});
                nodePath.forEach(itemKey => {updatePath.add(itemKey)});
            } else {
                nodePath.forEach(itemKey => {updatePath.add(itemKey)});
            }
            setCurrentlyActiveNodePath(updatePath);
            nodeStatus = SMenuNodeStatus.Select;
        }
        props.eventHand?.(itemKey, SMenuItemType.MenuItem, nodeStatus, itemDta);
    };

    const onDoubleClickHandle = () => {
        if (disabled) return;
        props.eventHand?.(itemKey, SMenuItemType.MenuItem, SMenuNodeStatus.DoubleClick, itemDta);
    };

    const isSelected = () : boolean =>{
        return currentlyActiveNodePath.has(itemKey);
    }

    return (
        <div onClick={onClickHandle} onDoubleClick={onDoubleClickHandle}>
            { React.cloneElement(ui, {...ui?.props, itemKey, level, itemDta, disabled }) }
        </div>
    );
};
