import { ReactComponent as DefaultProfile } from '../../assets/DefaultProfile.svg';
import { useContext, useState } from 'react';
import { ListProps } from './types';
import Comment from '../listComment/Comment';
import { useDeleteBoardMutation } from '../../hooks/services/mutations/boardHook';
import { IMG_URL, MemberContext } from '../../pages/Root';
import ImgModal from '../modal/ImgModal';
import {
  ListBox,
  ListContainer,
  ListContent,
  ListContentBox,
  ListImageBox,
  ListLayout,
  ListName,
  ListProfile,
  ListSubBox,
  ListTitle,
  ListWithComment,
} from './styled';

export default function List({ ...props }: ListProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showImgModal, setShowImgModal] = useState('');
  const { deleteBoardMutation } = useDeleteBoardMutation();
  const { member } = useContext(MemberContext);

  const handleListContentClick = () => {
    setShowDetails(!showDetails);
  };

  const handleImgClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    url: string
  ) => {
    e.stopPropagation();
    setShowImgModal(url);
  };

  const onClickCloseModal = () => {
    setShowImgModal('');
  };

  const onClickDeleteBoard = (title: string, boardId: number) => {
    if (window.confirm(`'${title}' 게시글을 삭제하시겠습니까?`)) {
      deleteBoardMutation.mutate({ auth: member.auth, boardId: boardId });
    }
  };

  // profile과 imagePath에 baseURL을 붙여 완전한 URL을 만듭니다.
  const profileURL = props.profile
    ? IMG_URL + props.profile
    : IMG_URL + 'flowbit-default-profile.png';

  const imagePathURLs = props.imagePath
    ? props.imagePath.map((path) => IMG_URL + path)
    : [];

  return (
    <>
      {showImgModal !== '' ? (
        <ImgModal onClickCloseModal={onClickCloseModal} url={showImgModal} />
      ) : null}
      <ListWithComment>
        <ListLayout>
          <ListContainer>
            <ListBox>
              {props.profile ? (
                <ListProfile src={profileURL} alt="Profile" />
              ) : (
                <DefaultProfile />
              )}
              <ListContentBox onClick={handleListContentClick}>
                <ListName>{props.name}</ListName>
                <ListTitle>{props.title}</ListTitle>
                <ListContent>{props.content}</ListContent>
                {showDetails && (
                  <>
                    {imagePathURLs && imagePathURLs.length > 0 && (
                      <ListImageBox>
                        {imagePathURLs.map((item, index) => (
                          <img
                            key={index}
                            src={item}
                            alt="contentImage"
                            onClick={(e) => handleImgClick(e, item)}
                          />
                        ))}
                      </ListImageBox>
                    )}
                  </>
                )}
              </ListContentBox>
            </ListBox>
            <ListSubBox>
              {props.mine ? (
                <span
                  className="delete"
                  onClick={() => {
                    onClickDeleteBoard(props.title, props.boardId);
                  }}
                >
                  삭제하기
                </span>
              ) : null}
              <span>
                댓글 <span>{props.comments?.length || 0}</span>
              </span>
            </ListSubBox>
          </ListContainer>
        </ListLayout>
        {showDetails && (
          <Comment boardId={props.boardId} comments={props.comments || []} />
        )}
      </ListWithComment>
    </>
  );
}
