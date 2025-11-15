
import styles from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import clsx from 'clsx'
import { FileProvider, useFile, SideBarModes } from '../context/FileContext'
import { Sidebar } from '../../features/sidebar/ui/sidebar'
import Topbar from '../../widgets/topbar/Topbar'

const LayoutContent = () => {
    const { mode } = useFile()
    const isSidebarPanelVisible = mode === SideBarModes.Subject
    
    return (
        <div>
            <Topbar />
            <main className={styles.layout__content}>
                <div className={styles.layout__sidebar}>
                    <Sidebar  />
                </div>
                <div className={clsx(styles.layout__outlet, {
                    [styles.layout__outlet_sidebar_visible]: isSidebarPanelVisible
                })}>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

const Layout = () => {
    return (
        <FileProvider>
            <LayoutContent />
        </FileProvider>
    )
}

export default Layout