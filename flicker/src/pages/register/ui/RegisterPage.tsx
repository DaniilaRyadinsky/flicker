import { RegisterForm } from "../../../features/auth"
import { AuthContainer } from "../../../features/auth/ui/AuthContainer"

function RegisterPage() {
  return <>
    <AuthContainer title='Создать аккаунт Flicker ' description='Придумайте логин и пароль'><RegisterForm /></AuthContainer>
  </>
}

export default RegisterPage

