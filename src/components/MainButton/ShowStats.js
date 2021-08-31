const ShowStats = (props) => {
  return (
    <div>
      <p>{props.currentClicks}</p>
      <p>{props.currentLevel}</p>
      <p>{props.achievement}</p>
    </div>
  );
};

export default ShowStats;
