export interface ListProps extends RateBoxProps {
  memberId: number;
  memberEmail: string;
  boardId: number;
  profile?: string;
  name: string;
  title: string;
  content: string;
  imagePath?: string[];
  comments?: CommentProps[];
  mine?: boolean;
}

export interface CommentProps {
  commentId: number;
  profile?: string;
  name: string;
  content: string;
}

export interface RateBoxProps {
  price?: string;
  rate?: number;
}
