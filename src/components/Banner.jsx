export default function Banner() {
  return (
    <div style={styles.banner}>
      <div style={styles.content}>
        <h1>Featured Movie</h1>
        <p>Watch the latest trending movies here</p>

        <div>
          <button style={styles.play}>Play</button>
          <button style={styles.list}>My List</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  banner: {
    height: "60vh",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1524985069026-dd778a71c7b4)",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    padding: "40px",
  },
  content: {
    maxWidth: "500px",
  },
  play: {
    padding: "10px 20px",
    marginRight: "10px",
  },
  list: {
    padding: "10px 20px",
  },
};