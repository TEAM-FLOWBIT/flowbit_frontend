import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMember } from '../../hooks/context/authHook';
import { useLogoutMutation } from '../../hooks/services/mutations/authHook';

const HeaderLayout = styled.header`
  height: 9.2rem;
  display: flex;
  align-items: center;
  padding: 0 12.3rem 0 12.1rem;
  background-color: transparent;
  justify-content: space-between;
  border-bottom: 1px solid #fff;
`;

const HeaderLogo = styled.div`
  color: #fff;
  font-size: 2.6rem;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const HeaderMenu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6.6rem;
`;

const HeaderLink = styled.span`
  color: #fff;
  font-size: 1.7rem;
  font-weight: 400;
  line-height: normal;
  text-decoration: none;
  cursor: pointer;
`;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const { member } = useMember();
  const { logoutMutation } = useLogoutMutation();

  const isCurrentPath = (path: string) => location.pathname === path;

  const onClickLogoutBtn = () => {
    logoutMutation.mutate();
  };

  return (
    <HeaderLayout>
      <HeaderLogo onClick={() => navigate('/')}>FLOWBIT</HeaderLogo>
      <HeaderMenu>
        <HeaderLink
          onClick={() => navigate('/')}
          style={{ fontWeight: isCurrentPath('/') ? 700 : 400 }}
        >
          비트코인 예측
        </HeaderLink>
        <HeaderLink
          onClick={() => navigate('/community')}
          style={{ fontWeight: isCurrentPath('/community') ? 700 : 400 }}
        >
          커뮤니티
        </HeaderLink>
        <HeaderLink
          onClick={() => navigate('/news')}
          style={{ fontWeight: isCurrentPath('/news') ? 700 : 400 }}
        >
          뉴스레터
        </HeaderLink>
        {member.auth !== '' ? (
          <>
            <HeaderLink onClick={() => onClickLogoutBtn()}>로그아웃</HeaderLink>
            <HeaderLink
              onClick={() => navigate('/mypage')}
              style={{ fontWeight: isCurrentPath('/mypage') ? 700 : 400 }}
            >
              마이페이지
            </HeaderLink>
          </>
        ) : (
          <HeaderLink
            onClick={() => navigate('/login')}
            style={{
              fontWeight:
                isCurrentPath('/login') || isCurrentPath('/signUp') ? 700 : 400,
            }}
          >
            회원가입/로그인
          </HeaderLink>
        )}
      </HeaderMenu>
    </HeaderLayout>
  );
}
