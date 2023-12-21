import { useState, useEffect } from 'react';
import { UseGetLinkPreviewMutation } from '../../hooks/services/mutations/linkPreviewHook';

function LinkPreview({ url }: { url: string }) {
  const [previewData, setPreviewData] = useState('');

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
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url]);

  return <img src={previewData} alt="" />;
}

export default LinkPreview;
