import styled from 'styled-components';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../components/input/types';
import Footer from '../../components/footer/Footer';
import { Button } from '../../components/button/Button';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const SignUpLayout = styled.div`
  background: linear-gradient(180deg, #040108 0%, #250061 100%);
`;

const SignUpContainer = styled.div`
  margin: 9.6rem auto 11.7rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const SignUpTitle = styled.h1`
  width: 48rem;
  color: #d9d9d9;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: normal;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const SignUpInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SignUpButtonBox = styled.div`
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

export default function SignUp() {
  const {
    register: formRegister,
    handleSubmit: formSubmit,
    formState: { errors: formErrors, isValid: formIsValid },
  } = useForm<FormValues>();

  const signUpMutaion = useMutation({
    mutationFn: (formData: FormData) => {
      return fetch(
        'https://apigateway.apps.sys.paas-ta-dev10.kr/user-service/api/v1/member',
        {
          method: 'POST',
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        });
    },
  });

  const handleSignUp = (data: FormValues) => {
    let formData = new FormData();

    formData.append('userId', data.userId);
    formData.append('name', data.name);
    formData.append('nickname', data.name);
    formData.append('phone', data.phone);
    formData.append('password', data.password);
    data.profileFile[0] && formData.append('profileFile', data.profileFile[0]);
    signUpMutaion.mutate(formData);
  };

  return (
    <SignUpLayout>
      <Header />
      <SignUpContainer>
        <SignUpTitle>회원가입</SignUpTitle>
        <SignUpForm onSubmit={formSubmit(handleSignUp)}>
          <SignUpInputBox>
            <Input
              title="프로파일"
              name="profileFile"
              type="file"
              placeholder={''}
              register={formRegister}
              errors={formErrors}
            />
            <Input
              title="아이디"
              name="userId"
              placeholder="아이디를 입력하세요"
              register={formRegister}
              rules={{
                required: '아이디가 필요해요!',
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
              }}
              errors={formErrors}
            />
            <Input
              title="이름"
              name="name"
              placeholder="이름을 입력하세요"
              register={formRegister}
              rules={{
                required: '이름이 필요해요!',
              }}
              errors={formErrors}
            />
            <Input
              title="전화번호"
              name="phone"
              placeholder="전화번호를 입력하세요"
              register={formRegister}
              rules={{
                required: '전화번호가 필요해요!',
              }}
              errors={formErrors}
            />
          </SignUpInputBox>
          <SignUpButtonBox>
            <Button type="submit" disabled={!formIsValid}>
              회원가입
            </Button>
            <Link to="/login">로그인</Link>
          </SignUpButtonBox>
        </SignUpForm>
      </SignUpContainer>
      <Footer />
    </SignUpLayout>
  );
}
