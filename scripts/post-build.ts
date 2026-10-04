import generatePublishPackageJson from '@fringeworks/dev/generatePublishPackageJson';
import fs from 'fs-extra';

async function postBuild() {
  await fs.copyFile('./README.md', './dist/README.md');
  await fs.copyFile('./LICENSE', './dist/LICENSE');
  await generatePublishPackageJson({
    exports: {
      '.': { types: './index.d.ts' },
    },
    jsonWriteOptions: {
      spaces: 2,
    },
  });
}

postBuild().then(
  () => console.log('OK'),
  () => console.log('NG'),
);
