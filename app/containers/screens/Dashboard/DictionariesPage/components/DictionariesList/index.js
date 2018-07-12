// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Immutable from 'immutable';
// selectrors
import {makeSelectDictionaries, makeSelectDictionariesLoading} from './selectors';
import {loadDictionaries} from './actions';
// components
import {FormattedMessage} from 'react-intl';
import {Button} from 'semantic-ui-react';
import {ListLoader, EmptyListPrompt} from 'components/ui';
import DictionariesListItem from '../DictionariesListItem';
// other
import messages from './messages';

class DictionariesList extends React.Component {
  static propTypes = {
    onCreateClick: PropTypes.func.isRequired,
    // mapDispatchToProps
    loadDictionaries: PropTypes.func.isRequired,
    // mapStateToProps
    loading: PropTypes.bool.isRequired,
    dictionaries: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  componentDidMount() {
    this.props.loadDictionaries();
  }

  render() {
    const {dictionaries, loading} = this.props;
    if (!loading && !dictionaries.size) {
      return (
        <EmptyListPrompt
          title={<FormattedMessage {...messages.noDictionariesMsg} />}
          subtitle={
            <Button basic onClick={this.props.onCreateClick}>
              {<FormattedMessage {...messages.createButton} />}
            </Button>
          }
        />
      );
    } else if (loading) {
      return <ListLoader />;
    }

    return (
      <div>
        {dictionaries.toArray().map((item) => {
          return <DictionariesListItem key={item.get('id')} item={item.toObject()} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dictionaries: makeSelectDictionaries(),
  loading: makeSelectDictionariesLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadDictionaries: () => dispatch(loadDictionaries()),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DictionariesList);
