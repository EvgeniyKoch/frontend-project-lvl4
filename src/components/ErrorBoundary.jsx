import * as React from 'react';

import useErrorBoundary from 'use-error-boundary';
import Context from '../data/context';

export default ({ children }) => {
  const { logTracking } = React.useContext(Context);
  const { ErrorBoundary, didCatch, error } = useErrorBoundary({
    onDidCatch: (err, errorInfo) => {
      logTracking.error(err);
      logTracking.error(errorInfo);
    },
  });

  return (
    <>
      {didCatch ? (
        <p>
          An error has been catched:
          {error.message}
        </p>
      ) : (
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      )}
    </>
  );
};
