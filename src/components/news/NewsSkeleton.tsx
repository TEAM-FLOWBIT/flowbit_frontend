import {
  NewsCardList,
  SkeletonCardImg,
  SkeletonDesc,
  SkeletonNewsCard,
  SkeletonTitle,
} from '../../pages/news/styled';

function NewsListSkeleton() {
  return (
    <NewsCardList>
      <SkeletonNewsCard>
        <SkeletonCardImg />
        <SkeletonTitle />
        <SkeletonDesc />
      </SkeletonNewsCard>
      <SkeletonNewsCard>
        <SkeletonCardImg />
        <SkeletonTitle />
        <SkeletonDesc />
      </SkeletonNewsCard>
      <SkeletonNewsCard>
        <SkeletonCardImg />
        <SkeletonTitle />
        <SkeletonDesc />
      </SkeletonNewsCard>
      <SkeletonNewsCard>
        <SkeletonCardImg />
        <SkeletonTitle />
        <SkeletonDesc />
      </SkeletonNewsCard>
      <SkeletonNewsCard>
        <SkeletonCardImg />
        <SkeletonTitle />
        <SkeletonDesc />
      </SkeletonNewsCard>
      <SkeletonNewsCard>
        <SkeletonCardImg />
        <SkeletonTitle />
        <SkeletonDesc />
      </SkeletonNewsCard>
      <SkeletonNewsCard>
        <SkeletonCardImg />
        <SkeletonTitle />
        <SkeletonDesc />
      </SkeletonNewsCard>
      <SkeletonNewsCard>
        <SkeletonCardImg />
        <SkeletonTitle />
        <SkeletonDesc />
      </SkeletonNewsCard>
    </NewsCardList>
  );
}

export default NewsListSkeleton;
