import { useId, useState } from 'react'
import styles from './FileUpload.module.css'
// import { uploadFile } from './api/upload'
import { ClipLoader } from 'react-spinners'
import upload from '../../shared/assets/icons/upload_file.svg'
// import { showAlert, showErr} from '../../shared/ui/customAlert/showAlert'


interface IFileUpload {
    onUpload: (file: File) => void
}

const FileUpload = ({ onUpload }: IFileUpload) => {
    const id = useId()
    const [isLoading, setIsLoading] = useState(false)
    const [err, setErr] = useState('')
    const [fileName, setFileName] = useState<string>('')

    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            setFileName(file.name)
            onUpload(file)

            // if (file.size > 10 * 1024 * 1024) {
            //     setErr('Максимальный размер файла 10MB')
            //     return;
            // }

            setErr('')

            setIsLoading(true)
            // uploadFile(
            //     file,
            //     (e) => { showAlert("Файл добавлен"); onUpload(e.name) },
            //     (e) => { showErr("Ошибка: " + e) }
            // )
            setIsLoading(false)

        }
    }

    if (isLoading)
        return <div className={styles.upload_container}>
            <ClipLoader loading size={30} cssOverride={{ color: 'var(--main)' }} />
        </div>

    return (
        <div className={styles.upload_container}>
            <label htmlFor={id} className={styles.upload_label} >
                <img src={upload} className={styles.upload_img} />
                <p className={styles.upload_text}>Загрузить файл</p>
                <input
                    style={{ display: "none" }}
                    type='file' id={id}
                    accept=""
                    onChange={handleUploadImage} />
            </label>
            {fileName && <p className={styles.file_name}>{fileName}</p>}
            {err != '' && <p className={styles.err}>{err}</p>}
        </div>
    )
}

export default FileUpload