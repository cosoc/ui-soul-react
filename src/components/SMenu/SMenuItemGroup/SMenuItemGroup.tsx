/** @jsxImportSource @emotion/react */
import {SMenuItemGroupProps} from "@/components/SMenu/SMenuItemGroup/SMenuItemGroupProps";
import React, {useContext, useMemo} from "react";
import {SMenuItem} from "@/components/SMenu/SMenuItem/SMenuItem";
import {SMenuItemType} from "@/components/SMenu/SMenuModel/SMenuItemType";
import {SMenuNodeStatus} from "@/components/SMenu/SMenuModel/SMenuNodeStatus";
import {SMenuContext} from "@/components/SMenu/SMenuProvider";
import {
    SMenuItemGroupContainerDefaultStyle
} from "@/components/SMenu/SMenuStyle/SMenuItemGroupContainer.default.style.ts";
import {
    SMenuItemGroupChildContainerDefaultStyle
} from "@/components/SMenu/SMenuStyle/SMenuItemGroupChildContainer.default.style.ts";

export const SMenuItemGroup = (props: SMenuItemGroupProps )=> {

    const { itemKey,
            level,
            itemDta,
            ui,
            menuItems,
            disabled,
            nodePath,
            nodeConfig,
    } = props;
    const {
        currentlyExpandItemGroup,
        setCurrentlyExpandItemGroup,
        exclusiveExpand,
        currentlyActiveNodePath
    } = useContext(SMenuContext);
    const isExpand = useMemo(() => {
        return currentlyExpandItemGroup.has(itemKey);
    }, [currentlyExpandItemGroup]);
    const isActivated = useMemo(() => {
        return currentlyActiveNodePath.has(itemKey);
    }, [currentlyActiveNodePath]);


    const onClickHandle = (event: React.MouseEvent) => {
        // 禁用不做响应
        if (disabled === true) return;

        let nodeStatus: SMenuNodeStatus;
        if (isExpand) {
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
        props.eventHandler?.(event, itemKey, SMenuItemType.MenuSubItem, nodeStatus, itemDta);
    };

    const onDoubleClickHandle = (event: React.MouseEvent) => {
        if (disabled) return;
        props.eventHandler?.(event, itemKey, SMenuItemType.MenuSubItem, SMenuNodeStatus.DoubleClick, itemDta);
    };
    const onContextMenuHandle = (event: React.MouseEvent) => {
        if (disabled) return;
        props.eventHandler?.(event, itemKey, SMenuItemType.MenuSubItem, SMenuNodeStatus.DoubleClick, itemDta);
    }

   const childrenEventHand = (event: React.MouseEvent,itemKey: string, itemType: SMenuItemType, status: SMenuNodeStatus, itemDta: any) => {
       props?.eventHandler?.(event, itemKey, itemType,status,itemDta);
   }

   const getNodePath = (selfItemKey: string): Set<string> => {
       let path = new Set<string>();
       nodePath.forEach(key=>{path.add(key)})
       path.add(selfItemKey);
       return path;
   }

    return (
        <div
            style={nodeConfig?.itemGroupContainerStyle}
            css={[
              SMenuItemGroupContainerDefaultStyle({itemGroupChildExpansionDirection: nodeConfig?.itemGroupChildExpansionDirection})
           ]}
        >
            <div
                style={{ width: '100%', flexShrink: 0}}
                onClick={onClickHandle}
                onDoubleClick={onDoubleClickHandle}
                onContextMenu={onContextMenuHandle}
            >
                { React.cloneElement(ui, {...ui?.props, itemKey,level,itemDta,disabled,isExpand,isActivated,nodeConfig}) }
            </div>
            {!isExpand ? null :
                <div
                    style={nodeConfig?.itemGroupChildContainerStyle}
                    css={[
                    SMenuItemGroupChildContainerDefaultStyle({
                        itemGroupChildExpansionDirection: nodeConfig?.itemGroupChildExpansionDirection,
                        itemGroupChildLayoutDirection: nodeConfig?.itemGroupChildLayoutDirection
                    })
                ]}>
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
                                    eventHandler={childrenEventHand}
                                    menuItems={item.children}
                                    nodeConfig={item.nodeConfig}
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
                                eventHandler={childrenEventHand}
                                nodeConfig={item.nodeConfig}
                                ui={item.ui as any}
                            />
                        })
                    }
                </div>
            }
        </div>
    )
}
