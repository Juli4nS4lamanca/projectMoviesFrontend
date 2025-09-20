const THead = ({ list }) => {
  return (
    <thead>
      <tr>
        {list.map(e => (
          <th key={e}>{e}</th>
        ))}
      </tr>
    </thead>
  )
};

export default THead;

