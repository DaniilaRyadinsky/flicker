
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import styles from './MainPage.module.css'
import { useState, useRef, useEffect } from 'react'
import { generateMarkdown, readTextFromFile, transkriptFile } from '../api/fetch'
import { ClipLoader } from 'react-spinners'
import { useFile } from '../../../app/context/FileContext'



function MainPage() {
  const { text, setText, loading, setLoading, file } = useFile()
  const [textarea, setTextArea] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isTextFile = (file: File): boolean => {
    return file.type === 'text/plain' || 
           file.name.toLowerCase().endsWith('.txt') ||
           file.type.startsWith('text/')
  }

  useEffect(() => {
    const fetchText = async () => {
      if (file) {
        setLoading(true)
        try {
          if (isTextFile(file)) {
            // Обработка текстового файла
            const text = await readTextFromFile(file)
            setText(text)
          } else {
            
            await transkriptFile(
              file,
              (data) => {
                console.log('Файл загружен:', data)
                  setText(data)
                  console.log(text)
                
              },
              (error) => {
                console.error('Ошибка при загрузке файла:', error)
              }
            )
          }
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchText()
  }, [file])

  useEffect(() => {
    if (text && text !== '') {
      setLoading(true)
      generateMarkdown(text as string, (data) => {
        setTextArea(data.markdown)
        setLoading(false)
      }, (error) => {
        console.error('Ошибка при отправке текста:', error)
        setLoading(false)
      })
    }
  }, [text])



  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [textarea])

  return (
    <div className={styles.main_container}>
      <div className={styles.decorative_worm}></div>
      <svg className={styles.worm} viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 0 150 Q 80 100, 120 130 Q 160 160, 200 140 Q 240 120, 280 150 Q 320 180, 360 160 Q 400 140, 450 170 Q 480 190, 500 180"
          fill="none"
          stroke="url(#wormGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="150" r="8" fill="rgba(255, 152, 0, 0.8)" />
        <circle cx="500" cy="180" r="8" fill="rgba(156, 39, 176, 0.8)" />
        <defs>
          <linearGradient id="wormGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 152, 0, 0.8)" />
            <stop offset="30%" stopColor="rgba(255, 87, 34, 0.7)" />
            <stop offset="60%" stopColor="rgba(233, 30, 99, 0.7)" />
            <stop offset="100%" stopColor="rgba(156, 39, 176, 0.8)" />
          </linearGradient>
        </defs>
      </svg>

      {loading &&
        <div className={styles.upload_container}>
          <ClipLoader loading size={30} cssOverride={{ color: 'var(--main)' }} />
        </div>}
      {!loading && <div className={styles.markdownContent}>
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {textarea}
        </Markdown>
      </div>
      }
    </div>
  )
}

export default MainPage

