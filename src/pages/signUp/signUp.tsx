import styled from 'styled-components';
import Input from '../../components/input/Input';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../components/input/types';
import { Button, SizeButton } from '../../components/button/Button';
import { Link } from 'react-router-dom';
import { UseSignMutation } from '../../hooks/services/mutations/signHook';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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

const InputBox = styled.div`
  position: relative;
  & > button {
    position: absolute;
    right: 2rem;
    top: 5rem;
  }
`;

export default function SignUp() {
  const {
    register: formRegister,
    handleSubmit: formSubmit,
    setError,
    getValues,
    formState: { errors: formErrors, isValid: formIsValid, isDirty },
  } = useForm<FormValues>({ mode: 'onChange' });

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(3 * 60); // 3분

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isCountingDown) {
      timerId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isCountingDown]);

  const sendEmailCodeMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post('/user-service/api/v1/mail', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess() {
      setIsLoading(false);
      setIsCountingDown(true);
      setIsEmailSent(true);
    },
    onError(error) {
      setIsLoading(false);
      alert('인증메일 전송에 실패했습니다.');
      console.log(error);
    },
  });

  // 이메일에 인증번호 전송 버튼
  const handleEmailSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formErrors.userId) {
      setIsLoading(true);
      const { userId } = getValues();
      const formData = new FormData();
      formData.append('email', userId);
      formData.append('emailPurpose', 'SIGNUP');
      sendEmailCodeMutation.mutate(formData);
    }
  };

  // 이메일 인증 요청 함수
  const verifyEmailMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post('/user-service/api/v1/mail/verify', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess() {
      setIsLoading(false);
      setIsVerified(true);
      alert('인증되었습니다.');
    },
    onError(error) {
      setIsLoading(false);
      alert('오류가 발생했습니다: ' + error.message);
    },
  });

  // 인증번호 검증 버튼 클릭 핸들러
  const handleRandomNumberSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formErrors.randomNumber) {
      setIsLoading(true);
      const { userId, randomNumber } = getValues();
      const formData = new FormData();
      formData.append('email', userId);
      formData.append('randomNumber', randomNumber);
      formData.append('emailPurpose', 'SIGNUP');
      verifyEmailMutation.mutate(formData);
    }
  };

  const { signUpMutaion } = UseSignMutation();

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
    <SignUpContainer>
      <SignUpTitle>회원가입</SignUpTitle>
      <SignUpForm onSubmit={formSubmit(handleSignUp)}>
        <SignUpInputBox>
          <InputBox>
            <Input
              title="이메일"
              name="userId"
              placeholder="이메일을 입력하세요"
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
            <SizeButton
              size="s"
              type="submit"
              onClick={handleEmailSubmit}
              disabled={
                isLoading || isCountingDown || !isDirty || !!formErrors.userId
              }
            >
              {isLoading ? (
                <Loading size="s" />
              ) : isCountingDown ? (
                `${Math.floor(countdown / 60)}:${
                  countdown % 60 < 10 ? '0' : ''
                }${countdown % 60}`
              ) : (
                '번호 전송'
              )}
            </SizeButton>
          </InputBox>
          {isEmailSent && (
            <InputBox>
              <Input
                title="인증번호"
                name="randomNumber"
                placeholder="인증번호를 입력하세요"
                register={formRegister}
                rules={{
                  required: '인증번호가 필요해요!',
                }}
                errors={formErrors}
              />
              <SizeButton
                size="s"
                type="submit"
                onClick={handleRandomNumberSubmit}
                disabled={
                  isLoading ||
                  !isDirty ||
                  !!formErrors.randomNumber ||
                  isVerified
                }
              >
                인증하기
              </SizeButton>
            </InputBox>
          )}
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
              pattern: {
                value: /^\d{3}-\d{4}-\d{4}$/,
                message: '올바른 전화번호 형식이 아닙니다.',
              },
            }}
            errors={formErrors}
          />
          <Input
            title="프로필 이미지"
            name="profileFile"
            placeholder=""
            register={formRegister}
            type="file"
            accept="image/*"
            errors={formErrors}
            setError={setError}
          />
        </SignUpInputBox>
        <SignUpButtonBox>
          <Button type="submit" disabled={!formIsValid || !isVerified}>
            가입하기
          </Button>
          <Link to="/login">로그인</Link>
        </SignUpButtonBox>
      </SignUpForm>
    </SignUpContainer>
  );
}
