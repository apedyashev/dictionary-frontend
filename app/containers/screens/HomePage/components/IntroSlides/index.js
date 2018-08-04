// libs
import React from 'react';
// components
import Slider from 'react-slick';
import IntroSlide from '../IntroSlide';
// other
import styles from './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '!file-loader?name=[name].[ext]!./slide1.png';
import '!file-loader?name=[name].[ext]!./slide2.png';

// eslint-disable-next-line react/prefer-stateless-function
class IntroSlides extends React.PureComponent {
  static propTypes = {};
  render() {
    // https://react-slick.neostack.com/docs/api/
    // const settings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //
    //   // https://react-slick.neostack.com/docs/api/#responsive
    // };
    return (
      <Slider dots infinite className={styles.root}>
        <IntroSlide
          title="Step 1: create your dictionary"
          description={
            <div>
              There are two options:<br />
              1. Find desired translate direction in the dictionary. In this case you can benefit
              from automatic translation of your words.<br />
              2. If you cannot find your languages in the list, check the corresponding checkbox and
              type the name of the dictionary. You will be able to add and learn words, but you have
              to translate them on your own.
            </div>
          }
          image="/slide1.png"
        />
        <IntroSlide
          title="Step 2: add words"
          description={
            <div>
              Enter a word into the search box and press the <b>Add</b> button and either select a
              translation or add your own one.<br />
              As you have enough new words, press the <b>Learn</b> button and start learning them!
            </div>
          }
          image="/slide2.png"
        />
      </Slider>
    );
  }
}

export default IntroSlides;
