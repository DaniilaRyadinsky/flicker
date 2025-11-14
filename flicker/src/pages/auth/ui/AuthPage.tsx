import { LoginForm } from "../../../features/auth"
import { AuthContainer } from "../../../features/auth/ui/AuthContainer"

function AuthPage() {
  return (
  <>
    <AuthContainer title='Вход' description='Войдите в свой аккаунт Flicker'><LoginForm /></AuthContainer>
  </>
  )
}

export default AuthPage

