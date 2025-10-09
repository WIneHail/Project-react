import { FC } from "react";
import { Button } from "../Button/Button";
import IconMail from "/src/assets/img/UI/mail.svg?react";
import IconKey from "/src/assets/img/UI/key.svg?react";
import logoBlackIcon from "/src/assets/img/logo-black.png";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { useForm } from "react-hook-form";

import './style.scss'
import { InputField } from "../InputField/InputField";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeModal, toggleAuthState } from "../../app/modalSlice";
import { fetchCurrentUser } from "../../app/fetchMeSlice";


const UserAuthFormSchema = z.object({
  email: z.email('Не соотвествует формату почты').min(5, 'Не менее пяти символов.'),
  password: z.string().min(8, 'Не менее восьми символов.'),
})

type UserAuthFormSchemaType = z.infer<typeof UserAuthFormSchema>


export const LoginForm: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserAuthFormSchemaType>({
    resolver: zodResolver(UserAuthFormSchema)
  })
  const dispatch = useAppDispatch()

  const authState = useAppSelector((state) => state.modal.authState)

  const onSuccesLogin = () => {
    dispatch(fetchCurrentUser())
    dispatch(closeModal())
  }


  const changeAuthState = () => {
    const newState = authState === 'autorisation' ?
      'register' : 'autorisation'
    dispatch(toggleAuthState(newState))
  }

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess() {
      onSuccesLogin()
    },
  },
    queryClient)


  return (
    <div className="login" >
      <img src={logoBlackIcon} alt="Logo" className="login__logo" />
      <form className="login__form" onSubmit={handleSubmit(({ email, password }) => {
        console.log(email, password)
        loginMutation.mutate({ email, password })
      })}>
        <InputField
          errorMessage={errors.email?.message}
          imgChild={<IconMail className="badge" />}
          child={
            <input
              key='login__input'
              className='login__input input__field'
              placeholder='Электронная почта'
              type="email"
              {...register('email')} />
          }
        />
        <InputField
          errorMessage={errors.password?.message}
          imgChild={<IconKey className="badge" />}
          child={
            <input
              key='login__input'
              className='login__input input__field'
              placeholder='Пароль'
              type="password"
              {...register('password')}
            />
          }
        />
        <Button
          type='submit'
          children='Войти'
          title="logIn"
          className="login__btn"
          kind="primary"
          isDisabled={loginMutation.isPending}
        ></Button>
        <Button
          onClick={() => changeAuthState()}
          children='Регистрация'
          title="register"
          type="button"
          className="login__btn"
          kind="round"
        ></Button>
        {loginMutation.error && <span className="login__error">Неправильный логин/пароль</span>}
      </form>
    </div >
  )
}

