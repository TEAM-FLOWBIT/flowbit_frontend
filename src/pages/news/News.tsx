import { Suspense } from 'react';
import NewsList from '../../components/news/NewsList';
import { NewsLayout, NewsTitle } from './styled';
import NewsListSkeleton from '../../components/news/NewsSkeleton';

function News() {
  return (
    <>
      <NewsLayout>
        <NewsTitle>뉴스레터</NewsTitle>
        <Suspense fallback={<NewsListSkeleton />}>
          <NewsList />
        </Suspense>
      </NewsLayout>
    </>
  );
}

export default News;
