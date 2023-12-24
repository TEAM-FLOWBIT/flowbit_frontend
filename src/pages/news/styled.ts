import styled from 'styled-components';

const NewsLayout = styled.article`
  display: grid;
  max-width: 1240px;
  padding: 0 20px;
  margin: 6rem auto 14rem auto;
  // background-color: red;
`;

const NewsTitle = styled.h1`
  color: #d9d9d9;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 3rem;
`;

const NewsCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 288px);
  gap: 20px;
`;

const NewsCard = styled.a`
  width: 288px;
  height: 290px;
  cursor: pointer;
  text-decoration: none;

  transition: all 0.22s ease;

  &:hover > .cardImg {
    transition: all 0.22s ease;
    transform: translateY(-6px);
  }

  & > .cardImg {
    transition: all 0.22s ease;
  }
  // background-color: blue;
`;

const SkeletonNewsCard = styled.div`
  width: 288px;
  height: 290px;
  cursor: pointer;
`;

const NewsCardImg = styled.div`
  width: 100%;
  min-height: 176px;
  border-radius: 12px;
  background: #26272b;
  margin-bottom: 1rem;
  overflow: hidden;

  & > img {
    display: block;
    width: 100%;
    min-height: 176px;
    max-height: 176px;
  }
`;

const SkeletonCardImg = styled.div`
  width: 100%;
  height: 176px;
  border-radius: 12px;
  background-color: #26272b;
  margin-bottom: 1rem;
`;

const NewsCardTitle = styled.h2`
  color: #e4e5e7;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 23px;
  margin-bottom: 1rem;
`;

const SkeletonTitle = styled.div`
  width: 100px;
  height: 20px;
  border-radius: 6px;
  background-color: #26272b;

  margin-bottom: 1.2rem;
`;

const NewsCardDesc = styled.span`
  color: #7a7c85;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SkeletonDesc = styled.div`
  width: 240px;
  height: 20px;
  border-radius: 6px;
  background-color: #26272b;
`;

const NewsCardInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const NewsCardAuthor = styled.span`
  color: #fff;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
`;

const NewsCardDate = styled.span`
  color: #fff;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
`;

const NewsCardDiv = styled.div`
  width: 1px;
  height: 10px;
  background-color: #fff;
  margin: 0px 10px;
`;

export {
  NewsCard,
  NewsCardAuthor,
  NewsCardDate,
  NewsCardDesc,
  NewsCardDiv,
  NewsCardImg,
  NewsCardInfo,
  NewsCardList,
  NewsCardTitle,
  NewsLayout,
  NewsTitle,
  SkeletonCardImg,
  SkeletonDesc,
  SkeletonNewsCard,
  SkeletonTitle,
};
