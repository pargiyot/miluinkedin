import ReactWordcloud from 'react-wordcloud';

export default ({skills}) => {
    const words = [
        {
          text: 'told',
          value: 64,
        },
        {
          text: 'mistake',
          value: 11,
        },
        {
          text: 'thought',
          value: 16,
        },
        {
          text: 'bad',
          value: 17,
        },
      ]

    return <ReactWordcloud words={skills} />
}
