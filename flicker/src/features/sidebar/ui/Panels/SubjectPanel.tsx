import styles from './panels.module.css'
import FileUpload from '../../../../features/FileUpload/FileUpload'
import { useFile } from '../../../../app/context/FileContext'
import { readTextFromFile } from '../../../../pages/main/api/fetch'




const SubjectPanel = () => {

  const { setFile, setText, setLoading } = useFile()


  const handleFileUpload = async (file: File) => {
    setLoading(true)
    setFile(file)
    try {
      const text = await readTextFromFile(file)
      setText(text)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className={styles.panel_container}>
      <h2 className={styles.title}>Предметы</h2>
      <div className={styles.subject_list}>
        
          <div className={styles.upload_file_form}>
            <FileUpload onUpload={handleFileUpload} />
          </div>
        
      </div>
    </div>
  )
}

export default SubjectPanel

