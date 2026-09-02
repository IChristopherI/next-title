export async function searchAnilibria(title) {
  const response = await fetch(
    `https://anilibria.top/api/v1/app/search/releases?query=${encodeURIComponent(title)}`
  );

  return response.json();
}

export async function getRelease(id) {
  const response = await fetch(
    `https://anilibria.top/api/v1/anime/releases/${id}`
  );

  return response.json();
}
