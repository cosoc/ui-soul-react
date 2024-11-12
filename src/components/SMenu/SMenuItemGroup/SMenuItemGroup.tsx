import {SMenuItemGroupProps} from "@/components/SMenu/SMenuItemGroup/SMenuItemGroupProps";
import React, {useContext} from "react";
import {SMenuItem} from "@/components/SMenu/SMenuItem/SMenuItem";
import {SMenuItemType} from "@/components/SMenu/SMenuModel/SMenuItemType";
import {SMenuNodeStatus} from "@/components/SMenu/SMenuModel/SMenuNodeStatus";
import {SMenuContext} from "@/components/SMenu/SMenuProvider";

export const SMenuItemGroup = (props: SMenuItemGroupProps )=> {

    const { itemKey,
            level,
            itemDta,
            ui,
            menuItems,
            disabled,
            nodePath
    } = props;
    const {
        currentlyExpandItemGroup,
        setCurrentlyExpandItemGroup,
        exclusiveExpand,
    } = useContext(SMenuContext);

    const onClickHandle = () => {
        // 禁用不做响应
        if (disabled === true) return;

        let nodeStatus: SMenuNodeStatus;
        if (isExpand()) {
            // 从展开中删除自己
            let updateExpandSet = new Set<string>();
            currentlyExpandItemGroup.forEach(key => {
                if (itemKey !== key) {
                    updateExpandSet.add(key)
                }
            });
            setCurrentlyExpandItemGroup(updateExpandSet);
            // 设置自身状态是没有选择
            nodeStatus=SMenuNodeStatus.Collapse;
        }else {
            // 如果是互斥展开
            if (exclusiveExpand) {
                // 覆盖展开组
                let updateExpandSet = new Set<string>();
                updateExpandSet.add(itemKey);
                setCurrentlyExpandItemGroup(updateExpandSet);
            } else {
                // 增加自身到展开组
                let updateExpandSet = new Set<string>();
                currentlyExpandItemGroup.forEach(key => {
                    updateExpandSet.add(key)
                });
                updateExpandSet.add(itemKey)
                setCurrentlyExpandItemGroup(updateExpandSet);
            }
            nodeStatus=SMenuNodeStatus.Expand;
        }
        props.eventHand?.(itemKey, SMenuItemType.MenuSubItem, nodeStatus, itemDta);
    };

    const onDoubleClickHandle = () => {
        if (disabled) return;
        props.eventHand?.(itemKey, SMenuItemType.MenuSubItem, SMenuNodeStatus.DoubleClick, itemDta);
    };

   const childrenEventHand = (itemKey: string, itemType: SMenuItemType, status: SMenuNodeStatus, itemDta: any) => {
       props?.eventHand?.(itemKey, itemType,status,itemDta);
   }

   const getNodePath = (selfItemKey: string): Set<string> => {
       let path = new Set<string>();
       nodePath.forEach(key=>{path.add(key)})
       path.add(selfItemKey);
       return path;
   }

    const isExpand = () : boolean =>{
        return currentlyExpandItemGroup.has(itemKey);
    }

    return (
        <div>
            <div onClick={onClickHandle} onDoubleClick={onDoubleClickHandle}>
                { React.cloneElement(ui, {...ui?.props, itemKey, level, itemDta, disabled }) }
            </div>
            {!currentlyExpandItemGroup.has(itemKey) ? null :
                <div>
                    {
                        menuItems?.map(item => {
                            if (item.children) {
                               return <SMenuItemGroup
                                            key={item.itemKey}
                                            itemKey={item.itemKey}
                                            level={level + 1}
                                            parentNodeItemKey={itemKey}
                                            nodePath={getNodePath(item.itemKey)}
                                            itemDta={item.itemDta}
                                            disabled={item.disabled}
                                            eventHand={childrenEventHand}
                                            menuItems={item.children}
                                            ui={item.ui as any}
                                        />
                            }
                            return <SMenuItem
                                        key={item.itemKey}
                                        itemKey={item.itemKey}
                                        level={level + 1}
                                        parentNodeItemKey={itemKey}
                                        nodePath={getNodePath(item.itemKey)}
                                        itemDta={item.itemDta}
                                        disabled={item.disabled}
                                        eventHand={childrenEventHand}
                                        ui={item.ui as any}
                                    />
                        })
                    }
                </div>
            }
        </div>
    )
}
