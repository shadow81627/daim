import { sortBy } from 'lodash-es';
import { optional, object, integer, number, coerce, safeParse } from 'valibot';
import { serverQueryContent } from '#content/server';
import textLength from '~/utils/feature-text-length';
import priceSort from '~/utils/price-sort';

export default defineEventHandler(async (event) => {
  const userSchema = object({
    limit: optional(coerce(number([integer()]), Number), 24),
    page: optional(coerce(number([integer()]), Number), 1),
  });
  const validation = await getValidatedQuery(event, (query) =>
    safeParse(userSchema, query),
  );
  // return validation;
  if (!validation.success) {
    setResponseStatus(event, 400);
    return { errors: validation.issues };
  }
  const input = validation.output;
  const limit = input.limit ?? 24;
  const page = input.page ?? 1;
  const total = await serverQueryContent(event, 'tools')
    .where({ deleted_at: { $exists: false } })
    .count();
  const data = await serverQueryContent(event, 'tools')
    .where({ deleted_at: { $exists: false } })
    .skip((page - 1) * limit)
    .limit(limit)
    .find();

  const sorts = [priceSort, textLength, 'slug'];
  const sorted = sortBy(data, sorts).reverse();
  const items = sorted.map((item) => {
    const slug = item._path.replace('/tools/', '');
    return {
      ...item,
      id: slug,
      url: item.offers ? `/tools/${slug}` : item.url,
      image: `/img/tools/${slug}.png`,
      imageColor: item.color,
    };
  });
  return {
    meta: { pagination: { total } },
    data: items,
  };
});
