import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';

import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../services/prismic';

// import commonStyles from '../styles/common.module.scss';
// import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  return (
    <>
      <head>
        <title>Home | espacetraveling</title>
      </head>
      <main>
        <section>
          <time>15/04/2020</time>
          <span>Rosana Moreira</span>
          <span>4 minu</span>
          <h2>PuseState</h2>
          <p>
            O hook mais comum utilizado para controlarmos alguma variável de
            estado dentro de um functional component no React. Para utilizar
            definimos: cont [count, setCount] = useState(0); O primeiro valor
            count representa o valor do estado que será manipulado pela função
            setCount recebida através da desestruturação realizada no useState.
            O valor 0 repassado ao hook é o valor inicial do estado.
          </p>
          <h2>useEffect</h2>
          <p>
            O hook mais comum utilizado para controlarmos alguma variável de
            estado dentro de um functional component no React. Para utilizar
            definimos: cont [count, setCount] = useState(0); O primeiro valor
            count representa o valor do estado que será manipulado pela função
            setCount recebida através da desestruturação realizada no useState.
            O valor 0 repassado ao hook é o valor inicial do estado.
          </p>
        </section>
      </main>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'publication')],
    {
      fetch: ['publication.title'],
      pageSize: 100,
    }
  );
  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
    };
  });
  return {
    props: {
      posts,
    },
  };
};
