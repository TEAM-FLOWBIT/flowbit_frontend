import {
  ListBox,
  ListContainer,
  ListLayout,
  ListSubBox,
  ListWithComment,
  SkeletonListBox,
  SkeletonListContentBox,
  SkeletonListProfile,
} from './styled';

function ListSkeleton() {
  return (
    <ListWithComment>
      <ListLayout>
        <ListContainer>
          <ListBox>
            <SkeletonListProfile />
            <SkeletonListContentBox>
              <SkeletonListBox width={'5.2'} />
              <SkeletonListBox width={'20'} />
              <SkeletonListBox width={'40'} />
              <SkeletonListBox width={'35'} />
            </SkeletonListContentBox>
          </ListBox>
          <ListSubBox>
            <SkeletonListBox width={'5.2'} />
          </ListSubBox>
        </ListContainer>
      </ListLayout>
    </ListWithComment>
  );
}

export default ListSkeleton;
