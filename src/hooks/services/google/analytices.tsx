import ReactGA4 from 'react-ga4';

const InitializeGoogleAnalytics = () => {
  const GA_MEASUREMENT_ID = process.env.REACT_APP_GOOGLE_TARGET_ID;
  GA_MEASUREMENT_ID && ReactGA4.initialize(GA_MEASUREMENT_ID);
};

const TrackGoogleAnalyticsEvent = (category: string, action: string) => {
  console.log('GA event = ', 'category :', category, ':', 'action :', action);

  ReactGA4.event({
    category: category,
    action: action,
  });
};

export default InitializeGoogleAnalytics;

export { InitializeGoogleAnalytics, TrackGoogleAnalyticsEvent };
