import styled from 'styled-components';
import { CommentProps } from '../list/types';
import { ReactComponent as DefaultProfile } from '../../assets/DefaultProfile.svg';
import { useMember } from '../../hooks/context/authHook';
import { useDeleteCommentMutation } from '../../hooks/services/mutations/commentHook';

const CommentItemLayout = styled.div`
  display: flex;
  width: 58.6rem;
  flex-direction: row;
  gap: 2rem;
  align-items: flex-start;
`;

const CommentItemProfile = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const CommentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  width: 100%;
`;

const CommentItemName = styled.h3`
  color: #5058a9;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
`;

const CommentItemContent = styled.p`
  color: #b2b7ec;
  font-size: 1.5rem;
  font-weight: 500;
`;

const CommentItemLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CommentDeleteBtn = styled.div`
  color: #fff;
  font-family: Pretendard;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;

export default function CommentItem({ ...props }: CommentProps) {
  const { member } = useMember();
  const { deleteCommentMutation } = useDeleteCommentMutation();

  const onClickDeleteBtn = (commentId: number) => {
    if (window.confirm('해당 댓글을 삭제하시겠습니까?')) {
      deleteCommentMutation.mutate({
        auth: member.auth,
        commentId: commentId,
      });
    }
  };

  return (
    <CommentItemLayout>
      {props.profile ? (
        <CommentItemProfile src={props.profile} alt="Profile" />
      ) : (
        <DefaultProfile width="5rem" height="5rem" />
      )}
      <CommentItemContainer>
        <CommentItemLabel>
          <CommentItemName>{props.name}</CommentItemName>
          {member?.memberInfo?.id &&
            props.memberId === member.memberInfo.id && (
              <CommentDeleteBtn
                onClick={() => {
                  onClickDeleteBtn(props.commentId);
                }}
              >
                삭제하기
              </CommentDeleteBtn>
            )}
        </CommentItemLabel>
        <CommentItemContent>{props.content}</CommentItemContent>
      </CommentItemContainer>
    </CommentItemLayout>
  );
}
