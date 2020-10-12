import * as React from 'react';

import useErrorBoundary from 'use-error-boundary';
import EntityContext from '../data/context';

export default ({ children }) => {
  const { logTracking } = React.useContext(EntityContext);
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
