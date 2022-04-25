import ReactWordcloud from "react-wordcloud";

export default ({ skills }) => {
  return (
    <ReactWordcloud
      words={skills}
      options={{ rotationAngles: [0, 0], rotations: 2, colors: [
        
      ] }}
    />
  );
};
