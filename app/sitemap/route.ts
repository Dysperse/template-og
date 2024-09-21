const Filter = require("bad-words");

export async function GET() {
  const templates = await getTemplates();

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${templates
    .map(
      (template: any) => `<url>
    <loc>https://dysperse.com/templates/${template.id}</loc>
    <image:image>
      <image:loc>https://og.dysperse.com/${template.id}</image:loc>
    </image:image>
  </url>`
    )
    .join("")}
</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}

const getTemplates = async () => {
  const filter = new Filter();
  filter.addWords("drugs", "cocaine", "meth", "weed", "heroin", "crack", "lsd");

  const data = await fetch("https://api.dysperse.com/dysverse?all=true", {
    cache: "no-cache",
  }).then((res) => res.json());

  return data.filter((template: any) => {
    if (JSON.stringify(template) !== filter.clean(JSON.stringify(template))) {
      return false;
    }
    return true;
  });
};
