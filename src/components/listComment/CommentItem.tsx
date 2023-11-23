import styled from "styled-components";
import { CommentProps } from "../list/types";
import { ReactComponent as DefaultProfile } from "../../assets/DefaultProfile.svg";

const CommentItemLayout = styled.div`
  display: flex;
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

export default function CommentItem({ ...props }: CommentProps) {
  return (
    <CommentItemLayout>
      {props.profile ? (
        <CommentItemProfile src={props.profile} alt="Profile" />
      ) : (
        <DefaultProfile width="5rem" height="5rem" />
      )}
      <CommentItemContainer>
        <CommentItemName>{props.name}</CommentItemName>
        <CommentItemContent>{props.content}</CommentItemContent>
      </CommentItemContainer>
    </CommentItemLayout>
  );
}
