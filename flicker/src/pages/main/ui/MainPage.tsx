
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import styles from './MainPage.module.css'
import FileUpload from '../../../features/FileUpload/FileUpload'
import { useState } from 'react'

const markdown = `# Зведение важных моментов учебного года\n
\n[x] ntrcn\n
\n## Общая информация\n
\n- На первом занятии будет организационная часть.\n- Выходящие лекции: каждый понедельник в одно и то же время.\n- Лабораторные работы: сдаются по модулюм, сначала 1-й модуль.\n\n## Модули\n\n### Первый модуль\n#### Лабораторная работа\n- Начинаясь с первой и третьей лабораторной работы.\n- Единственное, что необходимо сделать для получения 2-го модуля — сдать первую комбинационную лабораторную работу.\n- Сдавать все остальные лабораторные работы в срок.\n- Лабораторная работа для первого модуля будет проходить по первой и третьей лабораторной работе.\n\n### Второй модуль\n#### Лабораторные работы\n- 2, 4, 5, 6 — это на второй модуль.\n- Вы можете сдавать все остальные лабораторные работы за исключением первой и третьей, в срок.\n\n## Экзамен\n- У нас будет экзамен в конце учебного года.\n- Двое модулей вы должны будут сдать за экзамен.\n- Если у вас Doktorан트, то он может дать вам вторую возможность сдать экзамен.\n- Вопросы на экзамене: билеты и вопросы, ответы и билеты.\n\n## Работа в группе\n- У нас есть 5 групп.\n- Старостый группу объединяют для списка групп, который выкладываетесь в ООС.\n- Каждому человеку необходимо приходить на лекции вовремя.\n\n### Индивидуальные задания\n- Для всех лабораторных работ индивидуальные задания есть.\n- Вы можете сделать их заранее, но не более одного раз.\n- После того как вы сдали лабораторную работу, вы не должны уже делать задание.\n- Если вы еще один вопрос не узнали, то могут ask me`



function MainPage() {
  const [file, setFile] = useState<File|undefined>(undefined)  

  const [text, setText] = useState(markdown)

  return (
    <div className={styles.main_container}>
      <div>
        <FileUpload onUpload={(file)=> setFile(file)}/>
      </div>

      <button>Отправить</button>
      <div className={styles.markdownContent}>
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {text}
        </Markdown>
      </div>
    </div>
  )
}

export default MainPage

