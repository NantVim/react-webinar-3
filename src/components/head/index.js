import {memo} from "react";
import PropTypes from "prop-types";
import LanguageTool from '../language-tool';
import './style.css';

function Head({title, dictionary, changeLang}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <LanguageTool dictionary={dictionary.tool} changeLang={changeLang}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
