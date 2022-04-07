import { Document } from '@prismicio/client/types/documents';

import Prismic from '@prismicio/client';
import { createClientOptions } from './createClientOptions';

function linkResolver(doc: Document): string {
  if (doc.type === 'posts') {
    return `/post/${doc.uid}`;
  }
  return '/';
}

const apiEndpoint = process.env.PRISMIC_API_ENDPOINT;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

const Client = (req = null) =>
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken));
// eslint-disable-next-line consistent-return
const Preview = async (req, res) => {
  const { token: ref, documentId } = req.query;
  const redirectUrl = await Client(req)
    .getPreviewResolver(ref, documentId)
    .resolve(linkResolver, '/');

  if (!redirectUrl) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.setPreviewData({ ref });
  res.writeHead(302, { Location: `${redirectUrl}` });
  res.end();
};

export default Preview;
