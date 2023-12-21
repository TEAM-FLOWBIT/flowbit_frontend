import { useMutation } from '@tanstack/react-query';

export function UseGetLinkPreviewMutation() {
  const getLinkPreviewMutation = useMutation({
    mutationFn: (url: string) => {
      return fetch(url);
    },
  });

  return { getLinkPreviewMutation };
}
