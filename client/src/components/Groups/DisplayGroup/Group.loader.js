import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Spinner from '../../shared/Spinner/Spinner';
import { selectIsLoading } from '../../../redux-sagas/group/group.selector';
import DisplayGroup from './DisplayGroup.container';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading,
});

const GroupLoader = compose(connect(mapStateToProps), Spinner)(DisplayGroup);

export default GroupLoader;
