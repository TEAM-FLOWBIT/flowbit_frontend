import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../QueryKey';
import axios from 'axios';

export function UseGetNewsQuery() {
  const response = useQuery({
    queryKey: [QueryKey.NEWS],
    queryFn: () => {
      return axios.get(
        '/v1/search/news.json?query=비트코인&display=50&start=1&sort=sim',
        {
          headers: {
            'X-Naver-Client-Id': process.env.REACT_APP_CLIENT_ID,
            'X-Naver-Client-Secret': process.env.REACT_APP_CLIENT_SECRET,
          },
        }
      );
    },
    staleTime: 60000 * 60 * 3, // 3시간 동안 캐시 유지
    gcTime: 60000 * 60 * 3, // 3시간 동안 오프라인이 유지될 경우 캐시 삭제
  });

  return response;
}

export function UseGetLinkPreviewQuery(url: string) {
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: [QueryKey.LINKPREVIEW + url],
    queryFn: async () => {
      const response = await fetch(url);
      const data = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const image =
        doc
          .querySelector('meta[property="og:image"]')
          ?.getAttribute('content') || '';
      return image;
    },
  });

  return { data, isSuccess, isFetching };
}
