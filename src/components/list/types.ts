export interface ListProps extends RateBoxProps {
  rid: number;
  profile?: string;
  name: string;
  title: string;
  content: string;
  comment: number;
  images?: any[];
  comments?: CommentProps[];
  mine?: boolean;
}

export interface CommentProps {
  rid: number;
  profile?: string;
  name: string;
  content: string;
}

export interface RateBoxProps {
  price?: string;
  rate?: number;
}
