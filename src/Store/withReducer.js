import { injectReducer } from 'store/index';
import React from 'react';

const withReducer = (key, reducer) => WrappedComponent => {
	injectReducer(key, reducer);

	return props => <WrappedComponent {...props} />;
};

export default withReducer;
