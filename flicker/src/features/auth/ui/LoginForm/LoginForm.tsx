import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../../../shared/ui/Button/index'
import { Input } from '../../../../shared/ui/Input/index'
import { fetchLogin } from '../../api/auth'
import styles from './LoginForm.module.css'

type Error = {
  login: string,
  password: string,
  password2: string
}

const defaultError = { login: "", password: '', password2: "" }

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<Error>(defaultError)
  const loginRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const validate = () => {
    if (username === '') {
      setError({ ...error, login: 'none' })
      loginRef.current?.focus()
    }
    else if (password === '') {
      setError({ ...error, login: 'none' })
      loginRef.current?.focus()
    }
    else {
      setError(defaultError)
    }
  }

  const validateData = () => {
    validate()
    if (error != defaultError) return
    else {
      setError(defaultError)
      fetchLogin({
        username,
        password,
        onSuccess: () => navigate('/main'),
        onError: () => {
          setError({login: "err", password: 'err', password2: ''})
        }
      })
    }
  }

  useEffect(() => {
    const handleKeyPress = (event: Event) => {
      const keyEvent = event as unknown as KeyboardEvent
      if (keyEvent.key === 'Enter') {
        event.preventDefault()
        validateData()
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [username, password]);

  return (
    <div className={styles.login_form}>
      <div>
        <div className={styles.inputs_container}>
          <Input
            ref={loginRef}
            type='email'
            mode={(error.login !== '') ? 'err' : ''}
            value={username}
            onChange={(e) => setUsername(e.target.value)}>
            Телефон или адрес эл. почты
          </Input>
          {/* {inputModeLog === 'err' && <span className={styles.err_label}>Не удалось найти аккаунт Breezy.</span>} */}
          {error.login === 'none' && <span className={styles.err_label}>Введите логин.</span>}
          <Input
            ref={passwordRef}
            type='password'
            mode={(error.password !== '') ? 'err' : ''}
            value={password}
            onChange={(e) => setPassword(e.target.value)}>
            Пароль
          </Input>
          {error.password === 'none' && <span className={styles.err_label}>Введите пароль.</span>}
          {error.password === 'err' && <span className={styles.err_label}>Неверный логин или пароль. Повторите попытку, или нажмите "Забыли пароль?", чтобы сбросить его.</span>}
        </div>

        <div className={styles.recovery_link_container}>
          <Link className={styles.recovery_link} to='/recovery'>Забыли пароль?</Link>
        </div>
      </div>
      <div className={styles.btn_container}>
        <Button mode={'on_primary'} onClick={() => navigate('/reg')}>Создать аккаунт</Button>
        <Button mode={'primary'} onClick={validateData}>Далее</Button>
      </div>
    </div>
  )
}
