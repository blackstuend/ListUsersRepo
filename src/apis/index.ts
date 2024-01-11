import axios from 'axios';
import { Repository } from '../entities/Repository';

export interface GetRepositoriesParams {
  username: string;

  // default value is 10
  perPage?: number;
}

export async function getRepositories(
  params: GetRepositoriesParams,
): Promise<Repository[]> {
  const url = `https://api.github.com/users/${params.username}/repos`;
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    const response = await axios.get(url, {
      headers,
      params: {
        per_page: params.perPage ?? 10,
      },
    });

    // Ensure the response data is an array
    if (!Array.isArray(response.data)) {
      throw new Error('Unexpected API response');
    }

    // Map the response data to your Repository interface
    const repositories: Repository[] = response.data.map((repo) => ({
      title: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      starsCount: repo.stargazers_count,
      forksCount: repo.forks_count,
      watchersCount: repo.watchers_count,
    }));

    return repositories;
  } catch (error) {
    throw new Error('Failed to fetch repositories');
  }
}
