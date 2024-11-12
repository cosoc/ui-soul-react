import {SMenu} from "@/components/SMenu/SMenu";
import {SMenuGen} from "@/components/SMenu/SMenu/SMenuGen.ts";
import {SMenuItemUI} from "@/components/SMenu/SMenuUIExample/SMenuItemUI.tsx";
import {SMenuItemGroupUI} from "@/components/SMenu/SMenuUIExample/SMenuItemGroupUI.tsx";

function App() {

    const menuData: SMenuGen[] = [
        {
            itemKey: 'cat01',
            ui: <SMenuItemGroupUI name={"猫的品种"}/>,
            children: [
                {
                    itemKey: 'cat01-1',
                    disabled: false,
                    uiProps: {name:"德国卷毛猫"},
                },
                {
                    itemKey: 'cat01-2',
                    disabled: false,
                    uiProps: {name:"韩国暹罗猫"},
                },
                {
                    itemKey: 'cat01-3',
                    disabled: false,
                    uiProps: {name:"还有子菜单"},
                    children: [
                        {
                            itemKey: 'cat01-3-1',
                            disabled: false,
                            uiProps: {name:"子菜单1"},
                        },
                        {
                            itemKey: 'cat01-3-2',
                            disabled: false,
                            uiProps: {name:"子菜单2"},
                        },
                    ],
                },
            ],
        },
        {
            itemKey: '我是key',
            disabled: false,
            uiProps: {name:"最外层次的选项"},
        },
        {
            itemKey: '花卉-01',
            uiProps: {name:"中国花卉"},
            children: [
                {
                    itemKey: '花卉-01-1',
                    disabled: false,
                    uiProps: {name:"玫瑰花"},
                },
                {
                    itemKey: '花卉-01-2',
                    disabled: false,
                    uiProps: {name:"其他花卉"},
                    children: [
                        {
                            itemKey: '14',
                            disabled: false,
                            ui:   <SMenuItemUI name={"牡丹"}/>
                        },
                        {
                            itemKey: '19',
                            disabled: false,
                            ui:   <SMenuItemUI name={"山茶"}/>
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <>
         <SMenu style={{
             width:"350px",
             backgroundColor: "rgba(250,250,250,1)",
             height:"100vh",
         }}
            menuNodes={menuData}
            defaultItemGroupUI={SMenuItemGroupUI}
            defaultItemUI={SMenuItemUI}
         />
        </>
    );
}

export default App;