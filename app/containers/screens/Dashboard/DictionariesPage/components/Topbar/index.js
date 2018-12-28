// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {Menu, Button, Responsive} from 'semantic-ui-react';
import SidebarOpenerIcon from 'containers/SidebarOpenerIcon';
import {Topbar, TopbarButton, TopbarTitle, Icon} from 'components/ui';
import SelectedWordsToolbar from './SelectedWordsToolbar';
import WordsSearchBar from '../WordsSearchBar';
import WordSetSelector from '../WordSetSelector';
import TopbarMobileDropdown from '../TopbarMobileDropdown';
// other
import messages from './messages';
import styles from './index.css';

function DashboardTopbar({
  selectedDictionaryId,
  translateDirection,
  showDictionaries,
  selectedWordSetId,
  selectedWordIds,
  onAllWordsUncheck,
  onShowDictsToggle,
  onWordSetChange,
  onSearchChange,
  onWordsDeleteClick,
  onLearnClick,
  intl: {formatMessage},
}) {
  const selectedWordsCount = (selectedWordIds && selectedWordIds.length) || 0;
  return (
    <Topbar className={styles.root}>
      <Menu.Menu position="left">
        {selectedWordIds && selectedWordIds.length ? (
          <SelectedWordsToolbar
            dictionaryId={selectedDictionaryId}
            wordSetId={selectedWordSetId}
            selectedWordsCount={selectedWordsCount}
            onWordSetChange={onWordSetChange}
            onWordsDeleteClick={onWordsDeleteClick}
            onAllWordsUncheck={onAllWordsUncheck}
          />
        ) : (
          <React.Fragment>
            <Responsive {...Responsive.onlyMobile}>
              <TopbarButton>
                <SidebarOpenerIcon />
              </TopbarButton>
            </Responsive>
            <Responsive minWidth={568}>
              <TopbarButton active={showDictionaries} onClick={onShowDictsToggle}>
                <Icon name="book" />
                <Responsive minWidth={768}>
                  <FormattedMessage {...messages.dictionariesToggleBtnText} />
                </Responsive>
              </TopbarButton>
            </Responsive>
            {selectedDictionaryId ? (
              <React.Fragment>
                <TopbarButton as={Responsive} minWidth={568} className={styles.stipPadding}>
                  <WordSetSelector
                    topbarButton
                    allWordsText={<FormattedMessage {...messages.wordSetSelectorAllWordsText} />}
                    dictionaryId={selectedDictionaryId}
                    value={selectedWordSetId}
                    onChange={onWordSetChange}
                  />
                </TopbarButton>
                <TopbarButton className={cn(styles.stipTopBottomPadding, styles.searchBarMenu)}>
                  <WordsSearchBar
                    buttonLabel={
                      <React.Fragment>
                        <Responsive minWidth={768}>
                          <FormattedMessage {...messages.wordsSearchAddBtnLabel} />
                        </Responsive>
                        <Responsive maxWidth={768}>
                          <Icon name="add" />
                        </Responsive>
                      </React.Fragment>
                    }
                    placeholder={formatMessage(messages.wordsSearchPlaceholder)}
                    dictionaryId={selectedDictionaryId}
                    translateDirection={translateDirection}
                    onChange={onSearchChange}
                  />
                </TopbarButton>
              </React.Fragment>
            ) : (
              <TopbarTitle
                title={<FormattedMessage {...messages.selectDictionaryTitle} />}
                omitSeparator={false}
              />
            )}
          </React.Fragment>
        )}
      </Menu.Menu>

      <Menu.Menu position="right">
        <Responsive maxWidth={320}>
          <TopbarButton>
            <TopbarMobileDropdown
              selectedWordsCount={selectedWordsCount}
              showDictionaries={showDictionaries}
              onShowDictsToggle={onShowDictsToggle}
              selectedWordSetId={selectedWordSetId}
              onWordSetChange={onWordSetChange}
              selectedDictionaryId={selectedDictionaryId}
              onLearnClick={onLearnClick}
              messages={messages}
            />
          </TopbarButton>
        </Responsive>
        {selectedDictionaryId && (
          <Menu.Item as={Responsive} minWidth={568}>
            <Button
              positive
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
        )}
      </Menu.Menu>
    </Topbar>
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
  onAllWordsUncheck: PropTypes.func.isRequired,
  // react-intl
  intl: intlShape.isRequired,
};

export default injectIntl(DashboardTopbar);
