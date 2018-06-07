// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {FormattedMessage} from 'react-intl';
import {Icon, Menu, Button, Responsive} from 'semantic-ui-react';
import SidebarOpenerIcon from 'containers/SidebarOpenerIcon';
// import {Input} from 'components/ui';
import SelectedWordsToolbar from './SelectedWordsToolbar';
import WordsSearchBar from '../WordsSearchBar';
import WordSetSelector from '../WordSetSelector';
import TopbarButton from '../TopbarButton';
// other
import messages from './messages';
import styles from './index.css';

export default function DashboardTopbar({
  selectedDictionaryId,
  translateDirection,
  showDictionaries,
  selectedWordSetId,
  selectedWordIds,
  onShowDictsToggle,
  onWordSetChange,
  onSearchChange,
  onWordsDeleteClick,
  onLearnClick,
}) {
  const selectedWordsCount = (selectedWordIds && selectedWordIds.length) || 0;
  return (
    <Menu className={styles.root}>
      <Menu.Menu position="left">
        {selectedWordIds && selectedWordIds.length ? (
          <SelectedWordsToolbar
            dictionaryId={selectedDictionaryId}
            wordSetId={selectedWordSetId}
            selectedWordsCount={selectedWordsCount}
            onWordSetChange={onWordSetChange}
            onWordsDeleteClick={onWordsDeleteClick}
          />
        ) : (
          <React.Fragment>
            <Responsive {...Responsive.onlyMobile}>
              <TopbarButton>
                <SidebarOpenerIcon />
              </TopbarButton>
            </Responsive>
            <Responsive {...Responsive.onlyComputer}>
              <TopbarButton active={showDictionaries} onClick={onShowDictsToggle}>
                <Icon name="book" />
                Dictionaries
              </TopbarButton>
            </Responsive>
            <Responsive {...Responsive.onlyComputer}>
              <TopbarButton className={styles.stipPadding}>
                <WordSetSelector
                  dictionaryId={selectedDictionaryId}
                  value={selectedWordSetId}
                  onChange={onWordSetChange}
                />
              </TopbarButton>
            </Responsive>

            <TopbarButton className={cn(styles.stipTopBottomPadding, styles.searchBarMenu)}>
              <WordsSearchBar
                buttonLabel="Add"
                placeholder="Type to search"
                dictionaryId={selectedDictionaryId}
                translateDirection={translateDirection}
                onChange={onSearchChange}
              />
            </TopbarButton>
          </React.Fragment>
        )}
      </Menu.Menu>

      <Menu.Menu position="right">
        <Responsive {...Responsive.onlyMobile}>
          <TopbarButton>
            <Icon name="ellipsis horizontal" />
          </TopbarButton>
        </Responsive>
        <Responsive {...Responsive.onlyComputer}>
          <Menu.Item>
            <Button
              content={
                selectedWordsCount ? (
                  <FormattedMessage
                    {...messages.learnSelectedBtnLabel}
                    values={{selectedWordsCount}}
                  />
                ) : (
                  <FormattedMessage {...messages.learnBtnLabel} />
                )
              }
              onClick={onLearnClick}
            />
          </Menu.Item>
        </Responsive>
      </Menu.Menu>
    </Menu>
  );
}
DashboardTopbar.propTypes = {
  selectedDictionaryId: PropTypes.string,
  translateDirection: PropTypes.string,
  showDictionaries: PropTypes.bool,
  selectedWordSetId: PropTypes.string,
  selectedWordIds: PropTypes.array,
  onShowDictsToggle: PropTypes.func.isRequired,
  onWordSetChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onWordsDeleteClick: PropTypes.func.isRequired,
  onLearnClick: PropTypes.func.isRequired,
};
