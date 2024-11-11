import styles from "./SRMenuItemUI.module.scss"
import {SMenuItemUIProps} from "@/components/SRMenu/SMenuUI";
import {useContext} from "react";
import {SMenuContext} from "@/components/SRMenu/SMenuProvider/SMenuProvider.tsx";

export const SMenuItemUI = <T extends Partial<SMenuItemUIProps>>(props: T) => {
    let {name,level,itemKey} = props;
    const {
        currentlyActiveNodePath
    } = useContext(SMenuContext);


    return (
            <div className={
                itemKey && currentlyActiveNodePath.has(itemKey)?
                    styles.containerOnSelect:
                    styles.container} style={{paddingLeft: level ? level*15 + 5 : 0}}>
                <div>图标</div>
                <div>{name}</div>
            </div>
    )
}
