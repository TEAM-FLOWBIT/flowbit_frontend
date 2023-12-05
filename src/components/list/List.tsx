import styled from "styled-components";
import { ReactComponent as DefaultProfile } from "../../assets/DefaultProfile.svg";
import { useState } from "react";
import { ListProps } from "./types";
import Comment from "../listComment/Comment";

const ListWithComment = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListLayout = styled.li`
  width: 84.6rem;
  display: flex;
  justify-content: center;
  padding: 2.9rem 0 2.9rem 0;
  border-bottom: 0.1rem solid #48519b;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 74.6rem;
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const ListProfile = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
`;

const ListSubBox = styled.div`
  display: flex;
  gap: 1rem;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: normal;

  & > .delete {
    cursor: pointer;
  }
  & > span {
    display: flex;
    gap: 0.4rem;
    & > span {
      color: #fa00ff;
    }
  }
`;

const ListContentBox = styled.div`
  max-width: 58.6rem;
  cursor: pointer;
`;

const ListName = styled.h3`
  color: #5058a9;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 0.4rem;
`;

const ListTitle = styled.h4`
  color: #fff;
  font-size: 2rem;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 1rem;
`;

const ListContent = styled.p`
  color: #b2b7ec;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: normal;
`;

const ListImageBox = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  & > img {
    width: 12.8rem;
    height: 12.8rem;
    border-radius: 0.6rem;
  }
`;

const baseURL = "https://likelionvideo.s3.ap-northeast-2.amazonaws.com/";

export default function List({ ...props }: ListProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  // profile과 imagePath에 baseURL을 붙여 완전한 URL을 만듭니다.
  const profileURL = props.profile
    ? baseURL + props.profile
    : baseURL + "flowbit-default-profile.png";
  const imagePathURLs = props.imagePath
    ? props.imagePath.map((path) => baseURL + path)
    : [];

  return (
    <ListWithComment>
      <ListLayout>
        <ListContainer>
          <ListBox>
            {props.profile ? (
              <ListProfile src={profileURL} alt="Profile" />
            ) : (
              <DefaultProfile />
            )}
            <ListContentBox onClick={handleClick}>
              <ListName>{props.name}</ListName>
              <ListTitle>{props.title}</ListTitle>
              <ListContent>{props.content}</ListContent>
              {showDetails && (
                <>
                  {imagePathURLs && imagePathURLs.length > 0 && (
                    <ListImageBox>
                      {imagePathURLs.map((item, index) => (
                        <img key={index} src={item} alt="contentImage" />
                      ))}
                    </ListImageBox>
                  )}
                </>
              )}
            </ListContentBox>
          </ListBox>
          <ListSubBox>
            {props.mine ? <span className="delete">삭제하기</span> : null}
            <span>
              댓글 <span>{props.comments?.length || 0}</span>
            </span>
          </ListSubBox>
        </ListContainer>
      </ListLayout>
      {showDetails && <Comment comments={props.comments || []} />}
    </ListWithComment>
  );
}
