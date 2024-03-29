import { promises as fs } from 'fs';
import { importDirectory } from '@iconify/tools/lib/import/directory';
import { cleanupSVG } from '@iconify/tools/lib/svg/cleanup';
import { runSVGO } from '@iconify/tools/lib/optimise/svgo';
import { parseColors, isEmptyColor } from '@iconify/tools/lib/colors/parse';
import axios from 'axios';
import { optimize } from 'svgo';
import type { SVG } from '@iconify/tools/lib/svg';
import { IconSet } from '@iconify/tools/lib/icon-set';

type OptimizedStateItem = { name: string; date: Date };

async function cropSVG(svg: string) {
  const response = await axios.post(
    'https://autocrop.cncf.io/autocrop',
    {
      svg,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data.result;
}

async function cleanSvg(name: string, svg: SVG, iconSet: IconSet) {
  // Clean up and optimise icons
  try {
    await cleanupSVG(svg);
    await runSVGO(svg);
  } catch (err) {
    // Invalid icon
    console.error(`Error parsing ${name}:`, err);
    iconSet.remove(name);
  }
}

(async () => {
  const optimizedFilePath = 'assets/img/icons/optimized.json';
  const optimizedFile = await fs.readFile(optimizedFilePath, 'utf-8');
  const optimized: OptimizedStateItem[] = JSON.parse(optimizedFile);

  // Import icons
  const iconSet = await importDirectory('assets/img/icons', {
    prefix: 'custom',
  });

  // Validate, clean up, fix palette and optimise
  await iconSet.forEach(async (name, type) => {
    console.log(name);
    if (type !== 'icon') {
      return;
    }

    const svg = iconSet.toSVG(name);
    if (!svg) {
      // Invalid icon
      iconSet.remove(name);
      return;
    }

    if (!optimized.some((item) => item.name === name)) {
      const cropped = await cropSVG(svg.toString());
      const result = await optimize(cropped, {
        js2svg: {
          indent: 2,
          pretty: true, // boolean, false by default
        },
      });
      const pretty = result.data;
      await fs.writeFile(`assets/img/icons/${name}.svg`, pretty, 'utf8');
      optimized.push({ name, date: new Date() });
    }

    cleanSvg(name, svg, iconSet);
    iconSet.fromSVG(name, svg);

    const greys = ['clutch-icon'];
    if (greys.includes(name)) {
      const nameGray = `${name}-gray`;
      await parseColors(svg, {
        defaultColor: 'currentColor',
        callback: (_, colorStr, color) => {
          return !color || isEmptyColor(color) ? colorStr : 'currentColor';
        },
      });
      iconSet.fromSVG(nameGray, svg);
    }
  });

  // Export as IconifyJSON
  const exported = JSON.stringify(iconSet.export(), undefined, 2) + '\n';

  // Save to file
  await fs.writeFile(`assets/icons.json`, exported, 'utf8');
  // Save svg optimization state
  await fs.writeFile(
    optimizedFilePath,
    JSON.stringify(
      optimized.sort((a, b) => a.name.localeCompare(b.name)),
      undefined,
      2,
    ) + '\n',
    'utf-8',
  );
})();
