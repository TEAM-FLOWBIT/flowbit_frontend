import styled from 'styled-components';

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

const SkeletonListProfile = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: #606490;
`;

const SkeletonListBox = styled.div<{ width: string }>`
  width: ${(props) => props.width + 'rem'};
  height: 1.8rem;
  flex-shrink: 0;
  border-radius: 26px;
  background: #606490;
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

const SkeletonListContentBox = styled(ListContentBox)`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
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

export {
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
  SkeletonListBox,
  SkeletonListProfile,
  SkeletonListContentBox,
};
