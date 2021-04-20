export default function Home(props) {
  console.log(props.episodes);
  return <h1>Podcastr</h1>;
}

/* SSR
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
  };
}
*/

// SSG
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // a cada 8 horas uma chamada
  };
}
