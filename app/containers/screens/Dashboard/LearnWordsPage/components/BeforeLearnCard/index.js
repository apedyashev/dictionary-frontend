// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import Immutable from 'immutable';
// components
import {Divider} from 'components/ui';
import PromptingImage from 'containers/PromptingImage';
import WordDefinition from '../WordDefinition';
import CheckAnswerButtons from '../CheckAnswerButtons';

export default function BeforeLearnCard({word, onNext}) {
  return word ? (
    <div>
      <PromptingImage src={word.get('image')} wordId={word.get('id')} />
      <WordDefinition directTranslation word={word} withBottomMargin />
      <Divider horizontal>Translation</Divider>
      <WordDefinition directTranslation={false} word={word} />
      <CheckAnswerButtons
        nextBtnProps={{
          // fluid: true,
          right: true,
          positive: true,
          // disabled: !showCorrectAnswer && selectedOptionIndex < 0,
          // className: styles.nextButton,
          content: 'Next',
          onClick() {
            onNext(true);
          },
        }}
      />
    </div>
  ) : null;
}
BeforeLearnCard.propTypes = {
  word: PropTypes.instanceOf(Immutable.Map),
  onNext: PropTypes.func.isRequired,
};
