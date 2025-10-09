import { FC } from "react";
import { Button } from "../Button/Button";
import IconMail from "/src/assets/img/UI/mail.svg?react";
import IconKey from "/src/assets/img/UI/key.svg?react";
import IconUser from "/src/assets/img/UI/user.svg?react";
import logoBlackIcon from "/src/assets/img/logo-black.png";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import { registration } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { useForm } from "react-hook-form";

import './style.scss'
import { InputField } from "../InputField/InputField";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleAuthState } from "../../app/modalSlice";


const UserRegisterFormSchema = z.object({
  email: z.email('Не соотвествует формату почты').min(5, 'Не менее пяти символов.'),
  name: z.string().nonempty('Поле должно быть заполнено.'),
  surname: z.string().nonempty('Поле должно быть заполнено.'),
  password: z.string().regex(/^[a-zA-Z0-9]*$/, "Пароль должен быть латинскими буквами.").min(8, 'Не менее восьми символов.'),
  confirmPassword: z.string(),
})
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Пароли не соответствуют',
    path: ['confirmPassword']
  })

type UserRegisterFormSchemaType = z.infer<typeof UserRegisterFormSchema>

export const RegisterForm: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserRegisterFormSchemaType>({
    resolver: zodResolver(UserRegisterFormSchema)
  })

  const authState = useAppSelector((state) => state.modal.authState)

  const dispatch = useAppDispatch()

  const changeAuthState = () => {
    const newState = authState === 'autorisation' ?
      'register' : 'autorisation'
    dispatch(toggleAuthState(newState))
  }

  const registerMutation = useMutation({
    mutationFn: registration,
    onSuccess: () => dispatch(toggleAuthState('success'))
  },
    queryClient)



  return (
    <div className="login" >
      <img src={logoBlackIcon} alt="Logo" className="login__logo" />
      <h2 className="login__header">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit(({ email, name, surname, password }) => {
        registerMutation.mutate({ email, name, surname, password })
      })}>
        <InputField
          errorMessage={errors.email?.message}
          imgChild={<IconMail className="badge" />}
          child={
            <input
              key='input--email'
              className='login__input input__field'
              placeholder='Электронная почта'
              type="email"
              {...register('email')} />
          }
        />
        <InputField
          errorMessage={errors.name?.message}
          imgChild={<IconUser className="badge" />}
          child={
            <input
              key='input--name'
              className='login__input input__field'
              placeholder='Имя'
              type="text"
              {...register('name')} />
          }
        />
        <InputField
          errorMessage={errors.surname?.message}
          imgChild={<IconUser className="badge" />}
          child={
            <input
              key='input--surname'
              className='login__input input__field'
              placeholder='Фамилия'
              type="text"
              {...register('surname')} />
          }
        />
        <InputField
          errorMessage={errors.password?.message}
          imgChild={<IconKey className="badge" />}
          child={
            <input
              key='input--password'
              className='login__input input__field'
              placeholder='Пароль'
              type="password"
              {...register('password')}
            />
          }
        />
        <InputField
          errorMessage={errors.confirmPassword?.message}
          imgChild={<IconKey className="badge" />}
          child={
            <input
              key='input--confirmPassword'
              className='login__input input__field'
              placeholder='Подтвердите пароль'
              type="password"
              {...register('confirmPassword')}
            />
          }
        />
        <Button
          type='submit'
          children='Создать аккаунт'
          title="logIn"
          className="login__btn"
          kind="primary"
          isDisabled={registerMutation.isPending}
        ></Button>
        <Button
          onClick={() => changeAuthState()}
          children='У меня есть пароль'
          title="register"
          type="button"
          className="login__btn"
          kind="round"
        ></Button>
        {registerMutation.error && <span className="login__error">Ошибка регистрации</span>}
      </form>
    </div >
  )
}
