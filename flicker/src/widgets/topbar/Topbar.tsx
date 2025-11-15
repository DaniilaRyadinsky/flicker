import styles from './Topbar.module.css'

const Topbar = () => {
  return (
    <div className={styles.topbar}>
        <div className={styles.topbar_left}>
            {/* <div className={styles.topbar_left_logo}>
                <img src={logo} alt="logo" />
            </div> */}
            <div className={styles.topbar_left_title}>Flikker</div>
        </div>  
    </div>
  )
}

export default Topbar