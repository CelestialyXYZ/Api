export async function search(
  query: string,
  url: string,
  api: string,
  branch: string
): Promise<{ records: any[]; totalCount: number }> {
  let request = await fetch(`${url}:${branch}/search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${api}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      tables: [
        { table: "dso_types", target: [] },
        { table: "scientists", target: [] },
        {
          table: "constellations",
          target: [
            { column: "iau_code" },
            { column: "name_fr" },
            { column: "name_en" },
            { column: "name_latin" },
            { column: "name_extra" },
            { column: "dec" },
            { column: "ra" },
            { column: "principal_star" },
            { column: "origin" },
            { column: "quadrant_zone" },
            { column: "celestial_zone" },
            { column: "ecliptic_zone" },
          ],
        },
        {
          table: "dso",
          target: [
            { column: "name_fr" },
            { column: "name_en" },
            { column: "name_extra" },
            { column: "type" },
            { column: "constellation" },
            { column: "hubble_type" },
            { column: "messier" },
            { column: "new_general_catalog" },
            { column: "index_catalog" },
            { column: "common_star_names" },
            { column: "identifiers" },
            { column: "right_ascension" },
            { column: "declination" },
          ],
        },
      ],
      fuzziness: 0,
      prefix: "phrase",
    }),
  });

  return await request.json();
}

export async function getId(
  id: string,
  table: string,
  url: string,
  api: string,
  branch: string
) {
  console.log(api);
  let request = await fetch(`${url}:${branch}/tables/${table}/data/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${api}`,
      "Content-Type": "application/json",
    },
  });
  let data = await request.json();
  return { record: data, code: request.status };
}
