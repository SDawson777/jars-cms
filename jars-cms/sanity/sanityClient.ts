// jars-cms/sanity/sanityClient.ts
import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'yourProjectId',          // Replace with actual
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-07-25',
  token: process.env.SANITY_API_TOKEN, // Set in .env
});