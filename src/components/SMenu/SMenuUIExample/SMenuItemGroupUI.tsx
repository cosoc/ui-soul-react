import styles from "./SRMenuItemUI.module.scss"
import {SMenuItemGroupUIProps} from "@/components/SMenu/SMenuUI";
import {useContext} from "react";
import {SMenuContext} from "@/components/SMenu/SMenuProvider/SMenuProvider.tsx";


export const SMenuItemGroupUI = <T extends Partial<SMenuItemGroupUIProps>>(props: T) => {
    let {name,level,itemKey} = props;
    const {
        currentlyActiveNodePath
    } = useContext(SMenuContext);


    return (
        <div className={
            itemKey && currentlyActiveNodePath.has(itemKey) ?
                styles.containerOnSelect :
                styles.container} style={{paddingLeft: level ? level * 15 + 15 : 0}}>
            <div>图标</div>
            <div>{name}</div>
        </div>
    )
}
