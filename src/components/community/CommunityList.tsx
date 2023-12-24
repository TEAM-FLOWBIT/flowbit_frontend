import { useEffect, useState } from 'react';
import { useMember } from '../../hooks/context/authHook';
import { CommunityListBox } from '../../pages/community/styled';
import List from '../list/List';
import { ListProps } from '../list/types';
import { QueryKey } from '../../hooks/services/QueryKey';
import { useSuspenseQuery } from '@tanstack/react-query';
import Pagination from '../../pages/community/Pagination';

function CommunityList() {
  const { member } = useMember();
  const [isLastPage, setIsLastPage] = useState(false);
  // 상태로 현재 페이지를 추적
  const [currentPage, setCurrentPage] = useState(0);

  const UseGetCommunityQuery = async (page: number) => {
    const response = await fetch(
      `/user-service/api/v1/board?page=${page}&size=6`
    );
    const data = await response.json();
    return data;
  };

  const { data, isSuccess } = useSuspenseQuery({
    queryKey: [QueryKey.COMMUNITY, currentPage],
    queryFn: () => UseGetCommunityQuery(currentPage),
  });

  // 페이지 이동 함수
  const goToNextPage = async () => {
    const nextPage = currentPage + 1;
    const nextPageData = await UseGetCommunityQuery(nextPage);
    if (nextPageData && nextPageData.data.content.length > 0) {
      setCurrentPage(nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage !== 0) {
      setCurrentPage((page) => Math.max(page - 1, 0));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (data && data.data.content.length < 6) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [data]);

  return (
    <>
      <CommunityListBox>
        {isSuccess &&
          data?.data.content.map((item: ListProps) => (
            <List
              key={item.boardId}
              {...item}
              mine={
                member?.memberInfo?.id
                  ? item.memberId === member?.memberInfo.id
                  : false
              }
            />
          ))}
      </CommunityListBox>
      <Pagination
        isFirstPage={currentPage === 0}
        isLastPage={isLastPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
      />
    </>
  );
}

export default CommunityList;
