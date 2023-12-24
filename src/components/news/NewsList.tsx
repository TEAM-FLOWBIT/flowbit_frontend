import { UseGetNewsQuery } from '../../hooks/services/queries/newsHook';
import {
  NewsCard,
  NewsCardAuthor,
  NewsCardDate,
  NewsCardDesc,
  NewsCardDiv,
  NewsCardImg,
  NewsCardInfo,
  NewsCardList,
  NewsCardTitle,
} from '../../pages/news/styled';
import LinkPreview from '../linkPreview/LinkPreview';
interface INewsCard {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  originalling: string;
}
function NewsList() {
  const { isSuccess, data } = UseGetNewsQuery();

  return (
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
                {newCard.title.replace(/(?:<[^>]+>)|(&quot;)/g, '')}
              </NewsCardTitle>
              <NewsCardDesc>
                {newCard.description.replace(/(?:<[^>]+>)|(&quot;)/g, '')}
              </NewsCardDesc>
            </NewsCard>
          );
        })}
    </NewsCardList>
  );
}

export default NewsList;
