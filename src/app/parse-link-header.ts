
type Rel = 'first' | 'last' | 'next' | 'prev';
type ResultType = {
  [rel in Rel]?: {
    url: string;
    params: {
      page?: string;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      per_page: string;
      since: string;
    };
  };
};

export const parseLinkHeader = (link?: string): ResultType => link?.split(', ').map(l => l.split('; ')).reduce((acc, [link, rel]) => ({
  ...acc,
  [rel.replace(/rel="(.*)"/, '$1')] : {
    url: link.replace(/<(.*)>/, '$1'),
    // eslint-disable-next-line max-len
    params: [...new URLSearchParams(new URL(link.replace(/<(.*)>/, '$1')).search).entries()].reduce((acc, [name, value]) => ({...acc, [name]:value}), {})
  }
}), {}) ?? {};
