import styles from './sidebar.module.css'
import SidebarItem from '../../../shared/ui/sidebarItem/SidebarItem'
import { SideBarModes } from '../../../app/context/FileContext'
import mainIcon from '../../../shared/assets/icons/main.svg'
import chatIcon from '../../../shared/assets/icons/chat.svg'
import subjectIcon from '../../../shared/assets/icons/subject.svg'
import { useFile } from '../../../app/context/FileContext'
import SubjectPanel from './Panels/SubjectPanel'
import clsx from 'clsx'



export const Sidebar = () => {
  const { mode, setMode } = useFile()
  const isSubjectPanelVisible = mode === SideBarModes.Subject

  const handleSubjectClick = () => {
    if (mode === SideBarModes.Subject) {
      setMode(SideBarModes.Main)
    } else {
      setMode(SideBarModes.Subject)
    }
  }

  return (
    <div className={clsx(styles.sidebar, {
      [styles.sidebar_visible]: isSubjectPanelVisible
    })}>
      <div className={styles.left_container}>
        <div className={styles.sidebar_list}>
          <SidebarItem
            label='Заметки'
            isActive={mode === SideBarModes.Main}
            onClick={() => setMode(SideBarModes.Main)}
          >
            <img className={styles.sidebar_item_icon_image} src={mainIcon} alt="main" />
          </SidebarItem>
          <SidebarItem
            label='Теги'
            isActive={mode === SideBarModes.Chat}
            onClick={() => setMode(SideBarModes.Chat)}
          >
            <img className={styles.sidebar_item_icon_image} src={chatIcon} alt="chat" />
          </SidebarItem>
          <SidebarItem
            label='Предметы'
            isActive={mode === SideBarModes.Subject}
            onClick={handleSubjectClick}
          >
            <img className={styles.sidebar_item_icon_image} src={subjectIcon} alt="subject" />
          </SidebarItem>
        </div>
      </div>

      <div className={clsx(styles.sidebar_panel, {
        [styles.sidebar_panel_visible]: isSubjectPanelVisible
      })}>
        {isSubjectPanelVisible && (
          <SubjectPanel

          />
        )}
      </div>
    </div>
  )
}