// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Immutable from 'immutable';
// actions
import {createWordset} from '../../DictionariesList/actions';
// selectors
import {makeSelectDictionaryWordSets} from '../../DictionariesList/selectors';
// components
import {Dropdown as DropdownSUI} from 'semantic-ui-react';
import {Dropdown} from 'components/ui';
import AddWordsetForm from '../../AddOwnTranslation';

function WordSetSelectorWithAddForm({
  dictionaryId,
  value,
  wordSets,
  trigger,
  className,
  createWordset,
  onChange,
}) {
  const options = wordSets
    .map((wordSet) => ({
      key: wordSet.get('id'),
      text: wordSet.get('title'),
      value: wordSet.get('id'),
    }))
    .toJS();

  const handleAddClick = (title) => {
    new Promise((resolve, reject) => {
      createWordset(dictionaryId, title, {resolve, reject});
    }).then(({response: {result}}) => {
      console.log('result', result.item);
      onChange(result.item);
    });
  };

  return (
    <Dropdown
      open
      value={value}
      trigger={trigger}
      simple={false}
      item={false}
      className={className}
      onChange={onChange}
    >
      <DropdownSUI.Menu>
        <DropdownSUI.Menu scrolling>
          {options.map((option) => <DropdownSUI.Item {...option} />)}
        </DropdownSUI.Menu>
        <DropdownSUI.Header content={<AddWordsetForm onAddClick={handleAddClick} />} />
      </DropdownSUI.Menu>
    </Dropdown>
  );
}
WordSetSelectorWithAddForm.propTypes = {
  value: PropTypes.any.isRequired,
  allowAddNew: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  wordSets: PropTypes.instanceOf(Immutable.List).isRequired,
};
WordSetSelectorWithAddForm.defaultProps = {
  value: 0,
};

const mapStateToProps = createStructuredSelector({
  wordSets: makeSelectDictionaryWordSets(),
});
function mapDispatchToProps(dispatch) {
  return {
    createWordset: (dictionaryId, title, {resolve, reject} = {}) =>
      dispatch(createWordset(dictionaryId, {title}, {resolve, reject})),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordSetSelectorWithAddForm);
