import ReactGA4 from 'react-ga4';

export const InitializeGoogleAnalytics = () => {
  const tracking_id = process.env.REACT_APP_GOOGLE_TARGET_ID;
  tracking_id && ReactGA4.initialize(tracking_id);
};

export const TrackGoogleAnalyticsEvent = (category: string, action: string) => {
  console.log('GA event = ', 'category :', category, ':', 'action :', action);

  ReactGA4.event({
    category: category,
    action: action,
  });
};
