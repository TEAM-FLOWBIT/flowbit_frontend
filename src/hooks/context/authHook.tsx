import { useContext } from 'react';
import { MemberContext } from '../../pages/Root';

export const initialMemberInfo = {
  memberInfo: {
    id: 0,
    name: '',
    phone: '',
    email: '',
    nickname: '',
    profile: '',
  },
  auth: '',
};

export function useMember() {
  return useContext(MemberContext);
}
