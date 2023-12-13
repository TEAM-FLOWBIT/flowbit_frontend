import styled from "styled-components";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import { MyPageFormValues } from "../../components/input/types";
import { Button } from "../../components/button/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "../../hooks/services/QueryKey";
import axios from "axios";
import { useMember } from "../../hooks/context/authHook";

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
  const { member } = useMember();
  const queryClient = useQueryClient();

  const {
    register: formRegister,
    handleSubmit: formSubmit,
    setError,
    getValues,
    formState: { errors: formErrors, isValid: formIsValid, isDirty },
  } = useForm<MyPageFormValues>({
    mode: "onChange",
    defaultValues: {
      name: member.memberInfo?.name,
      phone: member.memberInfo?.phone,
    },
  });

  const modifyUserMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.put(
        "https://apigateway.apps.sys.paas-ta-dev10.kr/user-service/api/v1/member",
        formData
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.MEMBER],
      });
      alert("회원정보 수정이 완료되었습니다.");
    },
    onError(error) {
      console.log(error);
      alert("예상치 못한 오류가 발생했습니다.");
    },
  });

  const handleUserInfo = (data: MyPageFormValues) => {
    console.log(JSON.stringify(data));
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("memberId", member.memberInfo.id.toString());
    data.profileFile[0] && formData.append("profileFile", data.profileFile[0]);

    modifyUserMutation.mutate(formData);
  };

  const deleteUserMutation = useMutation({
    mutationFn: (password: object) => {
      return axios.delete(
        "https://apigateway.apps.sys.paas-ta-dev10.kr/user-service/api/v1/member/login",
        {
          data: { password: password },
        }
      );
    },
    onSuccess() {
      alert("탈퇴 완료");
    },
    onError(error) {
      console.log(error);
      alert("예상치 못한 오류가 발생했습니다.");
    },
  });

  const handleSignOut = () => {
    const { password } = getValues();
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    deleteUserMutation.mutate({ password });
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
                title="비밀번호"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                register={formRegister}
                rules={{
                  required: "비밀번호가 필요해요!",
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!\\s+$).{8,64}$/,
                    message:
                      "비밀번호를 8~64글자의 영문+숫자+특수문자 조합으로 설정해주세요.",
                  },
                }}
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
