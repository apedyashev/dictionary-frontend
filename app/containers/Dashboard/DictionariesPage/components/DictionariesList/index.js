// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// selectrors
import {makeSelectDictionaries, makeSelectDictionariesLoading} from './selectors';
import {loadDictionaries} from './actions';
// components
import {Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react';
import {ListLoader, EmptyListPrompt} from 'components/ui';
import DictionariesListItem from '../DictionariesListItem';

class DictionariesList extends React.Component {
  static propTypes = {
    onCreateClick: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadDictionaries();
  }

  render() {
    const {dictionaries, loading, loaded} = this.props;
    if (!loading && !dictionaries) {
      return (
        <EmptyListPrompt
          title="You don't have any dictionaries"
          subtitle={
            <Button basic onClick={this.props.onCreateClick}>
              Create
            </Button>
          }
        />
      );
    } else if (loading) {
      return <ListLoader />;
    }

    return (
      <div>
        {dictionaries.toArray().map((item, id) => {
          return <DictionariesListItem key={id} item={item.toObject()} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(DictionariesList);
