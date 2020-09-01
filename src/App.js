import React, {useEffect, useState} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'

import wordsToNumbers from 'words-to-numbers'; // для преобразования команд из строки в число

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles'

const alanKey = '5a659522578d2cc17c847b2b4cd778fb2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if (command === 'lastNews') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                } else if (command === 'open') {
                    const parsedNum = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
                    const article = articles[parsedNum - 1];

                    if (parsedNum > 20) {
                        alanBtn().playText('Please, try again')
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening')
                    }
                }
            }
        })
    }, []);

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src='https://media-exp1.licdn.com/dms/image/C561BAQFzAiAvq0Jg8Q/company-background_10000/0?e=2159024400&v=beta&t=i8Vzn3GgAWe_h9ndpR4i1VhEStPK4_IW-IFVBijTbnk' className={classes.alanLogo} alt='logo'/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
};

export default App;






