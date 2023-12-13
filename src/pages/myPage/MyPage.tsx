import styled from "styled-components";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import { MyPageFormValues } from "../../components/input/types";
import { Button } from "../../components/button/Button";
import { useContext, useEffect } from "react";
import { useGetMemberInfo } from "../../hooks/services/queries/authHook";
import { userInfo } from "os";
import { MemberContext } from "../Root";

const MyPageContainer = styled.div`
  margin: 9.6rem auto 14rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const MyPageTitle = styled.h1`
  width: 48rem;
  color: #d9d9d9;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: normal;
  padding-left: 1rem;
`;

const MyPageForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const MyPageInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MyPageSignOut = styled.div`
  color: #5058a9;
  font-size: 1.5rem;
  font-weight: 400;
  display: flex;
  gap: 0.2rem;
  align-items: center;
  cursor: pointer;
`;

export default function MyPage() {
  const { member } = useContext(MemberContext);

  const {
    register: formRegister,
    handleSubmit: formSubmit,
    setError,
    formState: { errors: formErrors, isValid: formIsValid, isDirty },
  } = useForm<MyPageFormValues>({
    mode: "onChange",
    defaultValues: {
      name: member.memberInfo?.name,
      phone: member.memberInfo?.phone,
    },
  });

  const handleUserInfo = (data: MyPageFormValues) => {
    console.log(JSON.stringify(data));
  };

  const handleSignOut = () => {
    alert("탈퇴하기");
  };

  return (
    <MyPageContainer>
      <MyPageTitle>마이페이지</MyPageTitle>
      <MyPageForm onSubmit={formSubmit(handleUserInfo)}>
        <MyPageInputBox>
          {member.memberInfo ? (
            <>
              <Input
                title="이름"
                name="name"
                placeholder="이름을 입력하세요"
                register={formRegister}
                errors={formErrors}
              />
              <Input
                title="전화번호"
                name="phone"
                placeholder="전화번호를 입력하세요"
                register={formRegister}
                rules={{
                  pattern: {
                    value: /^\d{3}-\d{4}-\d{4}$/,
                    message: "올바른 전화번호 형식이 아닙니다.",
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
                initialProfileImage={
                  member.memberInfo
                    ? member.memberInfo.profile
                    : "flowbit-default-profile.png"
                }
              />
            </>
          ) : null}
          <MyPageSignOut onClick={handleSignOut}>
            탈퇴하기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 3L13 8L4 13" stroke="#5058A9" />
            </svg>
          </MyPageSignOut>
        </MyPageInputBox>
        <Button type="submit" disabled={!isDirty}>
          변경하기
        </Button>
      </MyPageForm>
    </MyPageContainer>
  );
}
