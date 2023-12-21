import { UseGetLinkPreviewQuery } from '../../hooks/services/queries/newsHook';

function LinkPreview({ url }: { url: string }) {
  const { data, isSuccess } = UseGetLinkPreviewQuery(url);

  return isSuccess ? <img src={data} alt="" /> : null;
}

export default LinkPreview;
