import { Sidebar } from '../../features/sidebar'
import styles from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx'

const Layout = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true)
    
    return (<>
        {/* <Topbar /> */}

        <main className={styles.layout__content}>
            <div className={styles.layout__sidebar}>
                <Sidebar 
                    isVisible={isSidebarVisible} 
                    selectedId='1' 
                    onSelectNote={()=>{}} 
                    setIsVisible={setIsSidebarVisible}
                />
            </div>
            <div className={clsx(styles.layout__outlet, {
                [styles.layout__outlet_sidebar_visible]: isSidebarVisible
            })}>
                <Outlet />
            </div>
        </main>
    </>
    )
}

export default Layout