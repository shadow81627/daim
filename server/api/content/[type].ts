import { sortBy } from 'lodash-es';
import {
  optional,
  object,
  safeParse,
  pipe,
  unknown,
  transform,
  number,
  integer,
  minValue,
  maxValue,
  string,
} from 'valibot';
import { parse } from 'qs';
import { parseURL } from 'ufo';
import { serverQueryContent } from '#content/server';
import textLength from '~/utils/feature-text-length';
import priceSort from '~/utils/price-sort';

export default defineEventHandler(async (event) => {
  const type: string = getRouterParam(event, 'type') ?? '';
  const query = parse(parseURL(event.path).search, {
    ignoreQueryPrefix: true,
    comma: true,
  });
  const contentQuerySchema = object({
    limit: optional(
      pipe(
        string(),
        transform((input) => Number(input)),
        number(),
        integer(),
        minValue(0),
        maxValue(48),
      ),
    ),
    page: optional(
      pipe(
        string(),
        transform((input) => Number(input)),
        number(),
        integer(),
        minValue(1),
      ),
    ),
    fields: optional(
      object({
        [type]: pipe(
          unknown(),
          transform((value: any) =>
            Array.isArray(value) ? value : Array(value),
          ),
        ),
      }),
    ),
  });
  const validation = safeParse(contentQuerySchema, query);
  if (!validation.success) {
    setResponseStatus(event, 400);
    return { errors: validation.issues };
  }
  const input = validation.output;
  const limit = input.limit ?? 24;
  const page = input.page ?? 1;
  const total = await serverQueryContent(event, type)
    .where({ deleted_at: { $exists: false } })
    .count();

  const fields = input?.fields?.[type] ?? [];
  if (fields.length) {
    fields.push('_path');
  }
  const contentQuery = serverQueryContent(event, type)
    .only(fields)
    .where({ deleted_at: { $exists: false } })
    .skip((page - 1) * limit)
    .limit(limit);

  const data = await contentQuery.find();

  const sorts = [priceSort, textLength, 'slug'];
  const sorted = sortBy(data, sorts).reverse();
  const items = sorted.map((item) => {
    const slug = item?._path?.replace(`/${type}/`, '');
    return {
      ...item,
      id: slug,
      url: item.offers ? `/${type}/${slug}` : item.url,
      image: slug ? `/img/${type}/${slug}.png` : undefined,
      imageColor: item.color,
    };
  });
  return {
    meta: { pagination: { total, page, limit } },
    data: items,
  };
});
