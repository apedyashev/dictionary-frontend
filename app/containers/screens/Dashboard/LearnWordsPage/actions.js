export const SEND_FOR_LEARNING = '@LEARN_WORDS/SEND_FOR_LEARNING';
export function sendWordsForLearning(wordIds) {
  return {
    type: SEND_FOR_LEARNING,
    wordIds,
  };
}
