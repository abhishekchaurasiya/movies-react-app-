import React, { useState } from 'react';

import './SwitchTabs.scss'

const SwitchTabs = ({ data, onTabChangeHandler }) => {

    const [selectedTab, setSelectedTab] = useState(0)
    const [left, setLeft] = useState(0)

    const activeTab = (tab, index) => {
        // initial index value 0 rahegi and wah first tab me rhega and then index ki value 1 hogi to wah value 100 ho jayegi to next 100px move kar jayega 
        setLeft(index * 100)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300);
        onTabChangeHandler(tab, index)
    }


    return (
        <div className='switchingTabs'>
            <div className="tabItems">
                {
                    data.map((tab, index) => (
                        <span
                            key={index}
                            onClick={() => activeTab(tab, index)}
                            className={`tabItem ${selectedTab ? "active" : ""}`}>
                            {tab}
                        </span>
                    ))
                }
                <span className='movingBg' style={{ left }}></span>
            </div>
        </div>
    )
}

export default SwitchTabs;
