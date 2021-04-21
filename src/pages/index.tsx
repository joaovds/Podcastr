import { GetStaticProps } from 'next';
import { api } from '../services/api';

type Episode = {
  id: string;
  title: string;
  members: string;
};

type HomeProps = {
  episodes: Episode[];
};

export default function Home(props: HomeProps) {
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
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // a cada 8 horas uma chamada
  };
};
