import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QueryKey } from '../../hooks/services/QueryKey';
import styled from 'styled-components';
import LinkPreview from '../../components/linkPreview/LinkPreview';

const CLIENT_ID = 'iAZJggM5HRZscIi3VbiL';
const CLIENT_SECRET = 'dsDuo0_LKU';

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

const NewsCardTitle = styled.h2`
  color: #e4e5e7;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 23px;
  margin-bottom: 1rem;
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

interface INewsCard {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  originalling: string;
}

function News() {
  const { isSuccess, data } = useQuery({
    queryKey: [QueryKey.NEWS],
    queryFn: () => {
      return axios.get(
        '/v1/search/news.json?query=비트코인&display=50&start=1&sort=sim',
        {
          headers: {
            'X-Naver-Client-Id': CLIENT_ID,
            'X-Naver-Client-Secret': CLIENT_SECRET,
          },
        }
      );
    },
  });

  return (
    <>
      <NewsLayout>
        <NewsTitle>뉴스레터</NewsTitle>
        <NewsCardList>
          {isSuccess &&
            data.data.items.map((newCard: INewsCard) => {
              return (
                <NewsCard href={newCard.link} target="_blank">
                  <NewsCardImg className="cardImg">
                    <LinkPreview
                      url={newCard.link.split('https://n.news.naver.com')[1]}
                    ></LinkPreview>
                  </NewsCardImg>
                  <NewsCardInfo>
                    <NewsCardAuthor>네이버</NewsCardAuthor>
                    <NewsCardDiv />
                    <NewsCardDate>{newCard.pubDate.slice(0, 16)}</NewsCardDate>
                  </NewsCardInfo>
                  <NewsCardTitle>
                    {newCard.title
                      .replace(/<[^>]*>?/g, '')
                      .replaceAll('&quot;', '')}
                  </NewsCardTitle>
                  <NewsCardDesc>
                    {newCard.description
                      .replace(/<[^>]*>?/g, '')
                      .replaceAll('&quot;', '')}
                  </NewsCardDesc>
                </NewsCard>
              );
            })}
        </NewsCardList>
      </NewsLayout>
    </>
  );
}

export default News;
