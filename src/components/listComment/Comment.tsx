import styled from "styled-components";
import { SizeButton } from "../button/Button";
import CommentItem from "./CommentItem";
import { CommentProps } from "../list/types";
import { useState } from "react";

const CommentLayout = styled.div`
  width: 84.6rem;
  background: rgba(37, 57, 88, 0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.4rem 0;
`;

const CommentItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
  margin-bottom: 3.6rem;
  align-items: flex-start;
`;

const CommentInputBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-sizing: border-box;
  width: 58.6rem;
  height: 14rem;
  border-radius: 1rem;
  border: 0.1rem solid #48519b;
  background-color: transparent;
  padding: 2rem 2rem 1.4rem 2rem;
`;

const CommentInput = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 7.6rem;
  border: none;
  background-color: transparent;
  resize: none;
  color: #fff;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-weight: 500;
  &::placeholder {
    color: #5b5f8a;
  }
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    width: 0.6rem;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.3rem;
    border: 0.1rem solid #48519b;
    background: linear-gradient(93deg, #fa00ff, #0085ff);
  }
`;

export default function Comment({ comments }: { comments: CommentProps[] }) {
  const [comment, setComment] = useState("");

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(comment);
    setComment("");
  };

  return (
    <CommentLayout>
      {comments && comments.length > 0 && (
        <CommentItemBox>
          {comments.map((comment) => (
            <CommentItem
              rid={comment.rid}
              profile={comment.profile}
              name={comment.name}
              content={comment.content}
            />
          ))}
        </CommentItemBox>
      )}
      <CommentInputBox onSubmit={handleSubmit}>
        <CommentInput
          value={comment}
          onChange={handleChange}
          onClick={handleClick}
          placeholder="내용을 입력하세요"
        />
        <SizeButton size="s" type="submit">
          등록
        </SizeButton>
      </CommentInputBox>
    </CommentLayout>
  );
}
