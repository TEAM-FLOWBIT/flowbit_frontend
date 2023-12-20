import styled from 'styled-components';
import Input from '../../components/input/Input';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button/Button';
import { Link } from 'react-router-dom';
import { UseSignMutation } from '../../hooks/services/mutations/authHook';

const LoginContainer = styled.div`
  margin: 16.6rem auto 24.1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const LoginTitle = styled.h1`
  color: #fff;
  font-size: 3rem;
  font-weight: 600;
  line-height: normal;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
`;

const LoginSubTitle = styled.h3`
  color: #b2b7ec;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  line-height: normal;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const LoginInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const LoginButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  align-items: center;
  & > a {
    color: #5058a9;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    text-decoration: none;
  }
`;

export default function Login() {
  const {
    register: formRegister,
    handleSubmit: formSubmit,
    formState: { errors: formErrors, isValid: formIsValid },
  } = useForm<FormData>({ mode: 'onChange' });

  const { signInMutation } = UseSignMutation();

  const handleLogin = (data: FormData) => {
    signInMutation.mutate(data);
  };

  return (
    <LoginContainer>
      <LoginTitle>
        FLOWBIT
        <LoginSubTitle>
          유일한 비트 코인 예측 서비스 플로빗입니다. 로그인 후 모든 서비스를
          이용하세요.
        </LoginSubTitle>
      </LoginTitle>
      <LoginForm id="loginForm" onSubmit={formSubmit(handleLogin)}>
        <LoginInputBox>
          <Input
            title="이메일"
            name="userId"
            placeholder="이메일를 입력하세요"
            register={formRegister}
            rules={{
              required: '이메일이 필요해요!',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            }}
            errors={formErrors}
          />
          <Input
            title="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            register={formRegister}
            rules={{
              required: '비밀번호가 필요해요!',
              pattern: {
                value:
                  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!\\s+$).{8,64}$/,
                message:
                  '비밀번호를 8~64글자의 영문+숫자+특수문자 조합으로 설정해주세요.',
              },
            }}
            errors={formErrors}
          />
        </LoginInputBox>
        <LoginButtonBox>
          <Button type="submit" disabled={!formIsValid}>
            로그인
          </Button>
          <Link to="/signUp">회원가입</Link>
        </LoginButtonBox>
      </LoginForm>
    </LoginContainer>
  );
}
