export default function Row({ title }) {
  const movies = [1, 2, 3, 4, 5, 6];

  return (
    <div style={styles.row}>
      <h2>{title}</h2>

      <div style={styles.scroll}>
        {movies.map((m) => (
          <img
            key={m}
            src="https://via.placeholder.com/150x220"
            style={styles.img}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  row: {
    margin: "20px",
  },
  scroll: {
    display: "flex",
    overflowX: "scroll",
    gap: "10px",
  },
  img: {
    width: "150px",
    borderRadius: "8px",
  },
};