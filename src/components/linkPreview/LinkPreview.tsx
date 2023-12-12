import { useState, useEffect } from 'react';

function LinkPreview({ url }: { url: string }) {
  const [previewData, setPreviewData] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const image =
          doc
            .querySelector('meta[property="og:image"]')
            ?.getAttribute('content') || '';
        setPreviewData(image);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  // if (loading) {
  //   return <p>로딩중...</p>;
  // }

  // if (!previewData) {
  //   return <p>이미지 불러오기 실패!</p>;
  // }

  return <img src={previewData} alt="" />;
}

export default LinkPreview;
