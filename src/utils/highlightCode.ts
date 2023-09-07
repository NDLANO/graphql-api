import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index';

loadLanguages();

const highlightCode = (code: string, language: string) => {
  const highlighted = Prism.highlight(
    code,
    Prism.languages[language],
    language,
  );
  return highlighted;
};

export default highlightCode;
