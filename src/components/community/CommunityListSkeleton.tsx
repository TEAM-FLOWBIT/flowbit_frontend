import { CommunityListBox } from '../../pages/community/styled';
import ListSkeleton from '../list/ListSkeleton';

function CommunityListSkeleton() {
  return (
    <>
      <CommunityListBox>
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
      </CommunityListBox>
    </>
  );
}

export default CommunityListSkeleton;
